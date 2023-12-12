import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import TestComponent from '../yff-life-planner/src/testComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SecondScreen = () => {
    const [data, setData] = useState(null);
    const [busstopp, setBusstopp] = useState("lys");

    

    const updateBusstopp = (input) => {
        setBusstopp(input);
        async input => await AsyncStorage.setItem('busStopStore', input)

        fetch('https://rp.akt.no/scripts/TravelMagic/TravelMagicWE.dll/StageJSON?query='+busstopp, {headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }
    

    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center'}}>Hvilket busstopp tar du buss fra?{'\n'}</Text>
            <TextInput
                style={{ paddingTop:20, height: 40, width:"90%", alignSelf:"center", borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => updateBusstopp(text)}
            />
            {data ? <Text>{data['suggestions']}</Text> : <Text>Test</Text>}
            <View style={styles.line} />
            
            <View>
                <Text>Test</Text>
            </View>
        </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 400,
        alignItems: 'center',
        
    },
    section: {
        flex: 1,
    },
    line: {
        height: 2,
        width: "100%",
        backgroundColor: 'gray',
        marginTop: 15,
        marginBottom: 15,
    },
});

export default SecondScreen;