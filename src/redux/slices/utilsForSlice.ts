import { PayloadAction } from '@reduxjs/toolkit';
import { ICartSliceState, TCartItem } from '../../@types/types';

export const findParam = (obj: TCartItem, action: PayloadAction<TCartItem>): boolean =>
	obj.id === action.payload.id &&
	obj.size === action.payload.size &&
	obj.type === action.payload.type;

export const findItemForCart = (state: ICartSliceState, action: PayloadAction<TCartItem>) =>
	state.items.find((obj) => findParam(obj, action));

export const reduceTotalPrice = (state: ICartSliceState) =>
	state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

export const reduceTotalCount = (state: ICartSliceState) =>
	state.items.reduce((sum, item) => sum + item.count, 0);
