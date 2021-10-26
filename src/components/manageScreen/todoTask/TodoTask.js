import React, {useContext, useEffect, useRef, useState} from 'react';
import './TodoTask.css'
import './Toggle.css'
import {AuthContext} from "../../../context/auth.context";
import UserInfo from "../../userInfo/UserInfo";

const TodoTask = () => {
	const [showInput, setShowInput] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [valueInput, setValueInput] = useState('')
	const {user} = useContext(AuthContext)
	
	const onChackedHandler = () => {
		setIsChecked(!isChecked)
	}
	console.log(isChecked)
	const pushInputValue = () => {
		setShowInput(false)
	}
	const showInputText = () => {
		setShowInput(true)
	}
	useEffect(() => {
	
	}, [showInput, isChecked])
	return (
		<div className="todo-task">
			<div className="todo-task__wrapper">
				<div className="check">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={onChackedHandler}
					/>
				</div>
				{!showInput ? <p
						className="todo-task__title"
						onClick={showInputText}
					>
						{valueInput}
					</p>
					:
					<div className="todo-task__container">
						<input
							className="todo-task__input"
							type="text"
							value={valueInput}
							autoFocus={true}
							onChange={(e) => {setValueInput(e.target.value)}}
						/>
						<button
							className="todo-task__submit"
							onClick={pushInputValue}
						>+
						</button>
					</div>
				}
			</div>
			<div className="todo-task__progress">
				<input
					type="radio"
					name="rdo"
					id="inGear"
				/>
				<input
					type="radio"
					name="rdo"
					id="wait"
					defaultChecked={true}
				/>
				<div className="switch">
					<label htmlFor="inGear">in Gear</label>
					<label htmlFor="wait">Wait</label>
					<span></span>
				</div>
			</div>
			<div className="todo-task__block">
				<UserInfo />
			</div>
			<button className="todo-task__delete">del</button>
		</div>
	);
};

export default TodoTask;