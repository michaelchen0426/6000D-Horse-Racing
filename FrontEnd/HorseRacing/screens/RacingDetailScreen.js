import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
} from 'react-native';
import namor from 'namor';
import { Text, Button, Badge, Divider } from 'react-native-elements';

import RacingPlayer from '../components/RacingPlayer';

export default class RacingDetailScreen extends React.Component {
    static navigationOptions = {
        title: "Details",
    };

    constructor(props) {
        super(props);

        numberOfPlayer = 12;

        position = [];
        for (let index = 0; index < numberOfPlayer; index++) {
            position.push(index + 1);
        }

        this.state = {
            selected: (new Map()),
            selectedNumber: 0,
            numberOfPlayer,
            position: this._shuffle(position),
            data: this._mockData(numberOfPlayer)
        }
    }

    _mockData = (length) => {
        let result = [];
        for (let index = 0; index < length; index++) {
            result.push({
                id: index,
                name: `${index}, ${namor.generate({ words: 3, numbers: 0, manly: true })}`,
                type: `${namor.generate({ words: 2, numbers: 0 })}`,
                description: `${namor.generate({ words: 3, numbers: 0 })}`,
                rate: 110 + Math.floor(Math.random() * 30)
            });
        }

        return result;
    }

    _shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    _renderItem = ({ item }) => (
        <RacingPlayer
            id={item.id}
            name={item.name}
            type={item.type}
            description={item.description}
            rate={item.rate}
            position={position[item.id]}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
        />
    );

    _keyExtractor = (item, index) => `player-${item.id}`;

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            let prevSelectedNumber = state.selectedNumber;
            let newStatus = !selected.get(id)

            selected.set(id, newStatus); // toggle

            if (newStatus) {
                prevSelectedNumber += 1;
            } else {
                prevSelectedNumber -= 1;
            }
            return { selected, selectedNumber: prevSelectedNumber };
        });
    };

    renderRaceDescription() {
        const {
            navigation
        } = this.props;
        const raceDescriotion = navigation.getParam('data', 'NO Data');

        if (raceDescriotion === 'NO Data')
            return null

        const {
            title,
            time,
            type,
            rounds,
            competition
        } = raceDescriotion;
        const {
            textStyle,
            descriptionViewStyle
        } = styles;

        return (
            <View style={descriptionViewStyle}>
                <Text style={textStyle}>{time}</Text>
                <Text style={textStyle}>{type}</Text>
                <Text style={textStyle}>{rounds}</Text>
                <Text style={textStyle}>{competition}</Text>
            </View>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                {this.renderRaceDescription()}
                <Divider/>
                <View style={styles.tableHeaderStyle}>
                    <Text style={styles.textHeaderStyle}>Detail</Text>
                    <View style={{ flexDirection: "row", marginRight: 45 }}>
                        <Text style={{ ...styles.textHeaderStyle, marginRight: 10 }}>Draw</Text>
                        <Text style={styles.textHeaderStyle}>Win</Text>
                    </View>
                </View>
                <FlatList
                    style={{ flex: 1}}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                <View style={{ height: 20 }} />
                <Button
                    buttonStyle={styles.buttonStyle}
                    iconRight
                    icon={
                        <Badge status="success" badgeStyle={{ marginLeft: 10 }} value={this.state.selectedNumber} />
                    }
                    title="Payment"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    tableHeaderStyle: {
        marginHorizontal: 15,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonStyle: {
        height: 45
    },
    textHeaderStyle: {
        fontSize: 16,
        fontWeight: '800'
    },
    descriptionViewStyle: {
        marginLeft: 15,
        justifyContent: 'flex-start'
    },
    textStyle: {
        marginBottom: 2
    }
});