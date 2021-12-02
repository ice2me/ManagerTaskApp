import React, {useContext, useState} from 'react';
import {Context} from "../../../../../../index";
import Push from "../../../../../../images/checkedIcon.svg";
import Closed from "../../../../../../images/closeIcon.svg";
import {AuthContext} from "../../../../../../context/auth.context";

const AddTaskForm = ({closePushBlock, linkForSave}) => {
	const [valueSelect, setValueSelect] = useState('waiting')
	const [valueInput, setValueInput] = useState('')
	const [noEnterInput, setNoEnterInput] = useState('')
	const {firestore} = useContext(Context)
	const {user} = useContext(AuthContext)
	
	const onChangeHandler = (value) => {
		setValueInput(value)
	}
	const id = (Date.now() + valueInput).split(' ').join('')
	const pushNewTask = (e) => {
		e.preventDefault()
		if (valueInput !== '') {
			firestore.collection(linkForSave).doc(id).set({
				taskId: id,
				taskValue: valueInput,
				statusProgress: valueSelect,
				userAddTask: {
					displayName: user.displayName,
					photoURL: user.photoURL,
					email: user.email
				}
			}).then(res => res)
			setValueInput('')
			setValueSelect('waiting')
			closePushBlock()
		} else {
			setNoEnterInput(<p className="rooms-block__error-email"> Enter your task </p>)
		}
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
					{noEnterInput}
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
					closePushBlock()
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

export default AddTaskForm;