import React from 'react';
import { StyleSheet, View, Platform  } from 'react-native';
import { Appbar } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function AppBar() {
    return(
        <View>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Content title="Programma spaziale SpaceX" subtitle={''} />
            </Appbar.Header>
        </View>
    );
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: '#000'
    }
});