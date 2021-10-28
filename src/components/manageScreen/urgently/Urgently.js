import React, {useContext, useEffect, useState} from 'react';
import './Urgently.css'
import TodoTask from "../todoTask/TodoTask";
import exit from '../../../images/arrowExit.svg'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/auth.context";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../index";

const Urgently = () => {
	const [addNewTaskLine, setAddNewTaskLine] = useState([])
	const {user} = useContext(AuthContext)
	const history = useHistory()
	
	const {auth, firestore} = useContext(Context)
	
	const [tasksList, loading] = useCollectionData(
		firestore.collection('roomTask/1635406920867threeroom/test')
		// firestore.collection('roomTask').doc('1635406920867threeroom').collection('test')
	)

	
	const goBackButton = () => {
		history.goBack()
	}
	
	const addNewTaskLineHandler = (value, valueSelect) => {
		setAddNewTaskLine(addNewTaskLine.concat({
			id: Date.now(),
			task: value,
			statusProgress: valueSelect,
			user: user.displayName
		}))
		console.log(addNewTaskLine)
	}
	
	useEffect((value, valueSelect)=> {
		setAddNewTaskLine(addNewTaskLine.concat({
			id: Date.now(),
			task: value,
			statusProgress: valueSelect,
			user: user.displayName
		}))
	}, [tasksList])
	
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
					deleteTaskLine={deleteTaskLine}
					isAddVisible={addNewTaskLine.length - 1 === index}
					isDelete={addNewTaskLine.length > 1}
					tasksList={tasksList}
					loading={loading}
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