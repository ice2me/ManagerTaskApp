import React from 'react';
import svg from './LoaderSVG.svg'

const Loader = () => {
	return (
		<div className="loader">
			<img
				src={svg}
				alt="loader"
			/>
		</div>
	);
};

export default Loader;