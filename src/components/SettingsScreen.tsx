import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import historyManager from '../utils/historyManager';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [clearingHistory, setClearingHistory] = useState<boolean>(false);

  const handleClearHistory = async () => {
    Alert.alert(
      '清除历史记录',
      '确定要清除所有输入历史记录吗？此操作不可恢复。',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          style: 'destructive',
          onPress: async () => {
            setClearingHistory(true);
            await historyManager.clearHistory();
            setClearingHistory(false);
            Alert.alert('成功', '历史记录已清除');
          },
        },
      ],
    );
  };

  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>键盘反馈</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>按键振动</Text>
              <Switch
                value={vibrationEnabled}
                onValueChange={toggleVibration}
                trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
                thumbColor={vibrationEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>按键声音</Text>
              <Switch
                value={soundEnabled}
                onValueChange={toggleSound}
                trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
                thumbColor={soundEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>数据管理</Text>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleClearHistory}
              disabled={clearingHistory}
            >
              <Text style={styles.buttonText}>
                {clearingHistory ? '正在清除...' : '清除输入历史记录'}
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.hint}>
              清除历史记录会删除所有学习的词汇和输入习惯。
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>关于</Text>
            <Text style={styles.version}>AI输入法 v1.0.0</Text>
            <Text style={styles.copyright}>© 2024 AI键盘</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#4B5563',
  },
  button: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  hint: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  version: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default SettingsScreen; 