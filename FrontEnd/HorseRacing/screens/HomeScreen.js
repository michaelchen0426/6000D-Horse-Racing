import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, Divider } from 'react-native-elements';

import HorseRacingCard from '../components/HorseRacingCard';
import { racingList } from '../constants/MockData';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: racingList
    };
  }

  _onPressRace = (raceData) => {
    this.props.navigation.navigate('Details', { data: raceData });
  }

  render() {
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 'bold'
            }}>
              Coming Racing..
            </Text>
          </View>
          <Divider style={{ marginTop: -10, backgroundColor: 'white' }}/>
          {data.map((raceData, index) =>
            <HorseRacingCard
              key={index}
              raceData={raceData}
              onPress={this._onPressRace}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 33, 1)',
  },
  contentContainer: {
    paddingTop: 45,
  },
  welcomeContainer: {
    flexDirection: "column",
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  }
});
