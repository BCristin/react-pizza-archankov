import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { idPizza } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizzas() {
			try {
				const { data } = await axios.get(
					`https://6512c399b8c6ce52b3962a52.mockapi.io/pizzas/${idPizza}`,
				);
				setPizza(data);
			} catch (error) {
				console.log(error);
				navigate('/');
			}
		}
		fetchPizzas(); // eslint-disable-next-line
	}, []);

	if (!pizza) {
		return <>'loading...'</>;
	}

	return (
		<div className="container">
			<img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
			<h4 className="pizza-block__title">{pizza.title}</h4>

			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {pizza.price} ₽</div>
			</div>
		</div>
	);
};

export default FullPizza;
