export type TCartItem = {
	title: string;
	price: number;
	imageUrl: string;
	count: number;
	id: string;
	size: number;
	type: string;
};

export interface ICartSliceState {
	totalCount: number;
	totalPrice: number;
	items: TCartItem[];
}
