import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RSSParser from 'react-native-rss-parser';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const ItsLearning = () => {
    const [rssData, setRssData] = useState([]);
 
    const rssUrl = process.env.EXPO_PUBLIC_ITSLEARNING_LINK; 
 
    useEffect(() => {
        fetch(rssUrl)
            .then(response => response.text())
            .then(responseData => RSSParser.parse(responseData))
            .then(rss => {
                if (Array.isArray(rss.items)) {
                   setRssData(rss.items);
                }
            });
    }, []);   
    
    const map = [0, 1, 2];
    const elements = map.map((item, index) => (
        <View key={item}>
            <Text style={{fontSize: 20}}>{rssData && rssData[index] && rssData[index].title}</Text>
            {/*<Text>{rssData && rssData[index] && rssData[index].links[0].url} {'\n'}</Text>*/}
            <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(rssData && rssData[index] && rssData[index].links[0].url)}>
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