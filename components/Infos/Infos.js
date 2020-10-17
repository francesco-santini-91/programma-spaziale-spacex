import React, { useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';

export default function Infos(props) {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {props.setSelectedTab(0); return true})

        return () => {backHandler.remove()}
    }, []);

    return(
        <View style={styles.container}>
            <Button 
                style={styles.backButton} 
                color="#fff"
                icon="keyboard-backspace" 
                mode="outlined" 
                onPress={() => props.setSelectedTab(0)}>
                    Indietro
            </Button>
            <Title style={styles.title}>Informazioni</Title>
            <Text style={styles.text}>
                Tutti i dati delle missioni, passate e future, presenti in questa App, sono fornite da 
                <Text style={{color: '#ff0'}}> github.com/r-spacex/SpaceX-API</Text>.
            </Text>
            <Text style={styles.text}>
                Gli orari dei lanci sono sincronizzati con il fuso orario del dispositivo dal quale si sta eseguendo l'applicazione.
            </Text>
            <Text style={styles.text}>
                I lanci futuri, contenuti nella sezione "Lanci in programma", potrebbero riportare un orario arbitrario nel caso quello
                ufficiale non fosse ancora stato deciso.          
            </Text>
            <View style={styles.info}>
                <View style={{flexDirection: 'row'}}><Text style={styles.text}>Versione App: </Text><Text style={{color: '#ff0'}}> &#09; 1.0</Text></View>
                <View style={{flexDirection: 'row'}}><Text style={styles.text}>Sviluppatore: </Text><Text style={{color: '#ff0'}}> &#09; Francesco Santini</Text></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    backButton: {
        alignItems: 'flex-start',
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20
    },
    text: {
        color: '#fff',
        textAlign: 'justify'
    },
    info: {
        marginTop: 30
    }
});