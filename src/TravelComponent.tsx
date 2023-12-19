import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Travel = () => {
    const [isBussing, setIsBussing] = useState(true)
    const [isDriving, setIsDriving] = useState(false);
    const getSavedStates = async () => {
        const isBussingGet = await AsyncStorage.getItem("isBussing");
        if (isBussingGet == "true") { setIsBussing(true) } else { setIsBussing(false) };

        const isDrivingGet = await AsyncStorage.getItem("isDriving");
        if (isDrivingGet == "true") { setIsDriving(true) } else { setIsDriving(false) };
    }
    console.log(isBussing);
    
    getSavedStates();


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isBussing == true) {
            const fetchData = async () => {
                const busText = await AsyncStorage.getItem('busLineStore');
                fetch('https://egdeaiapi.hermanerku.repl.co/buss?linje=' + busText, { headers: { 'Content-Type': 'application/json' } })
                    .then(response => response.json())
                    .then(data => {
                        setData(data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error(error);
                        setLoading(false);
                    });
            };
            fetchData();
        }
        else if (isDriving == true) {
            //do vegvesen api (fix later)
        }
    }, []);
    

    if (loading) {
        return <Text>Loading...</Text>;        
    }


    return (
        <ScrollView>
            {isBussing ? data.map((item, index) => { let occupancyNumber = ""; let occupancyText = ""; const key = Object.keys(item)[0]; const destination = item[key].destination; const lineName = item[key].lineName; const occupancy = item[key].occupancy; const delay = item[key].delay; const currentStop = item[key].currentStop; if (occupancy == "ManySeatsAvailable") { occupancyNumber = "1/3"; occupancyText = "Mange sitteplasser tilgjengelig"; } else if (occupancy == "SeatsAvailable") { occupancyNumber = "2/3"; occupancyText = "Noen sitteplasser tilgjengelig"; } else { occupancyNumber = "3/3"; occupancyText = "Ståplasser tilgjengelig"; };  if (delay / 60! > -3 && delay / 60! < 15) { return (<Text key={index}>{lineName} - {destination}.{'\n'}{occupancyText} - {occupancyNumber}{'\n'}{Math.round(delay / 60)} Minutter forsinket{'\n'}På: {currentStop} {'\n'}</Text>); } }) : <Text>You are drivig</Text>}
        </ScrollView>
        
    );
    
};


export default Travel;