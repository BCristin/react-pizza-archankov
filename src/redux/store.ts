import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './cart/slice';
import filterSlice from './slices/filter/slice';
import pizzaSlice from './slices/pizza/slice';

export const store = configureStore({
	reducer: { filter: filterSlice, cart: cartSlice, pizza: pizzaSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
