import { createSlice } from '@reduxjs/toolkit';

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
			console.log(action.payload);

			const findItem = state.items.find((obj) => {
				return (
					obj.id === action.payload.id &&
					obj.size === action.payload.size &&
					obj.type === action.payload.type
				);
			});
			if (findItem) {
				findItem.count++;
			} else state.items.push({ ...action.payload, count: 1 });
			state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
			state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
			console.log(state.items);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter(
				(obj) =>
					!(
						obj.id === action.payload.id &&
						obj.size === action.payload.size &&
						obj.type === action.payload.type
					),
			);
			state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
			state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
		},
		clearItem: (state) => {
			state.items = initialState.items;
			state.totalPrice = initialState.totalPrice;
			state.totalCount = initialState.totalCount;
		},

		minusItem: (state, action) => {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.size === action.payload.size &&
					obj.type === action.payload.type,
			);
			if (findItem && findItem.count > 1) {
				findItem.count--;
			}
			state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
			state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
		},
	},
});

export const cartSelector = (state) => state.cart;
export const cartSelectorByID = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
