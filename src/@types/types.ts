// hz cum se face dar incerca asa

//! cartSlice.ts

export type TCartItem = {
	title: string;
	price: number;
	imageUrl: string;
	count: number;
	id: string;
	size: number;
	type: string;
};

export type TPartialItem = Pick<TCartItem, 'id' | 'size' | 'type'>;

export interface ICartSliceState {
	totalCount: number;
	totalPrice: number;
	items: TCartItem[];
}

//! filterSlice.ts
export type TSort = {
	name: string;
	sortProperty: 'rating' | 'title' | 'price';
	order: 'asc' | 'desc';
};

export interface IFilterSliceState {
	categoryId: string;
	currentPage: number;
	sortValue: TSort;

	searchValue: string;
	queryParameters: boolean;
}
//! search params
export type TSearchPizzaParams = {
	sortProperty: 'rating' | 'title' | 'price';
	order: 'asc' | 'desc';
	categoryId: string;
	currentPage: number;
	sortValue: TSort;
};

//! pizzaSlice.js
export type TPizza = {
	id: string;
	imageUrl: string;
	title: string;
	price: number;
	category: number;
	rating: number;
	size: number[];
	type: number[];
};
export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface IPizzaSliceState {
	pizzas: TPizza[];
	nrPizza: number;
	status: Status;
}
