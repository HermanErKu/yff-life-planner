import { View, StyleSheet, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import News from '../EgdeAiOppgave/src/News';
import Calendar from '../EgdeAiOppgave/src/Calendar';
import BusPrediction from '../EgdeAiOppgave/src/BusPrediction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecondScreen = () => {
    const [data, setData] = useState(null);
    const [busstopp, setBusstopp] = useState("lys");


    const updateBusstopp = (input) => {
        setBusstopp(input);

        fetch('https://rp.akt.no/scripts/TravelMagic/TravelMagicWE.dll/StageJSON?query='+busstopp, {headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }
    

  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center'}}>Hvilken buss tar du? (eks: M1, 40){'\n'}</Text>
      <TextInput
        style={{ paddingTop:20, height: 40, width:"90%", alignSelf:"center", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => updateBusstopp(text)}
      />
      {data ? <Text>{data.suggestions}</Text> : <Text>Test</Text>}
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
});

export default SecondScreen;