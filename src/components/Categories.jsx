import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../redux/slices/filterSlice';

export default function Categories() {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	const activeIndex = useSelector((state) => state.filter.categoryId);
	const dispatch = useDispatch();

	return (
		<div className="categories">
			<ul>
				{categories.map((categori, i) => (
					<li
						onClick={() => dispatch(setActiveFilter(i))}
						className={activeIndex === i ? 'active' : ''}
						key={categori}>
						{categori}
					</li>
				))}
			</ul>
		</div>
	);
}
