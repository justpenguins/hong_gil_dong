import * as React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button, Container} from "@material-ui/core";
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
    const [stock, setStock] = useState('');
    const [stockLabels, setStockLabels] = useState<string[]>([]);
    const [stockData, setStockData] = useState<string[]>([]);
    const [stockName, setStockName] = useState('Loading stock...');
    const [stockDesc, setStockDesc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const stonk = await getRandomStock();
            const data = await getStockData(stonk);
            const info = await getStockInfo(stonk);
            const timeSeries = data['Time Series (5min)'];

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
            setStockDesc(info['Description'])
        }
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.ticker}>{stock}</Text>
            <div style={{display: 'block', position: 'absolute', right: "1.75%", top: "1.75%"}}>
                <Button style={{color: '#143C1D'}}>Buy</Button>
                <Button style={{marginLeft: 20, color: '#143c1d'}}>Sell</Button>
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
    data: {
    },
    ticker: {
        fontSize: 38,
        fontWeight: 'bold',
        textAlign:"center"
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
