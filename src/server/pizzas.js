import axios from 'axios';
import { setNrPizzas } from '../redux/slices/filterSlice';

export async function fetchPizzas(urlDB, setPizzas, setIsLoading, currentPage, dispatch) {
	try {
		const res = await axios.get(urlDB);
		dispatch(setNrPizzas(res.data.length));
	} catch (error) {
		console.error(error);
	}

	urlDB.searchParams.append('page', currentPage);
	urlDB.searchParams.append('limit', 4);
	axios
		.get(urlDB)
		.then((res) => {
			setPizzas(res.data);
			setIsLoading(false);
		})
		.catch((error) => {
			setIsLoading(false);
			console.error(error);
		});
}
