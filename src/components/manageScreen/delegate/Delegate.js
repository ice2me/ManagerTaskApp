import React from 'react';
import '../urgently/Urgently.css'
import exit from "../../../images/arrowExit.svg";

const Delegate = ({closeTaskComponent}) => {
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
			<h1 className="urgently-name">Delegate</h1>
		</div>
	);
};

export default Delegate;