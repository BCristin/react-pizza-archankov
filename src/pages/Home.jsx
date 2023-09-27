import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

export default function Home({ searchValue }) {
	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoriValue, setCategoriValue] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortValue, setSortValue] = useState({
		name: 'популярности asc',
		sortProperty: 'rating',
		desc: 'asc',
	});
	const [nrPizza, setNrPizza] = useState(0);
	const urlDB = new URL('https://6512c399b8c6ce52b3962a52.mockapi.io/pizzas');

	if (categoriValue !== 0) {
		urlDB.searchParams.append('category', categoriValue); // urlDB = `${urlDB}?category=${sortValue}`;
	}

	urlDB.searchParams.append('sortBy', sortValue.sortProperty);
	urlDB.searchParams.append('order', sortValue.desc);
	urlDB.searchParams.append('search', searchValue);

	useEffect(() => {
		fetch(urlDB)
			.then((res) => res.json())
			.then((pizzas) => {
				setNrPizza(pizzas.length);
			}); // eslint-disable-next-line
	}, [categoriValue, sortValue, searchValue]);

	useEffect(() => {
		urlDB.searchParams.append('page', currentPage);
		urlDB.searchParams.append('limit', 4);
		setIsLoading(true);

		fetch(urlDB)
			.then((res) => res.json())
			.then((pizzas) => {
				setPizzas(pizzas);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);

		// eslint-disable-next-line
	}, [categoriValue, sortValue, searchValue, currentPage]);
	// console.log(categoriValue, sortValue.name, sortValue.desc, isLoading, pizzas, urlDB);

	const sketetonRender = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	const pizzasListRender = pizzas
		// .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((pizza) => <PizzaBlock {...pizza} key={pizza.title} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories activeIndex={categoriValue} setActiveIndex={setCategoriValue} />
				<Sort activeCategori={sortValue} setActiveCategori={setSortValue} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? sketetonRender : pizzasListRender}</div>
			<Pagination handlePageClick={setCurrentPage} pageCount={Math.ceil(nrPizza / 4)} />
		</div>
	);
}
