import { View, StyleSheet, Text, TextInput, Button, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import TestComponent from '../yff-life-planner/src/testComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';


const SecondScreen = () => {
    const refreshApp = async () => {
        try {
          await Updates.reloadAsync();
        } catch (e) {
          console.error(e);
        }
    };
    
    
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

    const [inAppBrowser, setInAppBrowser] = useState(true);
    const toggleBrowserSwitch = async () => {
        setInAppBrowser(previousState => !previousState);
        let stateStringBrowser = (!inAppBrowser).toString();
        await AsyncStorage.setItem('inAppBrowser', stateStringBrowser);  
        
        refreshApp();
    }


    const [itslearning, setItslearning] = useState(true);
    const toggleItslearningSwitch = async () => {
        setItslearning(previousState => !previousState);
        let stateStringItslearning = (!itslearning).toString();
        await AsyncStorage.setItem('itslearning', stateStringItslearning);  
        
        refreshApp();
    }


    const updateSwitchesFromSave = async () => {
        const inAppBrowserGet = await AsyncStorage.getItem("inAppBrowser")
        if (inAppBrowserGet == "true") { setInAppBrowser(true) } else { setInAppBrowser(false) }
        
        const itsLearningGet = await AsyncStorage.getItem("itslearning")
        if (itsLearningGet == "true") { setItslearning(true) } else { setItslearning(false) }
    }

    updateSwitchesFromSave();

    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center'}}>Hvilket busstopp tar du buss fra?{'\n'}</Text>
            <TextInput
                style={{ paddingTop:20, height: 40, width:"90%", alignSelf:"center", borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => updateBusstopp(text)}
            />
            {data ? <Text>{data['suggestions']}</Text> : <Text>Test</Text>}
            <View style={styles.line} />
            
            
            {/* In app browser switch */}
            <Text>{'\n'}In app browser:{'\n'}</Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={inAppBrowser ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleBrowserSwitch}
                value={inAppBrowser}
            />
            <Text>{'\n'}{inAppBrowser.toString()}</Text>



            {/* ItsLearning switch */}
            <Text>{'\n'}ItsLearning updates:{'\n'}</Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={itslearning ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleItslearningSwitch}
                value={itslearning}
            />
            <Text>{'\n'}{itslearning.toString()}</Text>
        </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 200,
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