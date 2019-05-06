import React from 'react';
import {
  ScrollView, StyleSheet,
  View,
  Text,
  SectionList,
  Linking,
  Button
} from 'react-native';
import { Card } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';

export default class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: 'Transactions',
    headerStyle: {
      backgroundColor: 'rgba(13, 13, 33, 1)'
    },
    headerTitleStyle: {
      color: "#fff",
      fontSize: 20,
    }
  };

  render() {
    const sections = [
      { data: [{ value: "N/A" }], title: 'Personal Contract' },
      {
        data: [{
          value: "0x2Bc235b4E4bDe64cb70Ba5F277ccFEFFEa8f2557"
        },
        {
          value: "https://ropsten.etherscan.io/address/0x2bc235b4e4bde64cb70ba5f277ccfeffea8f2557",
          type: "button"
        }
        ], title: 'System Contract'
      }
    ];

    return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => index}
        sections={sections}
      />
    );
  }

  _renderSectionHeader = ({ section }) => {
    if (section.title === 'Sign Out')
      return null;
    return <SectionHeader title={section.title} />;
  };

  _renderItem = ({ item }) => {
    if (item.type === 'button') {
      return (
        <SectionContent>
          {item.value && <Button title='Click Here To View System Contract' onPress={ ()=> Linking.openURL(item.value) } />}
        </SectionContent>
      );
    } else {
      return (
        <SectionContent>
          <Text style={styles.sectionContentText}>
            {item.value}
          </Text>
        </SectionContent>
      );
    }
  };
}

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>
        {title}
      </Text>
    </View>
  );
};

const SectionContent = props => {
  return (
    <View style={styles.sectionContentContainer}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'rgba(13, 13, 33, 1)',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  sectionHeaderContainer: {
    backgroundColor: 'rgba(13, 13, 33, 1)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    //borderWidth: StyleSheet.hairlineWidth,
    //borderColor: '#ffffff',
    color: "#ffffff"
  },
  sectionHeaderText: {
    fontSize: 14,
    color: "#ffffff"
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d',
  }
});
