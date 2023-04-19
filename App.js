import { HomePage } from './components/HomePage';
import { DishPage } from './components/DishPage';
import { Profile } from './components/ProfilePage';
import { AddReview } from './components/AddReview.js';
import {Result} from "./components/Result";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Feather } from '@expo/vector-icons';
import { LoginPage } from './components/LoginPage';

import {
  View,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: '#f6f6f6f' } }}>
      <Stack.Group
      // screenOptions={{
      //   headerShown: false}}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomePage}
        />
        <Stack.Screen name="Result" component={Result} options={{ title: 'Search Result' }}/>
        <Stack.Screen name="Food" component={DishPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator sceneContainerStyle={{ backgroundColor: '#f6f6f6f' }}>
          <Tab.Screen
            name="Home"
            component={Root}
            options={{
              tabBarActiveTintColor: '#FF7C60',
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Add Food Review"
            component={AddReview}
            options={{
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'Add Review',
              tabBarIcon: ({ color, size }) => (
                <Feather name="plus-circle" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="About Us"
            component={AboutPage}
            options={{
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'About Us',
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Contacy Us"
            component={ContactPage}
            options={{
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'Contact Us',
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Login"
            component={LoginPage}
            options={{
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'Login',
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    padding: 8,
  }
});
