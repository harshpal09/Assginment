import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './components/Navigation/StackScreen';
export default function App() {
  return (
    <NavigationContainer>
       <StackScreen />
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({})