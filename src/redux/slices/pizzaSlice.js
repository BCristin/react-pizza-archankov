import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async ({ urlDB, currentPage }, thunkAPI) => {
		const { data } = await axios.get(urlDB);
		const nrPizza = data.length;

		urlDB.searchParams.append('page', currentPage);
		urlDB.searchParams.append('limit', 4);
		const { data: pizzas } = await axios.get(urlDB);

		if (nrPizza === 0) {
			return thunkAPI.rejectWithValue('pizza == 0');
			//baga cand eroare rezultatul in payload
		}
		return { nrPizza, pizzas };
	},
);
const initialState = {
	items: [],
	nrPizza: 0,
	status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizzas(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading';
			state.items = initialState.items;
			state.nrPizza = initialState.nrPizza;
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			// console.log(action, 'fulfilled');
			state.items = action.payload.pizzas;
			state.nrPizza = action.payload.nrPizza;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log(action, 'rejected');
			state.status = 'error';
			state.items = initialState.items;
			state.nrPizza = initialState.nrPizza;
		},
	},
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
