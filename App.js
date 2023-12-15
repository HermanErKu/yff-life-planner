import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

const App = () => {
    const refreshApp = async () => {
        try {
            await Updates.reloadAsync();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({ focused }) => (<Ionicons name={focused ? 'home' : 'home-outline'} size={26} style={{ marginBottom: -3 }}/>), headerLeft: () => ( <Ionicons onPress={() => refreshApp()} name={'refresh'} size={26} style={{ marginBottom: -3, marginLeft: 10, }}/> )}}/>
                <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: ({ focused }) => (<Ionicons name={focused ? 'settings' : 'settings-outline'} size={26} style={{ marginBottom: -3 }}/>),}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;