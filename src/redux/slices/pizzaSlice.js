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
	pizzas: [],
	nrPizza: 0,
	status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizzas(state, action) {
			state.pizzas = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading';
				state.pizzas = initialState.pizzas;
				state.nrPizza = initialState.nrPizza;
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				// console.log(action, 'fulfilled');
				state.pizzas = action.payload.pizzas;
				state.nrPizza = action.payload.nrPizza;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state, action) => {
				console.log(action, 'rejected');
				state.status = 'error';
				state.pizzas = initialState.pizzas;
				state.nrPizza = initialState.nrPizza;
			});
	},
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
