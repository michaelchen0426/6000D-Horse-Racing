import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';

export default class HorseRacingCard extends React.Component {
    render() {
        const {
            textStyle
        } = styles;
        const {
            raceData,
            onPress
        } = this.props;
        const {
            title,
            time,
            type,
            rounds,
            competition
        } = raceData;

        return (
            <Card title={title}>
                <TouchableOpacity style={styles.cardContentStyle} onPress={() => onPress(raceData)}>
                    <Image
                        style={{ width: 100, height: 150 }}
                        resizeMode="cover"
                        source={require('../assets/images/racing.jpg')}
                    />
                    <View style={styles.descriptionViewStyle}>
                        <Text style={textStyle}>{time}</Text>
                        <Text style={textStyle}>{type}</Text>
                        <Text style={textStyle}>{rounds}</Text>
                        <Text style={textStyle}>{competition}</Text>
                    </View>
                    <Icon
                        name='chevron-right'
                        type='font-awesome'
                        color='#517fa4'
                    />
                </TouchableOpacity>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {

    },
    cardContentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    descriptionViewStyle: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'flex-start'
    },
    textStyle: {
        marginBottom: 10
    }
})