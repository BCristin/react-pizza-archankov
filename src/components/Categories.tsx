import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const defaultCategories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];
const Categories: FC = memo(() => {
	const activeIndex = useSelector((state: RootState) => state.filter.categoryId);
	const dispatch = useDispatch();

	console.log('Categories', activeIndex);

	return (
		<div className="categories">
			<ul>
				{defaultCategories.map((categori, i) => (
					<li
						onClick={() => dispatch(setActiveCategory(`${i}`))}
						className={activeIndex === `${i}` ? 'active' : ''}
						key={categori}>
						{categori}
					</li>
				))}
			</ul>
		</div>
	);
});

export default Categories;
