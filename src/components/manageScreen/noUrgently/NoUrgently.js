import React from 'react';
import '../urgently/Urgently.css'
import exit from "../../../images/arrowExit.svg";

const NoUrgently = ({closeTaskComponent}) => {
	return (
		<div className="urgently">
			<button
				className="urgently-exit"
				onClick={closeTaskComponent}
			>
				<img
					src={exit}
					alt="eit"
				/>
			</button>
			<h1 className="urgently-name">NoUrgently</h1>
		</div>
	);
};

export default NoUrgently;