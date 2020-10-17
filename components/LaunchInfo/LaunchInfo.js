import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, ProgressBarAndroid, BackHandler } from 'react-native';
import { ActivityIndicator, Colors, Text, Button, Subheading, Provider, Portal, Modal, Avatar } from 'react-native-paper';
import getLaunchInfo from '../../services/getLaunchInfo';
import getRocketInfo from '../../services/getRocketInfo';
import getCoresInfo from '../../services/getCoresInfo';
import getCapsuleInfo from '../../services/getCapsuleInfo';
import getCrewInfo from '../../services/getCrewInfo';
import getPayloadsInfo from '../../services/getPayloadsInfo';
import getLaunchpadInfo from '../../services/getLaunchpadInfo';
import getShipsInfo from '../../services/getShipsInfo';
import formatData from '../../services/formatData';
import preventNull from '../../services/preventNull';
import HideableView from '../../services/hideableView';
var patch = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEUAAAD////y8vIYGBgzMzMGBgYjIyP7+/vX19cTExMcHBy1tbWNjY28vLzo6OhmZmZra2t0dHR6enouLi7i4uKBgYGqqqrIyMheXl46OjqHh4fOzs5QUFCcnJxJSUmkpKTN1Es3AAACrklEQVR4nO3XZ3OjMBCAYUsU0WyCcW/5///yWIkisOO7zBh75uZ9vgQWFrRWI4sFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8FyQBdGn2zCT4FKVX+tLGGf/YYVptVvm1/JWf7ohswiLvdZ5+elmzKSu9kYlp/jT7ZhJWCRKJdvw0+2Yy7opz+xmLi8YdKE0Cx5Encsk3bs1bUPRKD0IMhutM+8W65YrpTbrl1c0Eu9XerD5dtFc+1Znr6pC3bz0NPfTdeJauzajfG3sDKvs8bXPrZruU+fZ1xZ5i29po8tJVPUlHpRaeel3N1YSPU2jbvk/buT47BaUtZwk86+dkZFGRYOsb3jahhdZ8yvkXULe/wqWblrpp0duFHp7tXtGa2frbTq6XDV/9Tv2hqhp4td9WCoczgql9v2JNG3bn9kKf6GUhMtNRo65/v32F5A+vJZfnUMbHle48yu8SS8cu7PHFVZ61dLLyaU4KSLbk+fjfd4sNuMJY+w8shUmHbnle8goZP3rTh5XuB0eeH9VulGp0+tL+UGWGE/zarsOTBeQxF/k5WI3L3+usIoyEUyv2Udvgur7Pm02aSeqmwYfumYUvZMbvHXe6tfMpxU+fNdFpnHz+zTPOH/i+zrzK5xejPVoOLs1/5cVum2ksCNdmbd8ZgexJzs+q7Aa+jTvp6KWA/8ZtnCpcB1Mgotus5A3lDIh1O4NFV6me7Pp5+GztKRr3n6ab7tuO426aWxvNm4NjeynRvKGBbVaGb8+7T67pMJn/2HbESv7aLwfjV3t1o9phVoqTM/2sK/pKi82M3+UWnXo6SoIw+e/bnNDWPdHvXblzMIJCaZHOcrGLz6+a1cEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAP/kD4iEZe4YzrNQAAAAASUVORK5CYII='

