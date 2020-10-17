import React from 'react';
import { View } from 'react-native';

export default function HideableView(props) {
    const { hide, children, style } = props;
        if(hide === true) {
            return null;
        }
        else {
            return(
                <View style={style} {...props}>
                    {children}
                </View>
            );
        }
}