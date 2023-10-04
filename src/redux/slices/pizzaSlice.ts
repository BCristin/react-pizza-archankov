import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaSliceState, Status, TPizza } from '../../@types/types';

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

const initialState: IPizzaSliceState = {
	pizzas: [],
	nrPizza: 0,
	status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizzas(state, action: PayloadAction<TPizza[]>) {
			state.pizzas = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING;
				state.pizzas = initialState.pizzas;
				state.nrPizza = initialState.nrPizza;
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				// console.log(action, 'fulfilled');
				state.pizzas = action.payload.pizzas;
				state.nrPizza = action.payload.nrPizza;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzas.rejected, (state, action) => {
				console.log(action, 'rejected');
				state.status = Status.ERROR;
				state.pizzas = initialState.pizzas;
				state.nrPizza = initialState.nrPizza;
			});
	},
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
