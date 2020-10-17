import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView  } from 'react-native';

import AppBar from './components/AppBar/AppBar';
import Home from './components/Home/Home';
import OpenedTab from './components/OpenedTab/OpenedTab';
import LaunchInfo from './components/LaunchInfo/LaunchInfo';
import LaunchesList from './components/LaunchesList/LaunchesList';
import Infos from './components/Infos/Infos';

import bg from './components/bg.jpg';

export default function App() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedLaunchID, setSelectedLaunchID] = React.useState(null);
      
  const getContent = () => {
    switch(selectedTab) {
      case 0: 
        return <Home setSelectedTab={setSelectedTab} setSelectedLaunchID={setSelectedLaunchID}/>
      case 1:
        return <LaunchInfo setSelectedTab={setSelectedTab} launchID={selectedLaunchID} />
      case 2:
        return <LaunchesList setSelectedTab={setSelectedTab} setSelectedLaunchID={setSelectedLaunchID} launchID='past' />
      case 3:
        return <LaunchesList setSelectedTab={setSelectedTab} setSelectedLaunchID={setSelectedLaunchID} launchID='upcoming' /> 
      case 4:
        return <LaunchInfo setSelectedTab={setSelectedTab} launchID={selectedLaunchID} />
      case 5:
        return <Infos setSelectedTab={setSelectedTab} />
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.background}>
      <StatusBar style="light" />
      <AppBar />
      <ScrollView>
      <OpenedTab tab={getContent} />
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
},
});
