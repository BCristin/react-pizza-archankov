import ContentLoader from 'react-content-loader';

const Skeleton = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={464}
		viewBox="0 0 280 464"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb">
		<circle cx="130" cy="130" r="130" />
		<rect x="0" y="269" rx="10" ry="10" width="280" height="23" />
		<rect x="0" y="314" rx="10" ry="10" width="280" height="87" />
		<rect x="0" y="425" rx="10" ry="10" width="95" height="30" />
		<rect x="125" y="415" rx="24" ry="24" width="152" height="44" />
	</ContentLoader>
);

export default Skeleton;
