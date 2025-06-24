// 简易拼音引擎，实际项目中建议使用更完整的拼音库
// 这里只包含一些基本的拼音映射作为示例

interface PinyinDictItem {
  pinyin: string;
  text: string;
  freq: number;
}

class PinyinEngine {
  private dictionary: PinyinDictItem[] = [
    { pinyin: 'ni', text: '你', freq: 1000 },
    { pinyin: 'ni', text: '拟', freq: 200 },
    { pinyin: 'ni', text: '妮', freq: 150 },
    { pinyin: 'hao', text: '好', freq: 1000 },
    { pinyin: 'hao', text: '号', freq: 300 },
    { pinyin: 'hao', text: '豪', freq: 200 },
    { pinyin: 'wo', text: '我', freq: 1000 },
    { pinyin: 'wo', text: '窝', freq: 200 },
    { pinyin: 'shi', text: '是', freq: 1000 },
    { pinyin: 'shi', text: '事', freq: 500 },
    { pinyin: 'shi', text: '师', freq: 300 },
    { pinyin: 'jie', text: '接', freq: 800 },
    { pinyin: 'jie', text: '姐', freq: 600 },
    { pinyin: 'jie', text: '解', freq: 500 },
    { pinyin: 'chu', text: '出', freq: 900 },
    { pinyin: 'chu', text: '初', freq: 700 },
    { pinyin: 'chu', text: '厨', freq: 300 },
    { pinyin: 'lai', text: '来', freq: 1000 },
    { pinyin: 'lai', text: '赖', freq: 200 },
    { pinyin: 'ma', text: '吗', freq: 800 },
    { pinyin: 'ma', text: '妈', freq: 700 },
    { pinyin: 'ma', text: '马', freq: 600 },
    // 词组
    { pinyin: 'nihao', text: '你好', freq: 1000 },
    { pinyin: 'woshi', text: '我是', freq: 800 },
    { pinyin: 'jiechu', text: '接触', freq: 500 },
    { pinyin: 'laile', text: '来了', freq: 700 },
  ];

  // 通过拼音查找匹配的汉字
  findCandidates(pinyin: string): string[] {
    if (!pinyin) return [];

    // 过滤出所有匹配的条目
    const matches = this.dictionary.filter(item => 
      item.pinyin.startsWith(pinyin) ||  // 前缀匹配
      item.pinyin === pinyin            // 完全匹配
    );

    // 按频率排序
    const sortedMatches = [...matches].sort((a, b) => b.freq - a.freq);
    
    // 提取文本
    return sortedMatches.map(item => item.text);
  }

  // 根据拼音匹配词组
  findPhrases(pinyin: string): string[] {
    if (!pinyin || pinyin.length < 2) return [];

    // 查找词组匹配
    const matches = this.dictionary.filter(item => 
      item.text.length > 1 &&       // 只考虑词组
      item.pinyin === pinyin        // 完全匹配拼音
    );

    // 按频率排序
    const sortedMatches = [...matches].sort((a, b) => b.freq - a.freq);
    
    return sortedMatches.map(item => item.text);
  }
  
  // 添加自定义词条到词典
  addCustomEntry(pinyin: string, text: string, freq: number = 500): void {
    this.dictionary.push({ pinyin, text, freq });
  }
}

export default new PinyinEngine(); 