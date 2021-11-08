import React, {useContext, useState} from 'react';
import {Context} from "../../../../../../index";


const AddTaskForm = ({closePushBlock, linkForSave}) => {
	const [valueSelect, setValueSelect] = useState('waiting')
	const [valueInput, setValueInput] = useState('')
	const {firestore} = useContext(Context)
	const onChangeHandler = (value) => {
		setValueInput(value)
	}
	const id = (Date.now() + valueInput).split(' ').join('')
	const pushNewTask = (e) => {
		e.preventDefault()
		firestore.collection(linkForSave).doc(id).set({
			taskId: id,
			taskValue: valueInput,
			statusProgress: valueSelect
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
						value={valueInput}
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
						value={valueSelect}
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
					pushNewTask(e)
					closePushBlock()
				}}
			>
				Push
			</button>
			<button
				className="form__todo-task__delete"
				onClick={(e) => {
					e.preventDefault()
					closePushBlock()
				}}
			>
				Closed
			</button>
		</form>
	);
};

export default AddTaskForm;