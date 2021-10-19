import React from 'react';
import './TodoTask.css'
import './Toggle.css'
import user from "../../../images/user.png";

const TodoTask = () => {
	return (
		<div className="todo-task">
			<div className="todo-task__wrapper">
				<div className="check">
					<input
						id="cbx2"
						type="checkbox"
					/>
					<label
						className="cbx"
						htmlFor="cbx2"
					>
						<div className="flip">
							<div className="front"></div>
							<div className="back">
								<svg
									width="16"
									height="14"
									viewBox="0 0 16 14"
								>
									<path d="M2 8.5L6 12.5L14 1.5"></path>
								</svg>
							</div>
						</div>
					</label>
				</div>
				<p className="todo-task__title">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit max-width: 70%</p>
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
				<div className="todo-task__user">
					<p>Serhii Serhii</p>
					<img
						src={user}
						alt="user"
					/>
				</div>
			</div>
			<button className="todo-task__delete">del</button>
		</div>
	);
};

export default TodoTask;