import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Container } from "@material-ui/core";
import { Text, View } from '../components/Themed';
import { LineChart } from 'react-native-chart-kit';
import { API_KEY } from 'react-native-dotenv';
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

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#000000",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Stock of the Day</Text>
        <Text style={styles.ticker}>{stock}</Text>
        <Text style={{textAlign: 'center', padding: 10,}}>(grpah shows one year trends)</Text>
      </View>

      <ScrollView>
        <LineChart 
          data={{
            labels: stockLabels,
            datasets: [
              {
                data: stockData
              }
            ]
          }}
          width={800}
          height={250}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text style={styles.desc}>
          {stockDesc}
        </Text>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#eeeee",
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    opacity: 1,
  },
  ticker: {
    paddingVertical: 10,
    fontSize: 20,
    textAlign: 'center',
    opacity: 1,
  },
  titleContainer: {
    opacity: 0.25,
  },
  chart: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  desc: {
    margin: 20
  },
});
