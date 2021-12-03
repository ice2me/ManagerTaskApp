import React, {useState} from 'react';
import './Urgently.css'
import TaskTodo from "../todoTask/TaskTodo";
import exit from '../../../../../images/arrowExit.svg'
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";
import addNewTask from '../../../../../images/addNewNameIcon.svg'
import Loader from "../../../../loader/Loader";

const Urgently = ({
	closeTaskComponent,
	statusAnotherProgress,
	urlForSaveTodoTask,
	deleteTaskLine,
	parentIdState,
	loading
}) => {
	const [pushBlock, setPushBlock] = useState(false)
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
						alt="exit"
						title="Exit"
					/>
				</button>
				<h1 className="urgently-name">Urgently</h1>
			</div>
			{pushBlock
				?
				<AddTaskForm
					closePushBlock={closePushBlock}
					linkForSave={urlForSaveTodoTask}
				/>
				:
				<button
					style={{width: '80%', marginBottom: 20}}
					className="todo-task__push"
					onClick={() => setPushBlock(true)}
					title="add new task"
				>
					add new task
					<img
						src={addNewTask}
						alt="add new task"
					/>
				</button>
			}
			<h2 className="title-ul"><p>Waiting or progress</p></h2>
			<ul className="urgently-ul__state">
				{!loading ? <TaskTodo
					tasksList={statusAnotherProgress}
					deleteTaskLine={deleteTaskLine}
					closePushBlock={closePushBlock}
					urlForSaveTodoTask={urlForSaveTodoTask}
					parentIdState={parentIdState}
				/> : <Loader />
				}
			</ul>
		</div>
	);
};

export default Urgently;