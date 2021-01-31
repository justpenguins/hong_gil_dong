import * as React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button, Modal, TextField} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Text, View} from '../components/Themed';
import {LineChart} from 'react-native-chart-kit';
import {API_KEY} from 'react-native-dotenv';
import _ from 'lodash';
import map from 'lodash/map';
import { gme, gmeDesc } from './util/lol';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: "center",
    },
  }),
);

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
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [amt, setAmt] = useState(0.0);
    const [price, setPrice] = useState(0.0);
    const [sell, setSell] = useState(false);
    const [sellAmt, setSellAmt] = useState(0.0);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleOpenSell = () => {
      setSell(true);
    }

    const handleCloseSell = () => {
      setSell(false);
    }

    const changeIt = (e: any) => {
      let temp = e.target.value;
      if (e.target.value === '') {
        temp = '0.0';
      }
      setAmt(parseFloat(temp));
    }

    const changeSell = (e: any) => {
      let temp = e.target.value;
      if (e.target.value === '') {
        temp = '0.0';
      }
      setSellAmt(parseFloat(temp));
    }

    useEffect(() => {
        const fetchData = async () => {          
            let stonk = await getRandomStock();
            let data = await getStockData(stonk);
            let info = await getStockInfo(stonk);
            let attempts = 0;

            let timeSeries = data['Time Series (5min)'];

            while (timeSeries === undefined && info['Description'] === undefined && info['Description'] === '' && attempts < 5) {
              stonk = await getRandomStock();
              data = await getStockData(stonk);
              info = await getStockInfo(stonk);
  
              timeSeries = data['Time Series (5min)'];
              attempts++;
            }

            console.log(timeSeries)
            console.log(info['Description'])
            if (timeSeries === undefined || info['Description'] === undefined || info['Description'] === '') {
              stonk = 'GME';
              data = gme();
              info = gmeDesc();
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
            setPrice(parseFloat(amountData[amountData.length - 1]));
        }
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Text style={styles.price}>{stockPrice}</Text>
              <Text style={styles.ticker}>{stock}</Text>
              <div style={{display: 'block', position: 'absolute', right: "1.75%", top: "1.75%"}}>
                <Button onClick={handleOpen} style={{color: '#143C1D'}}>Buy</Button>
                <Button onClick={handleOpenSell} style={{marginLeft: 20, color: '#143c1d'}}>Sell</Button>
              </div>
            </div>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                  <Text style={{fontSize: 25, fontWeight: 'bold'}}>Ok how many u wanna buy tho</Text>
                  <br/>
                  <br/>
                  <TextField required id="standard-required" label="Required" defaultValue={amt} onChange={changeIt} />
                  <br/>
                  <br/>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>{`It will cost ${Math.round(amt * price)}. u good with that?`}</Text>
                  <Button>Purchase Amount</Button>
                </div>
              </Modal>

              <Modal
              open={sell}
              onClose={handleCloseSell}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                  <Text style={{fontSize: 25, fontWeight: 'bold'}}>Ok how many u wanna sell tho</Text>
                  <br/>
                  <br/>
                  <TextField required id="standard-required" label="Required" defaultValue={sellAmt} onChange={changeSell} />
                  <br/>
                  <br/>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>{`U will get bac ${Math.round(sellAmt * price)}. u good with that?`}</Text>
                  <Button>Sell Amount</Button>
                </div>
              </Modal>
            
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
