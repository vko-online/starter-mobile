import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'green'
  }
})

export default () => (
  <View style={styles.box}>
    <Text style={styles.text}>Loading</Text>
    <ActivityIndicator />
  </View>
)
