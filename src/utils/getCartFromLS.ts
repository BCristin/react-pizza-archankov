import { TCartItem } from '../redux/slices/cart/types';
import { reduceTotalCount, reduceTotalPrice } from './utilsForSlice';

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart');
	const items = data ? JSON.parse(data) : [];

	const totalPrice = reduceTotalPrice(items);
	const totalCount = reduceTotalCount(items);
	return { items: items as TCartItem[], totalPrice, totalCount };
};
