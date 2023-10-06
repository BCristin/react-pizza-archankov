import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import { Suspense, lazy } from 'react';
import MainLayout from './layouts/MainLayout';
// import Cart from './pages/Cart';
import { Skeleton } from './components';
// import FullPizza from './pages/FullPizza';
// import Home from './pages/Home';
// import NotFound from './pages/NotFound';

const Cart = lazy(() => import(/*webpackChunkName:"Cart"*/ './pages/Cart'));
const NotFound = lazy(() => import(/*webpackChunkName:"NotFound"*/ './pages/NotFound'));
const FullPizza = lazy(() => import(/*webpackChunkName:"FullPizza"*/ './pages/FullPizza'));
const Home = lazy(() => import(/*webpackChunkName:"Home"*/ './pages/Home'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route
					path="/"
					element={
						<Suspense fallback={<Skeleton />}>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path="/cart"
					element={
						<Suspense fallback={<Skeleton />}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path="/pizza/:idPizza"
					element={
						<Suspense fallback={<Skeleton />}>
							<FullPizza />
						</Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<Suspense fallback={<Skeleton />}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
