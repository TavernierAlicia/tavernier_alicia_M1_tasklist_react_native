import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppView from './components/view'

export default function App() {
  return (
    <View style={styles.container}>
      <AppView></AppView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
