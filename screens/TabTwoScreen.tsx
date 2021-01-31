import * as React from 'react';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Container } from "@material-ui/core";
import { Text, View } from '../components/Themed';
import { LineChart } from 'react-native-chart-kit';
import { API_KEY } from 'react-native-dotenv';
=======
import {useState, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button, Container} from "@material-ui/core";
import {Text, View} from '../components/Themed';
import {LineChart} from 'react-native-chart-kit';
import {API_KEY} from 'react-native-dotenv';
>>>>>>> b47ccc92ea3fa184e588f18c98bcf194a098edb6
import _ from 'lodash';
import map from 'lodash/map';

export async function getStockData(stock: string) {
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${API_KEY}`);
    let json = await response.json();
    return json;
}

export async function getRandomStock() {
    let response = await fetch('https://raybb.github.io/random-stock-picker/stocks.json');
    let stonks = await response.json();
    return _.sample(stonks);
}

export async function getStockInfo(stock: string) {
    let response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${API_KEY}`)
    let stonks = await response.json();
    return stonks;
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const chartConfig = {
    backgroundGradientFrom: "rgba(20, 60, 30)",
    backgroundGradientFromOpacity: 0.7,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(100, 255, 210, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: true, // optional
};

export default function Stonks() {
    const [stock, setStock] = useState('Loading stock...');
    const [stockLabels, setStockLabels] = useState<string[]>([]);
    const [stockData, setStockData] = useState<string[]>([]);
    const [stockName, setStockName] = useState('Loading stock...');
    const [stockDesc, setStockDesc] = useState('');
    const [stockPrice, setStockPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {          
            let stonk = await getRandomStock();
            let data = await getStockData(stonk);
            let info = await getStockInfo(stonk);
            let attempts = 0;

            let timeSeries = data['Time Series (5min)'];

            while (timeSeries === undefined && info['Description'] === undefined && attempts < 5) {
              stonk = await getRandomStock();
              data = await getStockData(stonk);
              info = await getStockInfo(stonk);
  
              timeSeries = data['Time Series (5min)'];
              attempts++;
            }

            const times = map(timeSeries, (val, key) => {
                return key.split(' ')[1];
            });
            let rTimes = _.reverse(times);

            const amountData = map(timeSeries, (val, key) => {
                return val['1. open'];
            });

            setStockLabels([]);
            setStock(stonk);
            setStockData(amountData);
            setStockName(info['Name']);
            setStockDesc(info['Description']);
            setStockPrice(`Stock price: ${amountData[amountData.length - 1]}`);
        }
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Text style={styles.price}>{stockPrice}</Text>
              <Text style={styles.ticker}>{stock}</Text>
              <div style={{display: 'block', position: 'absolute', right: "1.75%", top: "1.75%"}}>
                <Button style={{color: '#143C1D'}}>Buy</Button>
                <Button style={{marginLeft: 20, color: '#143c1d'}}>Sell</Button>
              </div>
            </div>
            
            <View style={styles.data}>

                {/* todo: charts, Data information */}
                    <LineChart
                        data={{
                            labels: stockLabels,
                            datasets: [
                                {
                                    data: stockData
                                }
                            ]
                        }}
                        width={screenWidth * 0.9}
                        height={screenHeight / 2}
                        chartConfig={chartConfig}
                        style={styles.chart}
                    />
                <Text style={styles.desc}>
                    {stockDesc}
                </Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "4.5%",
        alignItems: 'center',
        justifyContent: "center",
        overflow: "scroll",
    },
    ticker: {
        paddingTop: 10,
        fontSize: 38,
        fontWeight: 'bold',
        textAlign:"center"
    },
    price: {
        paddingTop: 10,
        fontSize: 30,
        position: 'absolute',
        left: "1.75%",
        top: "1.65%"
    },
    chart: {
        paddingVertical: 20,
    },
    desc: {
        padding: 20,
        fontSize: 16,
        lineHeight: '160%'
    },
    button: {
        padding: 20
    },
});
