import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button, Dimensions, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {LineChart} from 'react-native-chart-kit';
import {API_KEY} from 'react-native-dotenv';
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


const chartConfig = {
    backgroundGradientFrom: "rgba(20, 60, 30)",
    backgroundGradientFromOpacity: 0.8,
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
              <Text style={styles.price}>> 9000</Text>
              <Text style={styles.ticker}>GME</Text>
              <div style={{display: 'block', position: 'absolute', right: "1.75%", top: "1.75%"}}>
                <Button onPress={() => {alert('You thought.... nice try') }} style={{color: '#143C1D'}}>Buy</Button>

                <Button style={{marginLeft: 20, color: '#143c1d'}}>Sell</Button>
              </div>
            </div>
            
            <View style={styles.troll}>
                <Button onPress={() => {alert('Such actions are under investigation by the SEC. Standby.') }}>
                    <Text>Click here to manipulate the stock market</Text>
                </Button>
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
    troll: {

    },
});
