import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RSSParser from 'react-native-rss-parser';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';


const ItsLearning = () => {
    const openLinkInBrowser = async (link) => {
        const inAppBrowser = await AsyncStorage.getItem("inAppBrowser");
        if (inAppBrowser == 'true'){
            WebBrowser.openBrowserAsync(link);
        }
        else
        {
            Linking.openURL(link);
        }
    }


    const rssUrl = process.env.EXPO_PUBLIC_ITSLEARNING_LINK; 
    const rssList = process.env.EXPO_PUBLIC_ITSLEARNING_LINKS_LIST; 
        
    
    const [rssData, setRssData] = useState([]);

    /*const loopTroughRSS = (rssList) => {
        rssList = rssList.split(",");
        for (let x = 0; x < rssList.length; x++) {
            const element = rssList[x];
            //console.log(element);
        


            useEffect(() => {
                fetch(element)
                    .then(response => response.text())
                    .then(responseData => RSSParser.parse(responseData))
                    .then(rss => {
                        if (Array.isArray(rss.items)) {
                            setRssData(rss.items);
                        }
                    })
                    .catch(error => console.log(error)
                    );
            }, []);
        }
    }*/

    useEffect(() => {
        fetch(rssUrl)
            .then(response => response.text())
            .then(responseData => RSSParser.parse(responseData))
            .then(rss => {
                if (Array.isArray(rss.items)) {
                    setRssData(rss.items);
                }
            })
            .catch(error => console.log(error)
            );
    }, []);


    const map = [0, 1, 2];
    const list = [];
    const elements = map.map((item, index) => (
        <View key={item}>
            <Text style={{ fontSize: 20 }}>{rssData && rssData[index] && rssData[index].title}</Text>
            <TouchableOpacity onPress={() => openLinkInBrowser(rssData && rssData[index] && rssData[index].links[0].url)}>
                <Text>{rssData && rssData[index] && rssData[index].links[0].url} {'\n'}</Text>
            </TouchableOpacity>
        </View>
    ));
    
         
 
    return (
        <ScrollView>
            {elements}
        </ScrollView>
    )
 }
 
 export default ItsLearning;