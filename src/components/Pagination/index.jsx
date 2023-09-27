import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

export default function Pagination({ handlePageClick, pageCount }) {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=" >"
			onPageChange={(e) => handlePageClick(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={pageCount > 1 ? pageCount : 0}
			previousLabel="< "
			renderOnZeroPageCount={null}
		/>
	);
}
