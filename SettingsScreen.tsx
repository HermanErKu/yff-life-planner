import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import News from '../EgdeAiOppgave/src/News';
import Calendar from '../EgdeAiOppgave/src/Calendar';
import BusPrediction from '../EgdeAiOppgave/src/BusPrediction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecondScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center'}}>Hvilken buss tar du? (eks: M1, 40){'\n'}</Text>
      <TextInput
        style={{ paddingTop:20, height: 40, width:"90%", alignSelf:"center", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={async text => await AsyncStorage.setItem('busLineStore', text)}
      />
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