import React, {useContext, useState} from 'react';
import {Context} from "../../../../../../index";
import Push from '../../../../../../images/checkedIcon.svg'
import Closed from '../../../../../../images/closeIcon.svg'


const EditTaskForm = ({editCloseTaskHandler, urlForSaveTodoTask, taskIdEdit, editTodoActive}) => {
	const [valueInput, setValueInput] = useState('')
	const [valueSelect, setValueSelect] = useState('waiting')
	const {firestore} = useContext(Context)
	const {statusProgress, taskId, taskValue} = editTodoActive
	
	const onChangeHandler = (value) => {
		setValueInput(value)
	}
	
	const pushEditTask = (e) => {
		e.preventDefault()
		firestore.collection(urlForSaveTodoTask).doc(taskIdEdit).update({
			taskValue: (valueInput === '') ? taskValue : valueInput,
			statusProgress: (valueSelect === 'waiting') ? statusProgress : valueSelect
		}).then(res => res)
		setValueInput('')
		setValueSelect('waiting')
	}
	
	return (
		<form className="form__todo-task">
			<div className="form__todo-task__wrapper">
				<div className="form__todo-task__container">
					<input
						className="form__todo-task__input"
						autoComplete="off"
						type="text"
						value={(valueInput === '') ? taskValue : valueInput}
						autoFocus={true}
						name="task-title"
						placeholder="Enter task"
						onChange={(e) => {
							onChangeHandler(e.target.value)
						}}
					/>
				</div>
				<div className="form__todo-task__progress">
					<select
						onChange={e => setValueSelect(e.target.value)}
						value={(valueSelect === 'waiting') ? statusProgress : valueSelect}
					>
						<option
							value="waiting"
							defaultValue
						>
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
			</div>
			<button
				className="form__todo-task__delete"
				onClick={(e) => {
					pushEditTask(e)
					editCloseTaskHandler()
				}}
			>
				<img
					src={Push}
					alt="push"
				/>
			</button>
			<button
				className="form__todo-task__delete"
				onClick={(e) => {
					e.preventDefault()
					editCloseTaskHandler()
				}}
			>
				<img
					src={Closed}
					alt="closed"
				/>
			</button>
		</form>
	);
};

export default EditTaskForm;