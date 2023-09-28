import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
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
		setActiveIndex: (state, action) => {
			state.categoryId = action.payload;
		},
		setActiveCategori: (state, action) => {
			state.sort = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setActiveIndex, setActiveCategori } = filterSlice.actions;

export default filterSlice.reducer;
