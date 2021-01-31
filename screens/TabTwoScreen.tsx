import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Container } from "@material-ui/core";
import { Text, View } from '../components/Themed';
import { LineChart } from 'react-native-chart-kit';
import { API_KEY } from 'react-native-dotenv';
import _ from 'lodash';

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

const screenWidth = Dimensions.get("window").width / 2;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default function Stonks() {
  const [stock, setStock] = useState('');
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const stonk = await getRandomStock();
      const data = await getStockData(stonk);
      setStock(stonk);
      setStockData(data);
    }
    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock of the Day</Text>

      <Text style={styles.ticker}>{stock}</Text>
    
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* todo: charts, Data information */}
      <View>
        <LineChart 
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text>
          This is where the majority of the information would go, graphs, predictions. Can also fit some troll mesurements here
          It can all probably go in one page tbh
        </Text>
        <Button>Press Me!</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  ticker: {
    paddingVertical: 30,
    fontSize: 20,
  },
  chart: {
    paddingVertical: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
