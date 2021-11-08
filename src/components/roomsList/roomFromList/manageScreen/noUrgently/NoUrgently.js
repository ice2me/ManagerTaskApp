import React, {useState} from 'react';
import '../urgently/Urgently.css'
import exit from "../../../../../images/arrowExit.svg";
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";
import TaskTodo from "../todoTask/TaskTodo";

const NoUrgently = ({
						closeTaskComponent,
						statusFinishProgress = [],
						statusAnotherProgress = [],
						linkSaveTask,
						deleteTaskLine,
						loading}) => {
	
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
						alt="eit"
					/>
				</button>
				<h1 className="urgently-name"> NO Urgently</h1>
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
				<TaskTodo
					tasksList={statusFinishProgress}
					deleteTaskLine={deleteTaskLine}
					closePushBlock={closePushBlock}
					linkForSave={linkSaveTask}
					loading={loading}
				/>
			</ul>
		</div>
	);
};

export default NoUrgently;