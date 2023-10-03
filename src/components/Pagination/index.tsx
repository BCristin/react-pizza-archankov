import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

const Pagination = () => {
	const { currentPage } = useSelector((state: any) => state.filter);
	const { nrPizza } = useSelector((state: any) => state.pizza);

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
};
export default Pagination;