import { createSlice } from '@reduxjs/toolkit';
import {
	findItemForCart,
	findParam,
	reduceTotalCount,
	reduceTotalPrice,
} from './utilsForSlice';

const initialState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const findItem = findItemForCart(state, action);
			if (findItem) findItem.count++;
			else state.items.push({ ...action.payload, count: 1 });
			state.totalPrice = reduceTotalPrice(state);
			state.totalCount = reduceTotalCount(state);
		},
		minusItem: (state, action) => {
			const findItem = findItemForCart(state, action);
			if (findItem && findItem.count > 1) findItem.count--;
			state.totalPrice = reduceTotalPrice(state);
			state.totalCount = reduceTotalCount(state);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter((obj) => !findParam(obj, action));
			state.totalPrice = reduceTotalPrice(state);
			state.totalCount = reduceTotalCount(state);
		},
		clearItem: (state) => {
			state.items = initialState.items;
			state.totalPrice = initialState.totalPrice;
			state.totalCount = initialState.totalCount;
		},
	},
});

export const cartSelector = (state) => state.cart;
export const cartSelectorByID = (id) => (state) =>
	state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
