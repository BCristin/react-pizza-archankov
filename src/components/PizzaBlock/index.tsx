import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartSelectorByID } from '../../redux/cart/selector';
import { addItem } from '../../redux/cart/slice';
import { TCartItem } from '../../redux/cart/types';
import { Button } from '../index';

export const typeNames = ['тонкое', 'традиционное'];

type IPizzaBlockProps = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};
export const PizzaBlock: React.FC<IPizzaBlockProps> = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types,
}) => {
	const dispatch = useDispatch();
	const cartItem = useSelector(cartSelectorByID(id));

	const [activeSize, setActiveSize] = useState(0);
	const [activeType, setActiveType] = useState(0);
	const addedCount = cartItem ? cartItem.count : 0;
	const onClickAdd = () => {
		const item: TCartItem = {
			id,
			title,
			price,
			imageUrl,
			size: sizes[activeSize],
			type: typeNames[activeType],
			count: 1,
		};
		dispatch(addItem(item));
	};

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link to={`/pizza/${id}`}>
					<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
					<h4 className="pizza-block__title">{title}</h4>
				</Link>

				<div className="pizza-block__selector">
					<ul>
						{types.map((typeIndex) => (
							<li
								key={typeNames[typeIndex] + title}
								onClick={() => setActiveType(typeIndex)}
								className={activeType === typeIndex || types.length <= 1 ? 'active' : ''}>
								{typeNames[typeIndex]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, i) => (
							<li
								onClick={() => setActiveSize(i)}
								className={activeSize === i ? 'active' : ''}
								key={i + title}>
								{size} см.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<Button onClickAdd={onClickAdd} count={addedCount} />
				</div>
			</div>
		</div>
	);
};
