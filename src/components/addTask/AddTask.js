import React, { useContext, useRef, useState } from 'react';
import { Context } from "../../index";
import { AuthContext } from "../../context/auth.context";
import { useSelector } from "react-redux";

const AddTask = ({ closeRoomModal }) => {
	const [valueInp, setValueInp] = useState('')
	const [valueSelect, setValueSelect] = useState('wait')
	let wrapperInput = useRef()
	const { firestore } = useContext(Context)
	const {user} = useContext(AuthContext)
	const uidRoom = useSelector(state => state.uidRoom.uidRoom)
	
	
	const borderBottom = () => {
		const val = valueInp.length + 1
		wrapperInput.current.style.width = `${val * 15}px`
		if (valueInp <= 1) {
			return wrapperInput.current.style.width = '0px'
		}
	}
	const id = (Date.now() + valueInp).split(' ').join('')
	const pushNewTask = (e) => {
		e.preventDefault()
		if (valueInp !== '') {
			firestore.collection(`${uidRoom}/tasks`).doc(id).set({
				taskId: id,
				taskValue: valueInp,
				statusProgress: valueSelect,
				userAddTask: {
					displayName: user.displayName,
					photoURL: user.photoURL,
					email: user.email
				},
				userEditTask: {
					displayName: '',
					photoURL: '',
					email: ''
				}
			}).then(res => res)
			setValueInp('')
			setValueSelect('wait')
			closeRoomModal()
		}else{
			console.log('error add new task')
		}
	}
	
	return (
		<div className="add-task">
			<div className="add-task__wrapper">
				<div className="add-task__block">
					<div
						className="add-task__close"
						onClick={() => closeRoomModal(false)}
					>
						&#10006;
					</div>
					<h1 className="add-task__name">Add task</h1>
					<div className="add-task__box">
						<input
							type="email"
							className="add-task__input"
							name="add-task__name"
							placeholder="Enter task"
							autoComplete="off"
							value={valueInp}
							autoFocus
							onChange={e => {
								setValueInp(e.target.value)
								borderBottom()
							}}
							onKeyPress={e => {
								if (e.key === 'Enter') {
									pushNewTask(e)
								}
							}}
						/>
						<p
							className="add-task__p"
							data-text=""
							ref={wrapperInput}
						>
						</p>
					</div>
					<div
						className="add-task__radio"
						onChange={(e) => setValueSelect(e.target.value)}
					>
						<label className="add-task__checkbox">Wait
							<input
								type="radio"
								name="status-progress"
								value="wait"
								defaultChecked={valueSelect === 'wait'}
							/>
							<span className="add-task__checkbox-checkmark"></span>
						</label>
						<label className="add-task__checkbox">Progress
							<input
								type="radio"
								name="status-progress"
								value="progress"
							/>
							<span className="add-task__checkbox-checkmark"></span>
						</label>
						<label className="add-task__checkbox">Finish
							<input
								type="radio"
								name="status-progress"
								value="finish"
							/>
							<span className="add-task__checkbox-checkmark"></span>
						</label>
					</div>
					<button
						className="add-task__button"
						onClick={pushNewTask}
						disabled={valueInp === ''}
					>
						Push task
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTask;