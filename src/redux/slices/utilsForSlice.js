export const findParam = (obj, action) =>
	obj.id === action.payload.id &&
	obj.size === action.payload.size &&
	obj.type === action.payload.type;

export const findItemForCart = (state, action) =>
	state.items.find((obj) => findParam(obj, action));

export const reduceTotalPrice = (state) =>
	state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

export const reduceTotalCount = (state) =>
	state.items.reduce((sum, item) => sum + item.count, 0);
