import React, {useContext, useEffect, useState} from 'react';
import './Urgently.css'
import TodoTask from "../todoTask/TodoTask";
import exit from '../../../images/arrowExit.svg'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/auth.context";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../index";

const Urgently = () => {
	// const [addNewTaskLine, setAddNewTaskLine] = useState([])
	const [addNewTaskLine, setAddNewTaskLine] = useState([{
		id: 0,
		task: '',
		statusProgress: 'wait',
		user: null
	}])
	const {user} = useContext(AuthContext)
	const history = useHistory()
	
	const {auth, firestore} = useContext(Context)
	const [tasks, loading] = useCollectionData(
		firestore.collection('roomTask')
	)
	
	console.log(tasks)
	
	
	const goBackButton = () => {
		history.goBack()
	}
	// const addNewTaskLineChangeHandler = (id, name, value) => {
	// 	const listIngredients = addNewTaskLine.map(item => {
	// 		if (item.id === id) {
	// 			const updated = item
	// 			updated[name] = value
	// 			return updated
	// 		}
	// 		return item
	// 	})
	// 	setAddNewTaskLine(listIngredients)
	// }
	
	
	const addNewTaskLineHandler = (value, valueSelect) => {
		setAddNewTaskLine(addNewTaskLine.concat({
			id: Date.now(),
			task: value,
			statusProgress: valueSelect,
			user: user.displayName
		}))
	}
	// console.log('addNewTaskLine', addNewTaskLine)
	
	// useEffect(() => {
	// 	setAddNewTaskLine(addNewTaskLine.concat([{
	// 		id: Date.now(),
	// 		task: title,
	// 		statusProgress: 'wait',
	// 		user: user
	// 	}]))
	// }, [setAddNewTaskLine])
	const deleteTaskLine = (id) => {
		setAddNewTaskLine(addNewTaskLine.filter(item => item.id !== id))
	}
	return (
		<div className="urgently">
			<div className="urgently-header">
				<button
					className="urgently-exit"
					onClick={goBackButton}
				>
					<img
						src={exit}
						alt="eit"
					/>
				</button>
				<h1 className="urgently-name">Urgently</h1>
			</div>
			<ul className="urgently-ul__state">
				{
					addNewTaskLine.map((newLine, index) => <TodoTask
					key={newLine.id || index}
					id={newLine.id || index}
					addNewTaskLine={addNewTaskLine}
					addNewTaskLineHandler={addNewTaskLineHandler}
					// onChangeHandler={addNewTaskLineChangeHandler}
					deleteTaskLine={deleteTaskLine}
					// addNewTaskLineChangeHandler={addNewTaskLineChangeHandler}
					isAddVisible={addNewTaskLine.length - 1 === index}
					isDelete={addNewTaskLine.length > 1}
				/>)
				}
			</ul>
			<ul className="urgently-ul__finish">
				<TodoTask />
			
			</ul>
		</div>
	);
};

export default Urgently;