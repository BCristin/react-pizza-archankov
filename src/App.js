import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// const SearchContext = createContext('');

function App() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className="wrapper">
			{/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
			<Header searchValue={searchValue} setSearchValue={setSearchValue} />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home searchValue={searchValue} />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			{/* </SearchContext.Provider> */}
		</div>
	);
}

export default App;
