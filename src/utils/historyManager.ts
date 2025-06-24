import AsyncStorage from '@react-native-async-storage/async-storage';

// 历史记录项接口
interface HistoryItem {
  text: string;
  pinyin: string;
  timestamp: number;
  frequency: number;
}

class HistoryManager {
  private static HISTORY_STORAGE_KEY = 'ai_keyboard_history';
  private static MAX_HISTORY_ITEMS = 500; // 最大历史记录数量
  private historyCache: HistoryItem[] = [];
  private isLoaded = false;

  constructor() {
    this.loadHistory();
  }

  // 从存储中加载历史记录
  private async loadHistory(): Promise<void> {
    try {
      const historyData = await AsyncStorage.getItem(HistoryManager.HISTORY_STORAGE_KEY);
      if (historyData) {
        this.historyCache = JSON.parse(historyData);
      }
      this.isLoaded = true;
    } catch (error) {
      console.error('加载历史记录失败', error);
      this.historyCache = [];
      this.isLoaded = true;
    }
  }

  // 保存历史记录到存储
  private async saveHistory(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        HistoryManager.HISTORY_STORAGE_KEY,
        JSON.stringify(this.historyCache)
      );
    } catch (error) {
      console.error('保存历史记录失败', error);
    }
  }

  // 添加或更新历史记录项
  public async addHistory(text: string, pinyin: string): Promise<void> {
    // 确保历史记录已加载
    if (!this.isLoaded) {
      await this.waitForLoad();
    }

    // 查找是否已存在
    const existingIndex = this.historyCache.findIndex(item => item.text === text);
    
    if (existingIndex >= 0) {
      // 已存在，更新频率和时间戳
      this.historyCache[existingIndex].frequency += 1;
      this.historyCache[existingIndex].timestamp = Date.now();
    } else {
      // 不存在，添加新项
      this.historyCache.push({
        text,
        pinyin,
        timestamp: Date.now(),
        frequency: 1,
      });
    }

    // 如果超出最大容量，删除最不常用的
    if (this.historyCache.length > HistoryManager.MAX_HISTORY_ITEMS) {
      // 按频率和时间排序
      this.historyCache.sort((a, b) => {
        if (a.frequency === b.frequency) {
          return a.timestamp - b.timestamp; // 时间戳小的（较旧的）优先删除
        }
        return a.frequency - b.frequency; // 频率小的优先删除
      });
      
      // 删除最不常用的项
      this.historyCache.splice(0, this.historyCache.length - HistoryManager.MAX_HISTORY_ITEMS);
    }

    // 保存更新后的历史记录
    await this.saveHistory();
  }

  // 通过拼音查找推荐词
  public async getRecommendations(pinyin: string): Promise<string[]> {
    // 确保历史记录已加载
    if (!this.isLoaded) {
      await this.waitForLoad();
    }

    // 过滤匹配的项
    const matches = this.historyCache.filter(item => 
      item.pinyin === pinyin || item.pinyin.startsWith(pinyin)
    );

    // 按频率和时间排序（频率高的优先，频率相同时间新的优先）
    const sorted = [...matches].sort((a, b) => {
      if (a.frequency === b.frequency) {
        return b.timestamp - a.timestamp;
      }
      return b.frequency - a.frequency;
    });

    // 返回文本数组
    return sorted.map(item => item.text);
  }

  // 等待历史记录加载完成
  private async waitForLoad(): Promise<void> {
    if (this.isLoaded) return;
    
    return new Promise<void>((resolve) => {
      const checkLoaded = () => {
        if (this.isLoaded) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      
      checkLoaded();
    });
  }

  // 清除所有历史记录
  public async clearHistory(): Promise<void> {
    this.historyCache = [];
    await this.saveHistory();
  }
}

export default new HistoryManager(); 