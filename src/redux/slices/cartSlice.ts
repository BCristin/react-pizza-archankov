import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartSliceState, TCartItem } from '../../@types/types';
import { RootState } from '../store';
import { findItemForCart, findParam, reduceTotalCount, reduceTotalPrice } from './utilsForSlice';

const initialState: ICartSliceState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<TCartItem>) => {
			const findItem = findItemForCart(state, action);
			if (findItem) {
				if (findItem.count) findItem.count++;
			} else state.items.push({ ...action.payload, count: 1 });
			state.totalPrice = reduceTotalPrice(state);
			state.totalCount = reduceTotalCount(state);
		},
		minusItem: (state, action: PayloadAction<TCartItem>) => {
			const findItem = findItemForCart(state, action);
			if (findItem && findItem.count && findItem.count > 1) findItem.count--;
			state.totalPrice = reduceTotalPrice(state);
			state.totalCount = reduceTotalCount(state);
		},
		removeItem: (state, action: PayloadAction<TCartItem>) => {
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

export const cartSelector = (state: RootState) => state.cart;
export const cartSelectorByID = (id: string) => (state: RootState) =>
	state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
