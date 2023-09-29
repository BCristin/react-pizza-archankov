import axios from 'axios';
import { setNrPizzas } from '../redux/slices/filterSlice';

export function fetchPizzas(urlDB, setPizzas, setIsLoading, currentPage, dispatch) {
	axios.get(urlDB).then((res) => dispatch(setNrPizzas(res.data.length)));
	urlDB.searchParams.append('page', currentPage);
	urlDB.searchParams.append('limit', 4);

	axios.get(urlDB).then((res) => {
		setPizzas(res.data);
		setIsLoading(false);
	});
}
