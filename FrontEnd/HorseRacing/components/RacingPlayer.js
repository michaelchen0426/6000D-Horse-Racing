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
            <Card >
                <TouchableOpacity
                    key={id}
                    style={containerStyle}
                    onPress={() => onPressItem(id)}
                >
                    <View style={detailViewStyle}>
                        <Text style={nameTextStyle}>{name}</Text>
                        <Text>{type}</Text>
                        <Text>{description}</Text>
                    </View>
                    <View style={rateViewStyle}>
                        <Text style={{marginRight: 20}}>
                            {position}
                        </Text>
                        <Text style={{marginRight: 10}}>
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
        alignItems: "flex-start"
    },
    detailViewStyle: {
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    rateViewStyle: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    },
    nameTextStyle: {
        fontSize: 16,
        fontWeight: '600'
    }
})