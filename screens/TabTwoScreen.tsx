import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container } from '@material-ui/core';
import { Text, View } from '../components/Themed';

export default function Stonks() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock of the Day</Text>

      <Text style={styles.ticker}>Ticker Symbol (ie. APPL or smth) can go here</Text>
    
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <View>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
