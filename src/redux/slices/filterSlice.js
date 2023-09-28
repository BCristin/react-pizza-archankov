import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	categoryId: 0,
	currentPage: 1,
	nrPizza: 0,
	sort: {
		name: 'популярности asc',
		sortProperty: 'rating',
		desc: 'asc',
	},
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setActiveFilter: (state, action) => {
			state.categoryId = action.payload;
		},
		setActiveCategori: (state, action) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setNrPages: (state, action) => {
			state.nrPizza = action.payload;
		},
	},
});

export const { setActiveFilter, setActiveCategori, setCurrentPage, setNrPages } =
	filterSlice.actions;

export default filterSlice.reducer;
