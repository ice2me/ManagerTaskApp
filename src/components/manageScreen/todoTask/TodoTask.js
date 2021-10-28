import React, {useEffect, useRef, useState} from 'react';
import './TodoTask.css'
import './Toggle.css'
import UserInfo from "../../userInfo/UserInfo";
import Loader from "../../loader/Loader";

const TodoTask = ({id, addNewTaskLineHandler, deleteTaskLine, isAddVisible, isDelete, tasksList, loading}) => {
	const [showInput, setShowInput] = useState(false)
	const [valueInput, setValueInput] = useState('')
	const [valueSelect, setValueSelect] = useState('waiting')
	const pRef = useRef(null)
	
	const pushInputValueHandler = () => {
		// setShowInput(false)
		if (valueInput !== '') {
			addNewTaskLineHandler(valueInput, valueSelect)
			setValueInput('')
			setShowInput(false)
		}
	}
	const showInputText = () => {
		(valueInput.length <= 0) && setShowInput(true)
	}
	// console.log('tasksList', tasksList)
	useEffect(() => {
		tasksList && setValueInput(tasksList.map(item => item.task))
	}, [tasksList])
	// console.log('inputValue', valueInput)
	
	
	//todo toggle loader-----------------------------------
	if (loading) {
		return <Loader />
	}
	return (
		<>
			{
				tasksList && tasksList.map(task =>
					<div
						className="todo-task"
						key={task.id}
					>
						<div className="todo-task__wrapper">
							{!showInput ? <p
									className="todo-task__title"
									ref={pRef}
									onClick={showInputText}
									autoFocus={true}
								>
									{valueInput.length < 1 ? task.task : valueInput}
								</p>
								:
								<div className="todo-task__container">
									<input
										className="todo-task__input"
										autoComplete="off"
										type="text"
										value={valueInput.length < 1 ? task.task : valueInput}
										autoFocus={true}
										name="task-title"
										placeholder="Enter task"
										onChange={(e) => {
											// onChangeHandler(id,  e.target.name, e.target.value)
											setValueInput(e.target.value)
										}}
									/>
								</div>
							}
							<div className="todo-task__progress">
								<select
									onChange={e => setValueSelect(e.target.value)}
									value={task && task.statusProgress}
								>
									<option value="waiting">
										Waiting
									</option>
									<option value="progress">
										Progress
									</option>
									<option value="finish">
										Finish
									</option>
								</select>
							</div>
							{
								isAddVisible && <button
									className="todo-task__delete"
									disabled={valueInput === ''}
									onClick={(e) => {
										pushInputValueHandler()
										
									}}
								>add
								</button>
							}
						</div>
						<div className="todo-task__block">
							<UserInfo />
						</div>
						{
							(isDelete || valueInput.length >= 1) && <button
								className="todo-task__delete"
								onClick={() => {deleteTaskLine(id)}}
							>
								del
							</button>
						}
					</div>
				)}
		</>
	)
};

export default TodoTask;