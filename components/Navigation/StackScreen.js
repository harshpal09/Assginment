import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../Screens/HomePage';
import Profile from '../Screens/Profile';
const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="details" component={Profile} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})