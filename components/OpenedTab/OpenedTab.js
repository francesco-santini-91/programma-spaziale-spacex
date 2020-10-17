import React from 'react';
import { View } from 'react-native';

export default function OpenedTab(props) {
    return(
        <View>
            {props.tab()}
        </View>
    );
}