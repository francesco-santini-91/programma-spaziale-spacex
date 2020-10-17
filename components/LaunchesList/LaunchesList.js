import React, {useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, BackHandler  } from 'react-native';
import { ActivityIndicator, Card, Title, Button, Paragraph, Colors } from 'react-native-paper';

import getLaunchInfo from '../../services/getLaunchInfo';
import formatData from '../../services/formatData';

export default function LaunchesList(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {props.setSelectedTab(0); return true})
        getLaunchInfo(props.launchID)
            .then((result) => setLaunches(result))
            .catch((errors) => console.log(errors))
            .then(() => setIsLoaded(true));
        return () => {backHandler.remove()}
    }, []);

    const showLaunchesList = () => {
        let launchesList = [];
        for(let launch of launches) {
            launchesList.push(
                <View key={launch.id}>
                    <Card onPress={() => {props.setSelectedLaunchID(launch.id);props.setSelectedTab(1)}} style={styles.card}>
                        <Card.Content>
                            <Title style={{color: '#fff', marginTop: 0, opacity: 1}}>{launch.date_unix === null ? 'n.d.' : formatData(launch.date_unix)}</Title>
                            <Paragraph style={{color: '#ff0', opacity: 1}}>N° lancio: {launch.flight_number === null ? '' : launch.flight_number}</Paragraph>
                            <Paragraph style={{color: '#ff0', marginBottom: 10, opacity: 1}}>Missione: {launch.name}</Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            );
        }
        return launchesList;
    }

    return(isLoaded === false ? <ActivityIndicator style={styles.loading} animating={true} size="large" color={Colors.blue400} /> :
        <View style={styles.container}>
            <Button 
                style={styles.backButton} 
                color="#fff"
                icon="keyboard-backspace" 
                mode="outlined" 
                onPress={() => props.setSelectedTab(0)}>
                    Indietro
            </Button>
            <ScrollView>
                {showLaunchesList()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButton: {
        alignItems: 'flex-start',
    },
    loading: {
      marginTop: 50,
      marginBottom: 500
    },
    card: {
      padding: 0,
      backgroundColor: '#121212',
      margin: 3,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 8,
      opacity: 0.7
    },
    cardContent: {
      flexDirection: 'row'
    }
  });