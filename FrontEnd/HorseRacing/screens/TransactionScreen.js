import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';

export default class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: 'Transactions',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
