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

interface SymbolKeyboardProps {
  onKeyPress: (key: string) => void;
}

const SymbolKeyboard: React.FC<SymbolKeyboardProps> = ({ onKeyPress }) => {
  const handleKeyPress = (key: string) => {
    onKeyPress(key);
  };

  return (
    <View style={styles.container}>
      {/* 第一行符号 */}
      <View style={styles.row}>
        <Key label="1" onPress={handleKeyPress} />
        <Key label="2" onPress={handleKeyPress} />
        <Key label="3" onPress={handleKeyPress} />
        <Key label="4" onPress={handleKeyPress} />
        <Key label="5" onPress={handleKeyPress} />
        <Key label="6" onPress={handleKeyPress} />
        <Key label="7" onPress={handleKeyPress} />
        <Key label="8" onPress={handleKeyPress} />
        <Key label="9" onPress={handleKeyPress} />
        <Key label="0" onPress={handleKeyPress} />
      </View>
      
      {/* 第二行符号 */}
      <View style={styles.row}>
        <Key label="@" onPress={handleKeyPress} />
        <Key label="#" onPress={handleKeyPress} />
        <Key label="$" onPress={handleKeyPress} />
        <Key label="%" onPress={handleKeyPress} />
        <Key label="&" onPress={handleKeyPress} />
        <Key label="*" onPress={handleKeyPress} />
        <Key label="-" onPress={handleKeyPress} />
        <Key label="+" onPress={handleKeyPress} />
        <Key label="(" onPress={handleKeyPress} />
        <Key label=")" onPress={handleKeyPress} />
      </View>
      
      {/* 第三行符号 */}
      <View style={styles.row}>
        <Key label="!" onPress={handleKeyPress} />
        <Key label={'"'} onPress={handleKeyPress} />
        <Key label="'" onPress={handleKeyPress} />
        <Key label=":" onPress={handleKeyPress} />
        <Key label=";" onPress={handleKeyPress} />
        <Key label="/" onPress={handleKeyPress} />
        <Key label="?" onPress={handleKeyPress} />
        <Key label="," onPress={handleKeyPress} />
        <Key label="." onPress={handleKeyPress} />
        <Key label="⌫" onPress={handleKeyPress} />
      </View>
      
      {/* 第四行符号 */}
      <View style={styles.row}>
        <Key label="更多" onPress={handleKeyPress} width={KEY_WIDTH * 1.5} />
        <Key label="ABC" onPress={handleKeyPress} width={KEY_WIDTH * 1.5} />
        <Key label="空格" onPress={() => handleKeyPress(' ')} flex={1} />
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
});

export default SymbolKeyboard; 