import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Saved extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Saved page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})