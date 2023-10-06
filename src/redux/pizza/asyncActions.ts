import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TPizza } from './types';

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async ({ urlDB, currentPage }: { urlDB: URL; currentPage: number }, thunkAPI) => {
		const { data } = await axios.get<TPizza[]>(urlDB.toString());
		const nrPizza = data.length;

		urlDB.searchParams.append('page', currentPage.toString());
		urlDB.searchParams.append('limit', '4');
		const { data: pizzas } = await axios.get<TPizza[]>(urlDB.toString());

		if (nrPizza === 0) {
			return thunkAPI.rejectWithValue('pizza == 0');
			//baga cand eroare rezultatul in payload
		}
		return { nrPizza, pizzas };
	},
);
