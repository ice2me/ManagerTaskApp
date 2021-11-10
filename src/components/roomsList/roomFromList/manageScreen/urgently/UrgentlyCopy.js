import React, { useState} from 'react';
import './Urgently.css'
import TaskTodo from "../todoTask/TaskTodo";
import exit from '../../../../../images/arrowExit.svg'
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";
import addNewTask from '../../../../../images/addNewNameIcon.svg'
import {DragDropContext, Droppable} from "react-beautiful-dnd";

const Urgently = ({
					  closeTaskComponent,
					  statusFinishProgress,
					  statusAnotherProgress,
					  urlForSaveTodoTask,
					  deleteTaskLine,
					  parentIdState,
					  loading,
					  dnd
				  }) => {
	const [pushBlock, setPushBlock] = useState(false)
	
	const closePushBlock = () => {
		setPushBlock(false)
	}
	
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};
		const onDragEnd = (result) => {
			if (!result.destination) {
				return;
			}
			
			const items = reorder(
				statusFinishProgress,
				result.source.index,
				result.destination.index
			);
			
			const newSortedItems = items.map((item, index) => {
				const copyItem = { ...item };
				return { ...copyItem, sort_order: index + 1 };
			});
			return dnd(newSortedItems)
		};
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
				className="todo-task__edit"
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
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
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
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
		{/*<ul className="urgently-ul__state">*/}
		{/*	{!loading && <TaskTodo*/}
		{/*		tasksList={statusAnotherProgress}*/}
		{/*		deleteTaskLine={deleteTaskLine}*/}
		{/*		closePushBlock={closePushBlock}*/}
		{/*		urlForSaveTodoTask={urlForSaveTodoTask}*/}
		{/*		parentIdState={parentIdState}*/}
		{/*	/>*/}
		{/*	}*/}
		{/*</ul>*/}
		{/*<ul className="urgently-ul__finish">*/}
		{/*	{!loading && <TaskTodo*/}
		{/*		tasksList={statusFinishProgress}*/}
		{/*		deleteTaskLine={deleteTaskLine}*/}
		{/*		closePushBlock={closePushBlock}*/}
		{/*		urlForSaveTodoTask={urlForSaveTodoTask}*/}
		{/*		parentIdState={parentIdState}*/}
		{/*	/>*/}
		{/*	}*/}
		{/*</ul>*/}
	
	</div>
);
}
;

export default Urgently;