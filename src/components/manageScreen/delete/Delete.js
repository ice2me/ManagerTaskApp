import React from 'react';
import exit from "../../../images/arrowExit.svg";
import TodoTaskForDelete from "../todoTask/TodoTaskForDelete";
import {useHistory} from "react-router-dom";

const Delete = () => {
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
				<TodoTaskForDelete />
				<TodoTaskForDelete />
				<TodoTaskForDelete />
				<TodoTaskForDelete />
				<TodoTaskForDelete />
				<TodoTaskForDelete />
				<TodoTaskForDelete />
			</ul>
		</div>
	);
};

export default Delete;