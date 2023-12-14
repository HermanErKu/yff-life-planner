import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Article {
    title: string;
    url: string;
}

interface ApiResponse {
    articles: Article[];
}


const News = () => {
    const [data, setData] = useState<ApiResponse | null>(null);

    const apiKey = process.env.EXPO_PUBLIC_NEWS_API_KEY;

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?country=no&apiKey='+apiKey, {headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

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

    const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const elements = map.map((item, index) => (
        <View key={item}>
            <TouchableOpacity onPress={() => openLinkInBrowser(data.articles[index].url)}>
                <Text>{data && data.articles && data.articles[index] ? data.articles[index].title: 'Loading...'} {'\n'}</Text>
            </TouchableOpacity>
        </View>
    ));

    return (
        <ScrollView>
            {elements}
        </ScrollView>
    );
};

export default News;