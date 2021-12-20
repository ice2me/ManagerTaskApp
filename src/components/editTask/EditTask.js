import React, { useContext, useRef, useState } from 'react';
import { Context } from "../../index";
import { AuthContext } from "../../context/auth.context";
import { useSelector } from "react-redux";

const AddTask = ({ closeRoomModal, editTodoActive }) => {
	const [valueSelect, setValueSelect] = useState('wait')
	let wrapperInput = useRef()
	const { firestore } = useContext(Context)
	const { user } = useContext(AuthContext)
	const uidRoom = useSelector(state => state.uidRoom.uidRoom)
	const { statusProgress, taskId, taskValue } = editTodoActive

	
	const pushEditTask = (e) => {
		e.preventDefault()
		firestore.collection(`${uidRoom}/tasks`).doc(taskId).update({
			statusProgress: (valueSelect === '') ? statusProgress : valueSelect,
			userEditTask: {
				displayName: user.displayName,
				photoURL: user.photoURL,
				email: user.email
			}
		}).then(res => res)
		setValueSelect('wait')
		closeRoomModal(false)
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
					<h1 className="add-task__name">Edit task</h1>
					<div className="add-task__box">
						<p className="add-task__input">
							{editTodoActive.taskValue}
						</p>
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
						onClick={(e) => pushEditTask(e)}
					>
						Edit task
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTask;