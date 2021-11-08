import React, {useEffect, useState} from 'react';
import './Urgently.css'
import TaskTodo from "../todoTask/TaskTodo";
import exit from '../../../../../images/arrowExit.svg'
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";
import EditTaskForm from "../todoTask/editTaskForm/EditTaskForm";

const Urgently = ({
					  closeTaskComponent,
					  statusFinishProgress,
					  statusAnotherProgress,
					  linkSaveTask,
					  deleteTaskLine,
					  loading,
				  }) => {
	const [pushBlock, setPushBlock] = useState(false)
	const [editMenuAnother, setEditMenuAnother] = useState(false)
	const [editMenuFinish, setEditMenuFinish] = useState(false)
	const [pushMenuFinish, setPushMenuFinish] = useState([])
	
	const showEditMenu = (id, value, status) => {
		setEditMenuAnother(true)
		return setPushMenuFinish({
			taskId: id,
			taskValue: value,
			statusProgress: status
		})
	}
	useEffect(() => {}, [pushBlock])
	// useEffect(() => {console.log('i am useeffect')}, [pushMenuFinish,setPushBlock])
	// console.log(pushMenuFinish)
	
	const showEditMenuFinish = (id) => {
		setEditMenuFinish(true)
		// console.log(id)
	}
	
	const closePushBlock = () => {
		setPushBlock(false)
		setEditMenuAnother(false)
		setEditMenuFinish(false)
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
			{!(editMenuAnother || editMenuFinish) ?
				pushBlock
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
				:
				<button
					style={{width: '80%', marginBottom: 20}}
					className="todo-task__delete"
					onClick={() => setPushBlock(true)}
					disabled
				>
					add new task
				</button>
			}
			<ul className="urgently-ul__state">
				{!editMenuAnother ?
					!loading && <TaskTodo
						tasksList={statusAnotherProgress}
						deleteTaskLine={deleteTaskLine}
						closePushBlock={closePushBlock}
						linkForSave={linkSaveTask}
						showEditMenu={showEditMenu}
						
					/>
					:
					<EditTaskForm
						closePushBlock={closePushBlock}
						linkForSave={linkSaveTask}
						pushMenuFinish={pushMenuFinish}
					/>
				}
			
			</ul>
			<ul className="urgently-ul__finish">
				{!editMenuFinish ?
					!loading && <TaskTodo
						tasksList={statusFinishProgress}
						deleteTaskLine={deleteTaskLine}
						closePushBlock={closePushBlock}
						linkForSave={linkSaveTask}
						showEditMenu={showEditMenuFinish}
						
					/>
					:
					<EditTaskForm
						closePushBlock={closePushBlock}
						linkForSave={linkSaveTask}
						pushMenuFinish={pushMenuFinish}
					/>
				}
			</ul>
		</div>
	);
};

export default Urgently;