import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import News from '../EgdeAiOppgave/src/News';
import Calendar from '../EgdeAiOppgave/src/Calendar';
import BusPrediction from '../EgdeAiOppgave/src/BusPrediction';
import * as Updates from 'expo-updates';

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
      <Button title="Refresh App" onPress={refreshApp} />
      <View style={styles.news}>
        <News />
      </View>
      <View style={styles.line} />
      <View style={styles.calendar}>
        <Calendar />
      </View>
      <View style={styles.line} />
      <View style={styles.busPrediction}>
        <BusPrediction />
      </View>
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