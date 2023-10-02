import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice';

const defaultCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export default function Categories() {
	const activeIndex = useSelector((state) => state.filter.categoryId);
	const dispatch = useDispatch();

	return (
		<div className="categories">
			<ul>
				{defaultCategories.map((categori, i) => (
					<li
						onClick={() => dispatch(setActiveCategory(i))}
						className={activeIndex === i ? 'active' : ''}
						key={categori}>
						{categori}
					</li>
				))}
			</ul>
		</div>
	);
}
