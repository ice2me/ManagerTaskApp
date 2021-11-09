import React, {useState} from 'react';
import '../urgently/Urgently.css'
import exit from "../../../../../images/arrowExit.svg";
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";
import TaskTodo from "../todoTask/TaskTodo";
import addNewTask from "../../../../../images/addNewNameIcon.svg";

const NoUrgently = ({
						closeTaskComponent,
						statusFinishProgress,
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
						alt="eit"
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
					className="todo-task__edit"
					onClick={() => setPushBlock(true)}
				>
					add new task
					<img
						src={addNewTask}
						alt="add new task"
					/>
				</button>
			}
			<ul className="urgently-ul__state">
				{!loading && <TaskTodo
					tasksList={statusAnotherProgress}
					deleteTaskLine={deleteTaskLine}
					closePushBlock={closePushBlock}
					urlForSaveTodoTask={urlForSaveTodoTask}
					parentIdState={parentIdState}
				/>
				}
			</ul>
			<ul className="urgently-ul__finish">
				{!loading && <TaskTodo
					tasksList={statusFinishProgress}
					deleteTaskLine={deleteTaskLine}
					closePushBlock={closePushBlock}
					urlForSaveTodoTask={urlForSaveTodoTask}
					parentIdState={parentIdState}
				/>
				}
			</ul>
		</div>
	);
};
export default NoUrgently;