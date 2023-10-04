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
