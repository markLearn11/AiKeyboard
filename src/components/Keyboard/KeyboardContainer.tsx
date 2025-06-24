import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import KeyboardView from './KeyboardView';
import SymbolKeyboard from './SymbolKeyboard';
import CandidateBar from './CandidateBar';
import pinyinEngine from '../../utils/pinyinEngine';
import historyManager from '../../utils/historyManager';

// 定义键盘类型
enum KeyboardType {
  PINYIN,
  SYMBOL,
}

interface KeyboardContainerProps {
  onTextInput: (text: string) => void;
}

const KeyboardContainer: React.FC<KeyboardContainerProps> = ({ onTextInput }) => {
  const [inputText, setInputText] = useState('');
  const [candidates, setCandidates] = useState<string[]>([]);
  const [isShifted, setIsShifted] = useState(false);
  const [keyboardType, setKeyboardType] = useState<KeyboardType>(KeyboardType.PINYIN);

  // 当输入文本变化时更新候选词
  useEffect(() => {
    const updateCandidates = async () => {
      if (inputText) {
        // 先获取历史推荐
        const historyRecommendations = await historyManager.getRecommendations(inputText);
        
        // 再获取拼音引擎的推荐
        const pinyinRecommendations = pinyinEngine.findCandidates(inputText);
        
        // 合并推荐结果，去重
        const combined = [...historyRecommendations];
        pinyinRecommendations.forEach(item => {
          if (!combined.includes(item)) {
            combined.push(item);
          }
        });
        
        setCandidates(combined);
      } else {
        setCandidates([]);
      }
    };
    
    updateCandidates();
  }, [inputText]);

  // 处理键盘按键
  const handleKeyPress = (key: string) => {
    // 特殊按键处理
    switch (key) {
      case '⇧':
        setIsShifted(!isShifted);
        return;
      case '123':
        setKeyboardType(KeyboardType.SYMBOL);
        return;
      case 'ABC':
        setKeyboardType(KeyboardType.PINYIN);
        return;
      case '⌫':
        // 删除键处理
        if (inputText.length > 0) {
          setInputText(inputText.slice(0, -1));
        }
        return;
      case '确定':
        // 确认当前输入
        if (inputText) {
          handleTextOutput(inputText);
        }
        return;
      default:
        // 普通字符输入
        if (key === ' ' || key === '空格') {
          // 空格键处理 - 如果有候选词选择第一个，否则直接输入空格
          if (candidates.length > 0) {
            handleTextOutput(candidates[0]);
          } else {
            onTextInput(' ');
          }
        } else {
          // 是否是符号键盘模式
          if (keyboardType === KeyboardType.SYMBOL) {
            onTextInput(key);
          } else {
            // 拼音输入
            setInputText(inputText + key);
          }
        }
        return;
    }
  };

  // 候选词选择处理
  const handleCandidatePress = (candidate: string) => {
    handleTextOutput(candidate);
  };

  // 统一处理文本输出
  const handleTextOutput = (text: string) => {
    // 保存到历史记录
    if (keyboardType === KeyboardType.PINYIN && inputText) {
      historyManager.addHistory(text, inputText);
    }
    
    // 向外部输出
    onTextInput(text);
    
    // 清空输入
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <CandidateBar
        inputText={inputText}
        candidates={candidates}
        onCandidatePress={handleCandidatePress}
      />
      {keyboardType === KeyboardType.PINYIN ? (
        <KeyboardView onKeyPress={handleKeyPress} />
      ) : (
        <SymbolKeyboard onKeyPress={handleKeyPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default KeyboardContainer; 