import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputDemo from '../components/InputDemo';
import SettingsScreen from '../components/SettingsScreen';

// 定义导航类型
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={InputDemo} 
          options={({ navigation }) => ({
            title: 'AI 输入法',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('Settings')}
                style={{ padding: 8 }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>设置</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            title: '设置',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 