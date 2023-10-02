import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

export default function Pagination() {
	const { currentPage } = useSelector((state) => state.filter);
	const { nrPizza } = useSelector((state) => state.pizza);

	const nrPages = Math.ceil(nrPizza / 4);
	const dispatch = useDispatch();

	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=" >"
			onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
			pageRangeDisplayed={4}
			marginPagesDisplayed={2}
			pageCount={nrPages > 1 ? nrPages : 0}
			previousLabel="< "
			forcePage={currentPage - 1}
			renderOnZeroPageCount={null}
		/>
	);
}
