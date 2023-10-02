import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	categoryId: 0,
	currentPage: 1,
	// nrPizza: 0,
	sortValue: {
		name: 'популярности asc',
		sortProperty: 'rating',
		order: 'asc',
	},
	queryParameters: false,
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setActiveCategory: (state, action) => {
			state.categoryId = action.payload;
			state.currentPage = initialState.currentPage;
		},
		setActiveSort: (state, action) => {
			state.sortValue = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		// setNrPizzas: (state, action) => {
		// 	state.nrPizza = action.payload;
		// },
		setQueryParameters: (state, action) => {
			state.queryParameters = action.payload;
		},
		setFilters: (state, action) => {
			state.categoryId = +action.payload.categoryId;
			state.currentPage = +action.payload.currentPage;
			state.sortValue = action.payload.sort;
		},
	},
});

export const {
	setActiveCategory,
	setActiveSort,
	setCurrentPage,
	// setNrPizzas,
	setQueryParameters,
	setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