export default function LaunchInfo(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [launchInfo, setLaunchInfo] = useState(null);
    const [missionPatch, setMissionPatch] = useState(patch);
    const [rocketInfo, setRocketInfo] = useState(null);
    const [coresInfo, setCoresInfo] = useState([]);
    const [capsuleInfo, setCapsuleInfo] = useState(null);
    const [crewInfo, setCrewInfo] = useState([]);
    const [payloadsInfo, setPayloadsInfo] = useState([]);
    const [launchpadInfo, setLaunchpadInfo] = useState(null);
    const [shipsInfo, setShipsInfo] = useState([]);
    const [modalRocketVisible, setModalRocketVisible] = useState(false);
    const [modalCoresVisible, setModalCoresVisible] = useState(false);
    const [modalCapsuleVisible, setModalCapsuleVisible] = useState(false);
    const [modalCrewVisible, setModalCrewVisible] = useState(false);
    const [modalPayloadsVisible, setModalPayloadsVisible] = useState(false);
    const [modalLaunchpadVisible, setModalLaunchpadVisible] = useState(false);
    const [modalShipsVisible, setModalShipsVisible] = useState(false);
    const [modalImagesVisible, setModalImagesVisible] = useState(false);
    const [coreSelected, setCoreSelected] = useState(null);
    const [crewSelected, setCrewSelected] = useState(null);
    const [payloadSelected, setPayloadSelected] = useState(null);
    const [shipSelected, setShipSelected] = useState(null);

    const showModalRocket = () => {setModalRocketVisible(true)}
    const hideModalRocket = () => {setModalRocketVisible(false)}
    const showModalCores = () => {setModalCoresVisible(true)}
    const hideModalCores = () => {setModalCoresVisible(false)}
    const showModalCapsule = () => {setModalCapsuleVisible(true)}
    const showModalCrew = () => {setModalCrewVisible(true)}
    const hideModalCrew = () => {setModalCrewVisible(false)}
    const hideModalCapsule = () => {setModalCapsuleVisible(false)}
    const showModalPayloads = () => {setModalPayloadsVisible(true)}
    const hideModalPayloads = () => {setModalPayloadsVisible(false)}
    const showModalLaunchpad = () => {setModalLaunchpadVisible(true)}
    const hideModalLaunchpad = () => {setModalLaunchpadVisible(false)}
    const showModalShips = () => {setModalShipsVisible(true)}
    const hideModalShips = () => {setModalShipsVisible(false)}
    const showModalImages = () => {setModalImagesVisible(true)}
    const hideModalImages = () => {setModalImagesVisible(false)}

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {props.setSelectedTab(0); return true})
        getLaunchInfo(props.launchID)
            .then((result) => setLaunchInfo(result))
            .catch((errors) => console.log(errors))
            .then(() => setIsLoaded(true));
        return () => {backHandler.remove()}
    }, []);

    useEffect(() => {
        if(launchInfo !== null && (launchInfo.links.patch.small !== null && launchInfo.links.patch.small !== undefined)) {
            setMissionPatch(launchInfo.links.patch.small);
        }
    }, [launchInfo])

    useEffect(() => {
        if(launchInfo !== null) {
            getRocketInfo(launchInfo.rocket)
                .then((result) => setRocketInfo(result))
                .catch((errors) => console.log(errors));
        }
    }, [launchInfo]);

   useEffect(() => {
       if(launchInfo !== null && launchInfo.cores[0].core !== null && launchInfo.cores[0] !== undefined && (coresInfo.length < launchInfo.cores.length)) {
           let index = 0;
            while(parseInt(index) < parseInt(launchInfo.cores.length)) {
                getCoresInfo(launchInfo.cores[parseInt(index)].core)
                    .then((result) => setCoresInfo(prevState => [...prevState, result]))
                    .catch((errors) => console.log(errors));
                    index++;
            }
        }
    }, [launchInfo]);
    
    useEffect(() => {
        if(launchInfo !== null && launchInfo.capsules[0] !== undefined) {
            getCapsuleInfo(launchInfo.capsules[0])
                .then((result) => setCapsuleInfo(result))
                .catch((errors) => console.log(errors));
        }
    }, [launchInfo]);

    useEffect(() => {
        if(launchInfo !== null && (launchInfo.crew[0] !== null && launchInfo.crew[0] !== undefined) && (crewInfo.length < launchInfo.crew.length)) {
            let index = 0;
            while(parseInt(index) < parseInt(launchInfo.crew.length)) {
                getCrewInfo(launchInfo.crew[parseInt(index)])
                    .then((result) => setCrewInfo(prevState => [...prevState, result]))
                    .catch((errors) => console.log(errors));
                    index++;
            }
        }
    }, [launchInfo]);

    useEffect(() => {
        if(launchInfo !== null && (launchInfo.payloads[0] !== undefined && launchInfo.payloads[0] !== null) && (payloadsInfo.length < launchInfo.payloads.length)) {
            let index = 0;
            while(parseInt(index) < parseInt(launchInfo.payloads.length)) {
                getPayloadsInfo(launchInfo.payloads[parseInt(index)])
                    .then((result) => setPayloadsInfo(prevState => [...prevState, result]))
                    .catch((errors) => console.log(errors));
                    index++;
            }
        }
    }, [launchInfo]);

    useEffect(() => {
        if(launchInfo !== null && (launchInfo.launchpad !== undefined || launchInfo.launchpad !== null)) {
            getLaunchpadInfo(launchInfo.launchpad)
                .then((result) => setLaunchpadInfo(result))
                .catch((errors) => console.log(errors));
        }
    }, [launchInfo]);

    useEffect(() => {
        if(launchInfo !== null && (launchInfo.ships[0] !== undefined || launchInfo.ships[0] !== null) && (shipsInfo.length < launchInfo.ships.length)) {
            let index = 0;
            while(parseInt(index) < parseInt(launchInfo.ships.length)) {
                getShipsInfo(launchInfo.ships[parseInt(index)])
                    .then((result) => setShipsInfo(prevState => [...prevState, result]))
                    .catch((errors) => console.log(errors));
                    index++;
            }
        }
    }, [launchInfo]);

    const Progress = (pct) => {
        if(pct !== null && pct !== undefined && Platform.OS === 'android') {
            return(<ProgressBarAndroid
                styleAttr="Horizontal"
                color={Colors.green400}
                indeterminate={false}
                progress={parseFloat(pct)/100}
            />);
        }
        else
            return null;
    }

    const coresList = () => {
        if(coresInfo !== null && coresInfo !== undefined) {
            let cores = [];
            for(let core of coresInfo) {
                cores.push(
                    <View key={Math.random()}>
                        <View style={styles.dataRow}>
                            <Text style={styles.desc}>Versione: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : 'Block ' + preventNull(core.block)}</Text>
                        </View>
                        <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={() => {showModalCores(); setCoreSelected(core.id)}}>ALTRE INFO</Button>
                    </View>
                );
            }
            return cores;
        }
        else {
            return null;
        }
    }

    const findCore = (core) => {
        return core.id === coreSelected;
    }

    const coresModalContent = () => {
        let core = coresInfo.find(findCore);
        if(core !== null && core !== undefined) {
            return(
                <View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Versione: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : 'Block ' + preventNull(core.block)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Seriale: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : preventNull(core.serial)}</Text>
                    </View> 
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Riutilizzi: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : preventNull(core.reuse_count)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Atterraggi su piattaforma di lancio: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : preventNull(core.rtls_landings)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Atterraggi su piattaforma galleggiante: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : preventNull(core.asds_landings)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Lanci totali: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : preventNull(core.launches.length)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Stato attuale: &#09; &#09;</Text><Text style={styles.data}>{coresInfo === null ? 'n.d.' : core.status === 'active' ? 'Attivo' : core.status === 'lost' ? 'Perso' : core.status === 'expended' ? 'Dismesso' : preventNull(core.status)}</Text>
                    </View>
                </View>
            );
        }
        else {
            return null;
        }
    }

    const crewList = () => {
        let crew = [];
        for(let member of crewInfo) {
            crew.push(
                <View key={member.name}>
                    <View style={styles.dataRow}>
                        <Avatar.Image style={{marginRight: 15}} size={25} source={{uri: member.image}} /><Text style={styles.data}>{crewInfo === null ? 'n.d.' : preventNull(member.name)}</Text>
                    </View>
                    <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={() => {showModalCrew(); setCrewSelected(member.name)}}>ALTRE INFO</Button>
                </View>
            );
        }
        return crew;
    }

    const findMember = (member) => {
        return member.name === crewSelected;
    }

    const crewModalContent = () => {
        let member = crewInfo.find(findMember);
        if(member !== null && member !== undefined) {
            return(
                <View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Nome: &#09; &#09;</Text><Text style={styles.data}>{crewInfo === null ? 'n.d.' : preventNull(member.name)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Agenzia: &#09; &#09;</Text><Text style={styles.data}>{crewInfo === null ? 'n.d.' : preventNull(member.agency)}</Text>
                    </View> 
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Missioni: &#09; &#09;</Text><Text style={styles.data}>{crewInfo === null ? 'n.d.' : preventNull(member.launches.length)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Stato: &#09; &#09;</Text><Text style={styles.data}>{crewInfo === null ? 'n.d.' : member.status === 'active' ? 'Operativo' : 'Non operativo'}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image
                            resizeMode="contain"
                            style={styles.crewImg}
                            source={{
                            uri: member.image
                            }}
                        />
                        </View>
                </View>
            );
        }
        else {
            return null;
        }
    }

    const payloadsList = () => {
        let payloads = [];
        for(let payload of payloadsInfo) {
            payloads.push(
                <View key={payload.name}>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Nome: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.name)}</Text>
                    </View>
                    <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={() => {showModalPayloads(); setPayloadSelected(payload.name)}}>ALTRE INFO</Button>
                </View>
            );
        }
        return payloads;
    }

    const findPayload = (payload) => {
        return payload.name === payloadSelected;
    }

    const payloadModalContent = () => {
        let payload = payloadsInfo.find(findPayload);
        if(payload !== null && payload !== undefined) {
            return(
                <View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Nome: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.name)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Tipo: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.type)}</Text>
                    </View> 
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Committente: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.customers[0])}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Produttore: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.manufacturers[0])}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Nazionalità: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.nationalities[0])}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Massa: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.mass_kg)+' Kg'}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Orbita: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.orbit)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Anni di servizio previsti: &#09; &#09;</Text><Text style={styles.data}>{payloadsInfo === null ? 'n.d.' : preventNull(payload.lifespan_years)}</Text>
                    </View>
                </View>
            );
        }
        else {
            return null;
        }
    }

    const shipsList = () => {
        let ships = [];
        for(let ship of shipsInfo) {
            ships.push(
                <View key={ship.name}>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Nome: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.name)}</Text>
                    </View>
                    <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={() => {showModalShips(); setShipSelected(ship.name)}}>ALTRE INFO</Button>
                </View>
            );
        }
        return ships;
    }

    const findShip = (ship) => {
        return ship.name === shipSelected;
    }

    const shipModalContent = () => {
        let ship = shipsInfo.find(findShip);
        if(ship !== null && ship !== undefined) {
            return(
                <View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Nome: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.name)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Tipo: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.type)}</Text>
                    </View> 
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>MMSI: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.mmsi)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Stazza: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.mass_kg)+' Kg'}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Anno di costruzione: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.year_built)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Porto di partenza: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.home_port)}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Ruolo: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : preventNull(ship.roles[0])}</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Stato: &#09; &#09;</Text><Text style={styles.data}>{shipsInfo === null ? 'n.d.' : ship.active === true ? 'Attiva' : 'Non attiva'}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={{
                            uri: ship.image
                            }}
                        />
                        </View>
                </View>
            );
        }
            else {
                return null;
            }
    }

    const showImages = () => {
        if(launchInfo !== null && (launchInfo.links.flickr.original[0] !== null && launchInfo.links.flickr.original[0] !== undefined)) {
            let images = [];
            for(let image of launchInfo.links.flickr.original) {
                images.push(
                    <View key={image} style={{alignItems: 'center'}}>
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={{
                            uri: image
                            }}
                        />
                    </View>
                );
            }
            return images;
        }
        else {
            return null;
        }
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
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.patch}
                        source={{
                        uri: missionPatch
                        }}
                    />
                </View>
                <Subheading style={styles.dataTitles}>DATI DEL LANCIO</Subheading>
                <View style={styles.dataRow}>
                    <Text style={styles.desc}>Data del lancio: &#09; &#09;</Text><Text style={styles.data}>{launchInfo === null ? 'n.d.' : formatData(launchInfo.date_unix)}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.desc}>Data static fire test: &#09; &#09;</Text><Text style={styles.data}>{launchInfo === null ? 'n.d.' : formatData(launchInfo.static_fire_date_unix)}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.desc}>N° lancio: &#09; &#09;</Text><Text style={styles.data}>{launchInfo === null ? 'n.d.' : preventNull(launchInfo.flight_number)}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.desc}>Missione: &#09; &#09;</Text><Text style={styles.data}>{launchInfo === null ? 'n.d.' : preventNull(launchInfo.name)}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.desc}>Esito: &#09; &#09;</Text><Text style={styles.data}>{launchInfo === null ? 'n.d.' : launchInfo.success === null ? '' : launchInfo.success === true ? 'Positivo' : 'Negativo'}</Text>
                </View>
                <Subheading style={styles.dataTitles}>LANCIATORE</Subheading>
                <View style={styles.dataRow}>
                    <Text style={styles.desc}>Tipo: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.name)}</Text>
                </View>
                <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={showModalRocket}>ALTRE INFO</Button>
                <Provider>
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalRocketVisible} onDismiss={hideModalRocket}>
                            <Subheading style={styles.dataTitles}>LANCIATORE</Subheading>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Tipo: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.name)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Altezza: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.height.meters)+' metri'}</Text>
                            </View> 
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Diametro: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.diameter.meters)+' metri'}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Massa: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.mass.kg)+' Kg'}</Text>
                            </View>    
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>N° propulsori: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.engines.number)}</Text>
                            </View>               
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Tipo propulsori: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.engines.type)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Versione propulsori: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.engines.version)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Propellente: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.engines.propellant_1)+' e '+preventNull(rocketInfo.engines.propellant_2)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>N° zampe di atterraggio: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.landing_legs.number)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>N° stadi: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.stages)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>N° boosters: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.boosters)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Costo per lancio: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.cost_per_launch)+' $'}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Primo volo: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.first_flight)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Stato: &#09; &#09;</Text><Text style={styles.data}>{rocketInfo === null ? 'n.d.' : rocketInfo.active === true ? 'Attivo' : 'Non attivo'}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Percentuale di successo: &#09; &#09;</Text>
                                {Progress(rocketInfo === null ? null : rocketInfo.success_rate_pct)}
                                <Text>&#09; &#09;</Text>
                                <Text style={styles.data}>{rocketInfo === null ? 'n.d.' : preventNull(rocketInfo.success_rate_pct)+'%'}</Text>
                            </View>
                        </Modal>
                    </Portal>
                    <Subheading style={styles.dataTitles}>STADI</Subheading>
                    {coresList()}
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalCoresVisible} onDismiss={hideModalCores}>
                            <Subheading style={styles.dataTitles}>STADIO</Subheading>
                            {coresModalContent()}
                        </Modal>
                    </Portal>
                <HideableView hide={capsuleInfo === null ? true : false} style={styles.hideableView}>
                    <Subheading style={styles.dataTitles}>CAPSULA</Subheading>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Tipo: &#09; &#09;</Text><Text style={styles.data}>{capsuleInfo === null ? 'n.d.' : preventNull(capsuleInfo.type)}</Text>
                    </View>
                    <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={showModalCapsule}>ALTRE INFO</Button>
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalCapsuleVisible} onDismiss={hideModalCapsule}>
                            <Subheading style={styles.dataTitles}>CAPSULA</Subheading>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Tipo: &#09; &#09;</Text><Text style={styles.data}>{capsuleInfo === null ? 'n.d.' : preventNull(capsuleInfo.type)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>N° seriale: &#09; &#09;</Text><Text style={styles.data}>{capsuleInfo === null ? 'n.d.' : preventNull(capsuleInfo.serial)}</Text>
                            </View> 
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Riutilizzi: &#09; &#09;</Text><Text style={styles.data}>{capsuleInfo === null ? 'n.d.' : preventNull(capsuleInfo.reuse_count)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Rientri in mare: &#09; &#09;</Text><Text style={styles.data}>{capsuleInfo === null ? 'n.d.' : preventNull(capsuleInfo.water_landings)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Rientri in terraferma: &#09; &#09;</Text><Text style={styles.data}>{capsuleInfo === null ? 'n.d.' : preventNull(capsuleInfo.land_landings)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Stato: &#09; &#09;</Text><Text style={styles.data}>{capsuleInfo === null ? 'n.d.' : capsuleInfo.status === 'active' ? 'Attiva' : 'Non attiva'}</Text>
                            </View>
                        </Modal>
                    </Portal>
                </HideableView>
                <HideableView hide={(crewInfo[0] === null || crewInfo[0] === undefined) ? true : false} style={styles.hideableView}>
                    <Subheading style={styles.dataTitles}>EQUIPAGGIO</Subheading>
                    {crewList()}
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalCrewVisible} onDismiss={hideModalCrew}>
                            <Subheading style={styles.dataTitles}>MEMBRO DELL' EQUIPAGGIO</Subheading>
                            {crewModalContent()}
                        </Modal>
                    </Portal>
                </HideableView>
                <HideableView hide={payloadsInfo === null ? true : false} style={styles.hideableView}>
                    <Subheading style={styles.dataTitles}>CARICO</Subheading>
                    {payloadsList()}
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalPayloadsVisible} onDismiss={hideModalPayloads}>
                            <Subheading style={styles.dataTitles}>CARICO</Subheading>
                            {payloadModalContent()}
                        </Modal>
                    </Portal>
                </HideableView>
                <HideableView hide={launchpadInfo === null ? true : false} style={styles.hideableView}>
                    <Subheading style={styles.dataTitles}>PIATTAFORMA DI LANCIO</Subheading>
                    <View style={styles.dataRow}>
                        <Text style={styles.desc}>Nome: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.name)}</Text>
                    </View>
                    <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={showModalLaunchpad}>ALTRE INFO</Button>
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalLaunchpadVisible} onDismiss={hideModalLaunchpad}>
                        <ScrollView>
                            <Subheading style={styles.dataTitles}>PIATTAFORMA DI LANCIO</Subheading>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Nome: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.name)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Nome completo: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.full_name)}</Text>
                            </View> 
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Località: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.locality)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Stato: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.region)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Latitudine: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.latitude)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Longitudine: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.longitude)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Tentativi di lancio: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.launch_attempts)}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.desc}>Lanci effettuati con successo: &#09; &#09;</Text><Text style={styles.data}>{launchpadInfo === null ? 'n.d.' : preventNull(launchpadInfo.launch_successes)}</Text>
                            </View>
                            </ScrollView>
                        </Modal>
                    </Portal>
                </HideableView>
                <HideableView hide={(shipsInfo[0] === null || shipsInfo[0] === undefined) ? true : false} style={styles.hideableView}>
                    <Subheading style={styles.dataTitles}>IMBARCAZIONI DI RECUPERO</Subheading>
                    {shipsList()}
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalShipsVisible} onDismiss={hideModalShips}>
                            <ScrollView>
                                <Subheading style={styles.dataTitles}>IMBARCAZIONE DI RECUPERO</Subheading>
                                {shipModalContent()}
                            </ScrollView>
                         </Modal>
                    </Portal>
                </HideableView>
                <HideableView hide={launchInfo.links.flickr.original[0] === undefined ? true : false} style={styles.hideableView}>
                    <Subheading style={styles.dataTitles}>IMMAGINI</Subheading>
                    <Button color="#09f" style={styles.moreInfoButton} mode="text" onPress={showModalImages}>MOSTRA</Button>
                    <Portal>
                        <Modal contentContainerStyle={styles.modal} visible={modalImagesVisible} onDismiss={hideModalImages}>
                            <ScrollView>
                                {showImages()}
                            </ScrollView>
                        </Modal>
                    </Portal>
                </HideableView> 
            </Provider>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    patch: {
        alignItems: 'center',
        width: 250,
        height: 250,
        marginBottom: 25
    },
    backButton: {
        alignItems: 'flex-start',
    },
    dataTitles: {
        zIndex: -999,
        marginLeft: 10,
        color: '#ffffff',
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    dataRow: {
        marginLeft: 20,
        flexDirection: 'row'
    },
    moreInfoButton: {
        width: 120
    },
    hideableView: {
        //flex: 1
    },
    modal: {
        padding: 5,
        paddingBottom: 25,
        backgroundColor: '#151515',
        opacity: 0.85,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff'
        //marginBottom:20
    },
    desc: {
        color: '#ffffff'
    },
    data: {
        color: '#ffd700'
    },
    img: {
        width: 320,
        height: 270,
        margin: 5
    },
    crewImg: {
        width: 320,
        height: 270,
        marginTop: 20
    }
})