import * as React from "react";
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Container } from "@material-ui/core";
import { Text, View } from '../components/Themed';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock of the Day</Text>

      <Text style={styles.ticker}>Ticker Symbol (ie. APPL or smth) can go here</Text>
    
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* todo: charts, Data information */}
      <View>
        <Text>
          This is where the majority of the information would go, graphs, predictions. Can also fit some troll mesurements here
          It can all probably go in one page tbh
        </Text>

        <LineChart 
          data={}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />

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
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
