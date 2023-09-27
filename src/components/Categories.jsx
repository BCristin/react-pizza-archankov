export default function Categories({ activeIndex, setActiveIndex }) {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	// const [activeIndex, setActiveIndex] = useState(categories[0]);
	// const onClickCatergory = (index) => {setActiveIndex(index);};

	return (
		<div className="categories">
			<ul>
				{categories.map((categori, i) => (
					<li
						onClick={() => setActiveIndex(i)}
						className={activeIndex === i ? 'active' : ''}
						key={categori}>
						{categori}
					</li>
				))}
			</ul>
		</div>
	);
}
