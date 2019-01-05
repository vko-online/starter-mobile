import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text
} from 'react-native'

import { GetAllCategories } from '../../types/models.generated'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

export default class Screen extends Component<{}> {
  render () {
    return (
      <ScrollView>
        <Text>Main</Text>
        <GetAllCategories.Component>
          {
            ({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error value={error} />

              return data && data.categories.edges.map((edge) => (
                edge && <Text key={edge.node.id}>{edge.node.name}</Text>
              ))
            }
          }
        </GetAllCategories.Component>
      </ScrollView>
    )
  }
}
