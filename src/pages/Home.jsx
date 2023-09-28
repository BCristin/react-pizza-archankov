import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

export default function Home() {
	const { categoryId: filterID, sort: sortValue } = useSelector((state) => state.filter);

	const { searchValue } = useContext(SearchContext);

	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const [nrPizza, setNrPizza] = useState(0);
	const urlDB = new URL('https://6512c399b8c6ce52b3962a52.mockapi.io/pizzas');

	if (filterID !== 0) {
		urlDB.searchParams.append('category', filterID);
		// urlDB = `${urlDB}?category=${sortValue}`;
	}

	urlDB.searchParams.append('sortBy', sortValue.sortProperty);
	urlDB.searchParams.append('order', sortValue.desc);
	urlDB.searchParams.append('search', searchValue);

	useEffect(() => {
		// fetch(urlDB)
		// 	.then((res) => res.json())
		// 	.then((pizzas) => {
		// 		setNrPizza(pizzas.length);
		// 	});
		axios.get(urlDB).then((res) => {
			setNrPizza(res.data.length);
		});

		// eslint-disable-next-line
	}, [filterID, sortValue, searchValue]);

	useEffect(() => {
		urlDB.searchParams.append('page', currentPage);
		urlDB.searchParams.append('limit', 4);
		setIsLoading(true);

		// fetch(urlDB)
		// 	.then((res) => res.json())
		// 	.then((pizzas) => {
		// 		setPizzas(pizzas);
		// 		setIsLoading(false);
		// 	});

		axios.get(urlDB).then((res) => {
			setPizzas(res.data);
			setIsLoading(false);
		});
		window.scrollTo(0, 0);

		// eslint-disable-next-line
	}, [filterID, sortValue, searchValue, currentPage]);

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
			<Pagination handlePageClick={setCurrentPage} pageCount={Math.ceil(nrPizza / 4)} />
		</div>
	);
}
