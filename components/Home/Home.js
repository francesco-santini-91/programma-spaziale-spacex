import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View  } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { ActivityIndicator, Colors } from 'react-native-paper';

import formatData from '../../services/formatData';
import _nextLaunch from '../nextLaunch.png';

export default function Home(props) {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [nextLaunch, setNextLaunch] = React.useState({});
    const [nextLaunchRocket, setNextLaunchRocket] = React.useState(null);

    useEffect(() => {
        async function fetchNextLaunch() {
          await fetch('https://api.spacexdata.com/v4/launches/next')
            .then(response => response.json())
            .then((json) => {setNextLaunch(json)})
            .catch((errors) => console.log(errors))
            .then(() => {setIsLoaded(true)});
          }
        fetchNextLaunch();
        }, []);
    
    useEffect(() => {
        async function fetchNextLaunchRocket() {
        await fetch('https://api.spacexdata.com/v4/rockets/' + nextLaunch.rocket)
        .then(response => response.json())
        .then((json) => setNextLaunchRocket(json))
        .catch(console.log)
        .finally(() => {setIsLoaded(true)});
        }
        if(nextLaunch.rocket !== null) {
          fetchNextLaunchRocket();
        }
    }, [nextLaunch]);

    if(isLoaded === false) {
        return(
        <ActivityIndicator style={styles.loading} animating={true} size="large" color={Colors.blue400} />
        );
    }
    else {
        return (
        <View style={styles.home}>
          <ScrollView>
            <Title style={{color: '#fff'}}>Prossimo lancio</Title>
            <Card onPress={() => {props.setSelectedLaunchID('next'); props.setSelectedTab(1)}} style={styles.card}>
              <Card.Content>
                <Title style={{color: '#fff', marginTop: 0, opacity: 1}}>{nextLaunch.date_unix === null ? 'n.d.' : formatData(nextLaunch.date_unix)}</Title>
                <Paragraph style={{color: '#ff0', opacity: 1}}>{nextLaunchRocket === null ? '' : nextLaunchRocket.name}</Paragraph>
                <Paragraph style={{color: '#ff0', marginBottom: 10, opacity: 1}}>{nextLaunch.name}</Paragraph>
              </Card.Content>
              <Card.Cover source={_nextLaunch} style={styles.cover}/>
            </Card>
            <Card onPress={() => {props.setSelectedTab(2)}} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Icon icon="rocket" size={41} color={Colors.white} />
                <Title style={{marginLeft: 15, textAlign: 'center', color: '#fff'}}>Lanci passati</Title>
              </Card.Content>
            </Card>
            <Card onPress={() => {props.setSelectedLaunchID('upcoming'); props.setSelectedTab(3)}} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Icon icon="rocket" size={41} />
                <Title style={{marginLeft: 15, textAlign: 'center', color: '#fff'}}>Lanci in programma</Title>
              </Card.Content>
            </Card>
            <Card onPress={() => {props.setSelectedLaunchID('latest'); props.setSelectedTab(4)}} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Icon icon="rocket" size={41} />
                <Title style={{marginLeft: 15, textAlign: 'center', color: '#fff'}}>Ultimo lancio</Title>
              </Card.Content>
            </Card>
            <Card onPress={() => {props.setSelectedTab(5)}} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Icon icon="information-outline" size={41} />
                <Title style={{marginLeft: 15, textAlign: 'center', color: '#fff'}}>Informazioni</Title>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
      //opacity: 0.5
    },
    loading: {
      marginTop: 50,
      marginBottom: 500
    },
    card: {
      backgroundColor: '#121212',
      margin: 3,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 8,
      opacity: 0.7
    },
    cardContent: {
      flexDirection: 'row'
    },
    cover: {
      marginBottom: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      opacity: 1
    }
  });