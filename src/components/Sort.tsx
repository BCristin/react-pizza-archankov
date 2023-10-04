import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TSort } from '../@types/types';
import { setActiveSort } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

export const sortCatergories: TSort[] = [
	{ name: 'популярности asc', sortProperty: 'rating', order: 'asc' },
	{ name: 'популярности desc', sortProperty: 'rating', order: 'desc' },
	{ name: 'цене asc', sortProperty: 'price', order: 'asc' },
	{ name: 'цене desc', sortProperty: 'price', order: 'desc' },
	{ name: 'алфавиту asc', sortProperty: 'title', order: 'asc' },
	{ name: 'алфавиту desc', sortProperty: 'title', order: 'desc' },
];

export default function Sort() {
	const activeSort = useSelector((state: RootState) => state.filter.sortValue);
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);

	function onClickListItem(categori: TSort) {
		dispatch(setActiveSort(categori));
		setOpen(false);
	}

	useEffect(() => {
		const handeleClickOutside = (e: MouseEvent) => {
			const _e = e as MouseEvent & { composedPath(): Node[] };
			if (sortRef.current && !_e.composedPath().includes(sortRef.current)) {
				setOpen(false);
			}
		};
		document.body.addEventListener('click', handeleClickOutside);

		return () => document.body.removeEventListener('click', handeleClickOutside);
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#000000"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{activeSort.name}</span>
			</div>
			{open && (
				<div className="sort__popup">
					<ul>
						{sortCatergories.map((categori) => (
							<li
								key={categori.name}
								onClick={() => onClickListItem(categori)}
								className={activeSort.name === categori.name ? 'active' : ''}>
								{categori.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
