import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortCatergories } from '../components/Sort';
import { setFilters, setQueryParameters } from '../redux/slices/filter/slice';
import { TSearchPizzaParams } from '../redux/slices/filter/types';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const { categoryId, sortValue, currentPage, queryParameters, searchValue } = useSelector(
		(state: RootState) => state.filter,
	);
	const { pizzas, status } = useSelector((state: RootState) => state.pizza);
	const dispatch = useDispatch();
	const dispatchApp = useAppDispatch();

	const navigate = useNavigate();
	const isSearch = useRef(false);
	// const queryParameters = useRef(false);

	const urlDB = new URL('https://6512c399b8c6ce52b3962a52.mockapi.io/pizzas');
	if (categoryId !== '0') urlDB.searchParams.append('category', categoryId.toString());

	urlDB.searchParams.append('sortBy', sortValue.sortProperty);
	urlDB.searchParams.append('order', sortValue.order);
	urlDB.searchParams.append('search', searchValue);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as TSearchPizzaParams;
			const sort = sortCatergories.find(
				(category) =>
					category.sortProperty === params.sortProperty && category.order === params.order,
			);
			if (sort) {
				dispatch(setFilters({ ...params, sortValue: sort }));
			}

			isSearch.current = true; // spun ca exista search
		} // eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!isSearch.current) dispatchApp(fetchPizzas({ urlDB, currentPage }));

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
		.map((pizza: any) => <PizzaBlock {...pizza} key={pizza.title} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>Произошла ошибка 😕</h2>
					<p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
				</div>
			) : (
				<div className="content__items">
					{status === 'loading' ? sketetonRender : pizzasListRender}
				</div>
			)}
			<Pagination />
		</div>
	);
};
export default Home;
