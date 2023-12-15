import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Updates from 'expo-updates';

import News from './src/NewsComponent';
import ItsLearning from './src/ItsLearningComponent';

const HomeScreen = () => {
    const refreshApp = async () => {
        try {
          await Updates.reloadAsync();
        } catch (e) {
          console.error(e);
        }
    };

  return (
    <View style={styles.container}>      
      <News/>
      <ItsLearning/>
    </View>
  );
};

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  news: {
    flex: 3,
    marginBottom: 20,
    marginTop: 15,
    backgroundColor: "#D3D3D3",
  },
  calendar: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#DCDCDC',
  },
  busPrediction: {
    flex: 2,
    backgroundColor: '#C0C0C0',
  },
});*/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 8,
      marginRight: 8,
      marginTop: 8,
    },
    news: {
      flex: 3,
      marginTop: 15,
    },
    calendar: {
      flex: 1,
    },
    busPrediction: {
      flex: 2,
    },
    line: {
      height: 2,
      backgroundColor: 'gray',
      marginTop: 15,
      marginBottom: 15,
    }
});

export default HomeScreen;