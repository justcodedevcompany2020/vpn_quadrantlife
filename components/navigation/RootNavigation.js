import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../pages/auth/AuthScreen';
import MainScreen from '../pages/main/MainScreen';
import ChoseLocation from '../pages/choselocation/ChoseLocation';
import PremiumScreen from '../pages/premium/PremiumScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={({route}) => ({
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          })}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={({route}) => ({
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          })}
        />
        <Stack.Screen
          name="ChoseLocation"
          component={ChoseLocation}
          options={({route}) => ({
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          })}
        />
        <Stack.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={({route}) => ({
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
