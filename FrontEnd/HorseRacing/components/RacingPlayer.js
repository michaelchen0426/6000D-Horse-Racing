import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';

export default class RacingPlayer extends React.Component {
    render() {
        const {
            id,
            name,
            type,
            description,
            onPressItem,
            selected,
            position,
            rate
        } = this.props;
        const {
            containerStyle,
            detailViewStyle,
            rateViewStyle,
            nameTextStyle
        } = styles;

        return (
            <Card containerStyle={{
                backgroundColor: 'rgba(13, 13, 33, 1)',
                borderWidth: 0,
                borderBottomWidth: 1
            }}>
                <TouchableOpacity
                    key={id}
                    style={containerStyle}
                    onPress={() => onPressItem(id)}
                >
                    <View style={detailViewStyle}>
                        <Text style={nameTextStyle}>{name}</Text>
                        <Text style={{ color: "#fff" }}>{type}</Text>
                        <Text style={{ color: "#fff" }}>{description}</Text>
                    </View>
                    <View style={rateViewStyle}>
                        <Text style={{ marginRight: 20, color: "#fff" }}>
                            {position}
                        </Text>
                        <Text style={{ marginRight: 10, color: "#fff" }}>
                            {rate}
                        </Text>
                        <Icon
                            name={selected ? 'check-circle' : 'plus-circle'}
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: 'rgba(13, 13, 33, 1)',
    },
    detailViewStyle: {
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: 'rgba(13, 13, 33, 1)',
        color: "#fff"
    },
    rateViewStyle: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    },
    nameTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: "#fff"
    }
})