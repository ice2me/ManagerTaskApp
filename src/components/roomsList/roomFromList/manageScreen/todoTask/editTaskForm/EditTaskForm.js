import React, {useContext, useState} from 'react';
import {Context} from "../../../../../../index";
import Push from '../../../../../../images/checkedIcon.svg'
import Closed from '../../../../../../images/closeIcon.svg'

const EditTaskForm = ({editCloseTaskHandler, urlForSaveTodoTask, taskIdEdit, editTodoActive}) => {
	const [valueInput, setValueInput] = useState('')
	const [valueSelect, setValueSelect] = useState('waiting')
	const {firestore} = useContext(Context)
	const {statusProgress, taskId, taskValue} = editTodoActive

	const pushEditTask = (e) => {
		e.preventDefault()
		firestore.collection(urlForSaveTodoTask).doc(taskIdEdit).update({
			taskValue: (valueInput === '') ? taskValue : valueInput,
			statusProgress: (valueSelect === '') ? statusProgress : valueSelect
		}).then(res => res)
		setValueInput('')
		setValueSelect('waiting')
	}
	return (
		<div className="form__todo-wrapper">
			<form className="form__todo-task">
				<h2 className="urgently-name">Edit task</h2>
				<div className="form__todo-task__wrapper">
					<div className="form__todo-task__container">
						<p
							className="todo-task__title"
							title={taskValue}
						> {taskValue}
						</p>
					</div>
					<div className="form__todo-task__progress">
						<select
							onChange={e => setValueSelect(e.target.value)}
							value={(valueSelect === 'dvdv') ? statusProgress : valueSelect}
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
					title="push task"
					className="form__todo-task__push"
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
					title="close"
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
		</div>
		
	);
};

export default EditTaskForm;