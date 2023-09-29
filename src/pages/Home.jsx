import qs from 'qs';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortCatergories } from '../components/Sort';
import { fetchPizzas } from '../components/server/pizzas';
import { setFilters, setQueryParameters } from '../redux/slices/filterSlice';
export default function Home() {
	const { categoryId, sortValue, currentPage, queryParameters } = useSelector(
		(state) => state.filter,
	);
	const dispatch = useDispatch();

	const { searchValue } = useContext(SearchContext);
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const isSearch = useRef(false);
	// const queryParameters = useRef(false);
	const urlDB = new URL('https://6512c399b8c6ce52b3962a52.mockapi.io/pizzas');

	if (categoryId !== 0) {
		urlDB.searchParams.append('category', categoryId);
		// urlDB = `${urlDB}?category=${sortValue}`;
	}
	urlDB.searchParams.append('sortBy', sortValue.sortProperty);
	urlDB.searchParams.append('order', sortValue.order);
	urlDB.searchParams.append('search', searchValue);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortCatergories.find(
				(obj) => obj.sortProperty === params.sortProperty && obj.order === params.order,
			);
			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true; // spun ca exista search
		} // eslint-disable-next-line
	}, []);

	useEffect(() => {
		setIsLoading(true);
		if (!isSearch.current) {
			fetchPizzas(urlDB, setPizzas, setIsLoading, currentPage, dispatch);
		}
		isSearch.current = false;
		window.scrollTo(0, 0); // eslint-disable-next-line
	}, [categoryId, sortValue, searchValue, currentPage]);

	useEffect(() => {
		if (queryParameters) {
			const queryString = qs.stringify({
				sortProperty: sortValue.sortProperty,
				order: sortValue.order,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		dispatch(setQueryParameters(true));

		// eslint-disable-next-line
	}, [categoryId, sortValue, currentPage]);

	const sketetonRender = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	const pizzasListRender = pizzas
		// .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((pizza) => <PizzaBlock {...pizza} key={pizza.title} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? sketetonRender : pizzasListRender}</div>
			<Pagination />
		</div>
	);
}
