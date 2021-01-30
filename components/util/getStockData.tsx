import { API_KEY } from '@env';
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
