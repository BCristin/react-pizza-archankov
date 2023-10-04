import { PayloadAction } from '@reduxjs/toolkit';
import { ICartSliceState, TCartItem } from '../redux/slices/cart/types';

export const findParam = (obj: TCartItem, action: PayloadAction<TCartItem>): boolean =>
	obj.id === action.payload.id &&
	obj.size === action.payload.size &&
	obj.type === action.payload.type;

export const findItemForCart = (state: ICartSliceState, action: PayloadAction<TCartItem>) =>
	state.items.find((obj) => findParam(obj, action));

export const reduceTotalPrice = (items: TCartItem[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

export const reduceTotalCount = (items: TCartItem[]) =>
	items.reduce((sum, item) => sum + item.count, 0);
