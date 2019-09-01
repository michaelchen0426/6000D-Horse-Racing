import React from 'react';
import { 
  SectionList, 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  Button,
  AsyncStorage
} from 'react-native';
import { Constants } from 'expo';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
    headerStyle: {
      backgroundColor: 'rgba(13, 13, 33, 1)'
    },
    headerTitleStyle: {
      color: "#fff",
      fontSize: 20,
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      wallet: "",
      key: ""
    };
  }

  componentDidMount() {
    this._getWallet();
  }
  
  render() {
    const { manifest } = Constants;
    const sections = [
      { data: [{ value: manifest.version }], title: 'Version' },
      { data: [{ value: this.state.wallet }], title: 'Wallet' },
      {
        data: [{ value: 'Sign Out', type: 'button' }],
        title: 'Sign Out',
      }
    ];

    return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={ListHeader}
        sections={sections}
      />
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _renderSectionHeader = ({ section }) => {
    if (section.title === 'Sign Out')
      return null;
    return <SectionHeader title={section.title} />;
  };

  _getWallet = async () => {
    let wallet = await AsyncStorage.getItem('wallet');
    let key = await AsyncStorage.getItem('key');

    this.setState({
      wallet,
      key
    });
  }

  _renderItem = ({ item }) => {
    if (item.type === 'button') {
      return (
        <SectionContent>
          {item.value && <Button title={item.value} onPress={this._signOutAsync} />}
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

const ListHeader = () => {
  const { manifest } = Constants;

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl={manifest.iconUrl} />
      </View>

      <View style={styles.titleTextContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {manifest.name}
        </Text>

        <Text style={styles.slugText} numberOfLines={1}>
          {manifest.slug}
        </Text>

        <Text style={styles.descriptionText}>
          {manifest.description}
        </Text>
      </View>
    </View>
  );
};

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

const AppIconPreview = ({ iconUrl }) => {
  if (!iconUrl) {
    iconUrl =
      'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
  }

  return (
    <Image
      source={{ uri: iconUrl }}
      style={{ width: 64, height: 64 }}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 33, 1)'
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
    color: "#fff"
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

