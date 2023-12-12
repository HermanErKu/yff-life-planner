import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import RSSParser from 'react-native-rss-parser';


const ItsLearning = () => {
    const [rssData, setRssData] = useState("");

    const rssUrl = process.env.EXPO_PUBLIC_ITSLEARNING_LINK; 

    useEffect(() => {
        fetch(rssUrl)
            .then(response => response.text())
            .then(responseData => RSSParser.parse(responseData))
            .then(rss => {
                setRssData(rss)
            });
    }, []);
     

    return (
        <View>
            <Text style={{fontSize: 16}}>{rssData["title"]}</Text>
        </View>
    )
}

export default ItsLearning;