import { StackScreenProps } from '@react-navigation/stack';
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import stockData from "../stockData.json";
import { DataTable } from 'react-native-paper';

import { RootStackParamList } from '../types';


export default function Portfolio({ navigation
 }: StackScreenProps<RootStackParamList, 'NotFound'>) {
  return (
    <DataTable style={styles.table}>
    <DataTable.Header>
      <DataTable.Title>Company Name</DataTable.Title>
      <DataTable.Title>Ticker</DataTable.Title>
      <DataTable.Title sortDirection='descending' numeric>Date Bought</DataTable.Title>
      <DataTable.Title numeric>Amount Bought</DataTable.Title>
      <DataTable.Title numeric>Price at Purchase</DataTable.Title>
      <DataTable.Title numeric>Total Price of Stonk</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>Telsa</DataTable.Cell>
      <DataTable.Cell>TSLA</DataTable.Cell>
      <DataTable.Cell numeric>159</DataTable.Cell>
      <DataTable.Cell numeric>6.0</DataTable.Cell>
      <DataTable.Cell numeric>110</DataTable.Cell>
      <DataTable.Cell numeric>8.0</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>GameStop</DataTable.Cell>
      <DataTable.Cell>GME</DataTable.Cell>
      <DataTable.Cell numeric>110</DataTable.Cell>
      <DataTable.Cell numeric>8.0</DataTable.Cell>
      <DataTable.Cell numeric>110</DataTable.Cell>
      <DataTable.Cell numeric>8.0</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Apple</DataTable.Cell>
      <DataTable.Cell>APPL</DataTable.Cell>
      <DataTable.Cell numeric>237</DataTable.Cell>
      <DataTable.Cell numeric>8.0</DataTable.Cell>
      <DataTable.Cell numeric>237</DataTable.Cell>
      <DataTable.Cell numeric>8.0</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={page => {
        console.log(page);
      }}
      label="1 of 3"
    />
  </DataTable>
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
  table: {
    width: "80%",
    
  }
});
