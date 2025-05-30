import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import HelpOptionsScreen from '../screens/HelpOptionsScreen';
import OngDetailScreen from '../screens/OngDetailScreen';
import ChatIAScreen from '../screens/ChatIAScreen';
import { RootStackParamList } from '../types/navigation';
import FeedbackScreen from '../screens/FeedbackScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="HelpOptions" component={HelpOptionsScreen} />
      <Stack.Screen name="OngDetail" component={OngDetailScreen} />
      <Stack.Screen name="ChatIA" component={ChatIAScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  );
}
