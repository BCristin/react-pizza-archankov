import { useDispatch, useSelector } from 'react-redux';
import { setActiveIndex } from '../redux/slices/filterSlice';

export default function Categories() {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	const activeIndex = useSelector((state) => state.filter.categoryId);
	const dispatch = useDispatch();

	// const [activeIndex, setActiveIndex] = useState(categories[0]);
	// const onClickCatergory = (index) => {setActiveIndex(index);};

	return (
		<div className="categories">
			<ul>
				{categories.map((categori, i) => (
					<li
						onClick={() => dispatch(setActiveIndex(i))}
						className={activeIndex === i ? 'active' : ''}
						key={categori}>
						{categori}
					</li>
				))}
			</ul>
		</div>
	);
}
