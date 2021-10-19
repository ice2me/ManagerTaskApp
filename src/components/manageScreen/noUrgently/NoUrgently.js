import React from 'react';
import '../urgently/Urgently.css'
import TodoTask from "../todoTask/TodoTask";
import exit from '../../../images/arrowExit.svg'
import {useHistory} from "react-router-dom";

const NoUrgently = ({}) => {
	const history = useHistory()
	const goBackButton = () => {
		history.goBack()
	}
	return (
		<div className="urgently">
			<div className="urgently-header">
				<button className="urgently-exit" onClick={goBackButton}>
					<img
						src={exit}
						alt="eit"
					/>
				</button>
				<h1 className="urgently-name">No Urgently</h1>
			</div>
			<ul className="urgently-ul__state">
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
			</ul>
			<ul className="urgently-ul__finish">
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
				<TodoTask />
			</ul>
		</div>
	);
};

export default NoUrgently;