import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getCartFromLS } from '../../utils/getCartFromLS';
import {
	findItemForCart,
	findParam,
	reduceTotalCount,
	reduceTotalPrice,
} from '../../utils/utilsForSlice';
import { ICartSliceState, TCartItem } from './types';

const cartData = getCartFromLS();
const initialState: ICartSliceState = {
	totalPrice: cartData.totalPrice,
	totalCount: cartData.totalCount,
	items: cartData.items,
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
			state.totalPrice = reduceTotalPrice(state.items);
			state.totalCount = reduceTotalCount(state.items);
		},
		minusItem: (state, action: PayloadAction<TCartItem>) => {
			const findItem = findItemForCart(state, action);
			if (findItem && findItem.count && findItem.count > 1) findItem.count--;
			state.totalPrice = reduceTotalPrice(state.items);
			state.totalCount = reduceTotalCount(state.items);
		},
		removeItem: (state, action: PayloadAction<TCartItem>) => {
			state.items = state.items.filter((obj) => !findParam(obj, action));
			state.totalPrice = reduceTotalPrice(state.items);
			state.totalCount = reduceTotalCount(state.items);
		},
		clearItem: (state) => {
			state.items = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
});

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
