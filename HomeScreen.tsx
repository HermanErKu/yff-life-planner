import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Updates from 'expo-updates';
import News from './src/NewsComponent';
import ItsLearning from './src/ItsLearningComponent';
import Travel from './src/TravelComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const [travelState, setTravelState] = useState(true);
    const [newsState, setNewsState] = useState(true);
    const [itslearningState, setItslearningState] = useState(true);

    const getSavedStates = async () => {
        const travelGet = await AsyncStorage.getItem("travel");
        if (travelGet == "true") { setTravelState(true) } else { setTravelState(false) };

        const newsGet = await AsyncStorage.getItem("news");
        if (newsGet == "true") { setNewsState(true) } else { setNewsState(false) };

        const itslearningGet = await AsyncStorage.getItem("itslearning");
        if (itslearningGet == "true") { setItslearningState(true) } else { setItslearningState(false) };
    }

    getSavedStates();

    return (
        <View style={styles.container}>
            
            {/* Travel Component */}
            {travelState ? <View style={styles.travel}><Travel /></View> : null}

            {/* News Component */}
            {newsState ? <View style={styles.line} /> : null}
            {newsState ? <View style={styles.news}><News/></View> : null}

            {/* ItsLearning Component */}
            {itslearningState ? <View style={styles.line} /> : null}
            {itslearningState ? <View style={styles.calendar}><ItsLearning /></View> : null}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 8,
      marginRight: 8,
      marginTop: 8,
    },
    news: {
      flex: 40,
      marginTop: 15,
    },
    calendar: {
      flex: 40,
    },
    travel: {
      flex: 20,
    },
    line: {
      height: 2,
      backgroundColor: 'gray',
      marginTop: 15,
      marginBottom: 15,
    }
});

export default HomeScreen;