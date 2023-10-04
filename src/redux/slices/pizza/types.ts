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
