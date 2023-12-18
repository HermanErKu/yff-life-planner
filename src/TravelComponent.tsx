import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

"isBussing"

const Travel = () => {

    const [isBussing, setIsBussing] = useState(true)
    const [isDriving, setIsDriving] = useState(false);
    const getSavedStates = async () => {
        const isBussingGet = await AsyncStorage.getItem("isBussing");
        if (isBussingGet == "true") { setIsBussing(true) } else { setIsBussing(false) };

        const isDrivingGet = await AsyncStorage.getItem("isDriving");
        if (isDrivingGet == "true") { setIsDriving(true) } else { setIsDriving(true) };
    }
    console.log(isBussing);
    
    getSavedStates();


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    if (isBussing == true) {
        useEffect(() => {
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
        }, []);
    }
    else if (isDriving == true) {
        //do vegvesen api
    }

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView>
            {isBussing ? data.map((item, index) => { const key = Object.keys(item)[0]; const destination = item[key].destination; const lineName = item[key].lineName; const occupancy = item[key].occupancy; const delay = item[key].delay; const currentStop = item[key].currentStop; if (delay / 60! > -7 && delay / 60! < 15) { return (<Text key={index}>{lineName} - {destination}.  {occupancy} {'\n'} {Math.round(delay / 60)} Minutter forsinket. På: {currentStop} {'\n'}</Text>); } }) : null}
            {isDriving ? <Text>You are drivig</Text> : null}
        </ScrollView>
        
    );
};


export default Travel;