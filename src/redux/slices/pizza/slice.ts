import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { IPizzaSliceState, Status, TPizza } from './types';

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
