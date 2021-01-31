import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';

export default function AboutUs() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.title}>Hong Gil Dong</Text>
      <Text style={{padding: 20}}>Robin H00d, but a knockoff Asian version</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Text></Text>

=======
      <Image style={styles.pic} source={require('../assets/images/stonks.png')} />

      <Text style={styles.title}>Who we are</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.desc}>Robinh00d, a company that democratizes the ability for all to be able to participate in the stock market.</Text>
      <br />
      <Text style={styles.desc}>As a fair way of being able to trade, you will only be able to choose a stock that we randomly select for you.</Text>
      <br />
      <Text style={styles.desc}>If it happens that the stock happens to be GME, we will only allow you to sell.</Text>
      <br />
      <Text style={styles.desc}>HAPPY TRADING!!!</Text>
>>>>>>> b47ccc92ea3fa184e588f18c98bcf194a098edb6
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
  desc: {
    fontSize: 25
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  pic: {
    width: 300,
    height: 300,
    marginBottom: 30,
  }
});
