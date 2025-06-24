import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const KEY_WIDTH = (width - 10) / 10;

interface KeyProps {
  label: string;
  onPress: (key: string) => void;
  width?: number;
  flex?: number;
}

const Key: React.FC<KeyProps> = ({ label, onPress, width, flex }) => {
  return (
    <TouchableOpacity
      style={[
        styles.key,
        width ? { width } : {},
        flex ? { flex } : {},
      ]}
      onPress={() => onPress(label)}>
      <Text style={styles.keyText}>{label}</Text>
    </TouchableOpacity>
  );
};

interface KeyboardViewProps {
  onKeyPress: (key: string) => void;
}

const KeyboardView: React.FC<KeyboardViewProps> = ({ onKeyPress }) => {
  const handleKeyPress = (key: string) => {
    onKeyPress(key);
  };

  // 拼音键盘布局
  return (
    <View style={styles.container}>
      {/* 候选词区域 */}
      <View style={styles.candidateArea}>
        <Text style={styles.placeholder}>候选词区域</Text>
      </View>
      
      {/* 第一行键盘 */}
      <View style={styles.row}>
        <Key label="q" onPress={handleKeyPress} />
        <Key label="w" onPress={handleKeyPress} />
        <Key label="e" onPress={handleKeyPress} />
        <Key label="r" onPress={handleKeyPress} />
        <Key label="t" onPress={handleKeyPress} />
        <Key label="y" onPress={handleKeyPress} />
        <Key label="u" onPress={handleKeyPress} />
        <Key label="i" onPress={handleKeyPress} />
        <Key label="o" onPress={handleKeyPress} />
        <Key label="p" onPress={handleKeyPress} />
      </View>
      
      {/* 第二行键盘 */}
      <View style={styles.row}>
        <View style={styles.halfSpace} />
        <Key label="a" onPress={handleKeyPress} />
        <Key label="s" onPress={handleKeyPress} />
        <Key label="d" onPress={handleKeyPress} />
        <Key label="f" onPress={handleKeyPress} />
        <Key label="g" onPress={handleKeyPress} />
        <Key label="h" onPress={handleKeyPress} />
        <Key label="j" onPress={handleKeyPress} />
        <Key label="k" onPress={handleKeyPress} />
        <Key label="l" onPress={handleKeyPress} />
        <View style={styles.halfSpace} />
      </View>
      
      {/* 第三行键盘 */}
      <View style={styles.row}>
        <Key label="⇧" onPress={handleKeyPress} width={KEY_WIDTH * 1.5} />
        <Key label="z" onPress={handleKeyPress} />
        <Key label="x" onPress={handleKeyPress} />
        <Key label="c" onPress={handleKeyPress} />
        <Key label="v" onPress={handleKeyPress} />
        <Key label="b" onPress={handleKeyPress} />
        <Key label="n" onPress={handleKeyPress} />
        <Key label="m" onPress={handleKeyPress} />
        <Key label="⌫" onPress={handleKeyPress} width={KEY_WIDTH * 1.5} />
      </View>
      
      {/* 第四行键盘 */}
      <View style={styles.row}>
        <Key label="123" onPress={handleKeyPress} width={KEY_WIDTH * 1.5} />
        <Key label="," onPress={handleKeyPress} />
        <Key label="空格" onPress={() => handleKeyPress(' ')} flex={1} />
        <Key label="." onPress={handleKeyPress} />
        <Key label="确定" onPress={handleKeyPress} width={KEY_WIDTH * 1.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#D1D5DB',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  candidateArea: {
    height: 40,
    backgroundColor: '#F3F4F6',
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  placeholder: {
    color: '#6B7280',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  key: {
    width: KEY_WIDTH,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  keyText: {
    fontSize: 18,
    color: '#1F2937',
  },
  halfSpace: {
    width: KEY_WIDTH / 2,
  },
});

export default KeyboardView; 