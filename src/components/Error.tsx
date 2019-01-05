import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { ApolloError } from 'apollo-client'

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'red'
  }
})

type Props = {
  value: ApolloError
}

export default ({ value }: Props) => (
  <View style={styles.box}>
    <Text style={styles.text}>{value.message}</Text>
  </View>
)
