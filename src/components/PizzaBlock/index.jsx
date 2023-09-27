import { useState } from 'react';
import Button from '../Button';

export default function PizzaBlock({ title, price, imageUrl, sizes, types }) {
	const typeNames = ['тонкое', 'традиционное'];
	const [activeSize, setActiveSize] = useState(0);
	const [activeType, setActiveType] = useState(0);

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
				<h4 className="pizza-block__title">{title}</h4>
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
					<Button />
				</div>
			</div>
		</div>
	);
}
