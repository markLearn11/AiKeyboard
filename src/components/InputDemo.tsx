import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import KeyboardContainer from './Keyboard/KeyboardContainer';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const InputDemo: React.FC<Props> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [isCustomKeyboardVisible, setIsCustomKeyboardVisible] = useState(false);

  // 显示自定义键盘并隐藏系统键盘
  const showCustomKeyboard = () => {
    Keyboard.dismiss();
    setIsCustomKeyboardVisible(true);
  };

  // 处理自定义键盘输入
  const handleTextInput = (input: string) => {
    setText(prevText => prevText + input);
  };

  // 点击其他区域关闭自定义键盘
  const dismissKeyboard = () => {
    setIsCustomKeyboardVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              <Text style={styles.description}>
                点击下方输入框，启用自定义中文输入法键盘
              </Text>

              <Text style={styles.label}>输入内容：</Text>
              <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={setText}
                multiline
                placeholder="点击这里开始输入..."
                onFocus={showCustomKeyboard}
              />

              <View style={styles.previewSection}>
                <Text style={styles.label}>预览：</Text>
                <View style={styles.previewBox}>
                  <Text>{text || '(输入内容将显示在这里)'}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>

        {isCustomKeyboardVisible && (
          <View style={styles.keyboardContainer}>
            <KeyboardContainer onTextInput={handleTextInput} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  previewSection: {
    marginTop: 20,
  },
  previewBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
  },
  keyboardContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
  },
});

export default InputDemo; 