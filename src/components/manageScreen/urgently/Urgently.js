import React, {useEffect, useState} from 'react';
import './Urgently.css'
import TaskTodo from "../todoTask/TaskTodo";
import exit from '../../../images/arrowExit.svg'
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";
import TaskTodoFinish from "../todoTask/TaskTodoFinish";


const Urgently = ({
					  closeTaskComponent,
					  statusFinishProgress = [],
					  statusAnotherProgress = [],
					  linkSaveTask,
					  deleteTaskLine,
					  loading
				  }) => {
	const [pushBlock, setPushBlock] = useState(false)
	
	// const p =()=>{
	// 	const str = '/manageScreen/1635853195348tworoom/urgently'
	// 	const winLocation = window.location.pathname
	// 	console.log(transformationString(winLocation))
	// 	console.log(transformationString(str))
	//
	// }
	
	// const transformationString=(str)=>{
	// 	return str.split('/').slice(0, -1).join()
	// }
	// console.log(tasksList)

	const closePushBlock = () => {
		setPushBlock(false)
	}
	
	return (
		<div className="urgently">
			<div className="urgently-header">
				<button
					className="urgently-exit"
					onClick={closeTaskComponent}
				>
					<img
						src={exit}
						alt="eit"
					/>
				</button>
				<h1 className="urgently-name">Urgently</h1>
			</div>
			{pushBlock
				?
				<AddTaskForm
					closePushBlock={closePushBlock}
					linkForSave={linkSaveTask}
				/>
				:
				<button
					style={{width: '80%', marginBottom: 20}}
					className="todo-task__delete"
					onClick={() => setPushBlock(true)}
				>
					add new task
				</button>
			}
			<ul className="urgently-ul__state">
				<TaskTodo
					tasksList={statusAnotherProgress}
					deleteTaskLine={deleteTaskLine}
					closePushBlock={closePushBlock}
					linkForSave={linkSaveTask}
					loading={loading}
				/>
			</ul>
			<ul className="urgently-ul__finish">
				<TaskTodoFinish
					tasksList={statusFinishProgress}
					deleteTaskLine={deleteTaskLine}
					loading={loading}
				/>
			</ul>
		</div>
	);
};

export default Urgently;