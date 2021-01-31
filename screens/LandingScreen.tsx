import { StackScreenProps } from '@react-navigation/stack';
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { RootStackParamList } from '../types';
import { Button } from '@material-ui/core';

const onPress = () => {
  
}

export default function LandingScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <TextField required id="uname" label="Username" variant="filled" style={{width: "30%"}} />
      <TextField required id="password" label="Password" variant="filled" style={{width: "30%"}} />

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30,
  },
  button: {
    top: "10%",
    padding: 15,
    borderRadius: 50,
    width: "25%",
    backgroundColor: "skyblue",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  nameInput: {
    width: "30%",
    padding: 10,
  },
});
