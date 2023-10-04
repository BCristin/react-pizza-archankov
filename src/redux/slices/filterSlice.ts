import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterSliceState, TSearchPizzaParams, TSort } from '../../@types/types';

export const initialState: IFilterSliceState = {
	categoryId: '0',
	currentPage: 1,
	searchValue: '',
	sortValue: { name: 'популярности asc', sortProperty: 'rating', order: 'asc' },
	queryParameters: false,
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setActiveCategory: (state, action: PayloadAction<string>) => {
			state.categoryId = action.payload;
			state.currentPage = initialState.currentPage;
		},
		setActiveSort: (state, action: PayloadAction<TSort>) => {
			state.sortValue = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setQueryParameters: (state, action: PayloadAction<boolean>) => {
			state.queryParameters = action.payload;
		},
		setFilters: (state, action: PayloadAction<TSearchPizzaParams>) => {
			state.categoryId = action.payload.categoryId;
			state.currentPage = +action.payload.currentPage;
			state.sortValue = action.payload.sortValue;
		},
		resetToInitialState: (state) => {
			state.categoryId = initialState.categoryId;
			state.currentPage = initialState.currentPage;
			state.sortValue = initialState.sortValue;
			state.queryParameters = initialState.queryParameters;
			state.searchValue = initialState.searchValue;
		},
	},
});

export const {
	setActiveCategory,
	setActiveSort,
	setCurrentPage,
	setSearchValue,
	setQueryParameters,
	setFilters,
	resetToInitialState,
} = filterSlice.actions;

export default filterSlice.reducer;
