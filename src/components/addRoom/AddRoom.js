import React, {useContext, useRef, useState} from 'react';
import './AddRoom.css'
import firebase from "firebase/compat";
import Loader from "../loader/Loader";
import {Context} from "../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";

const AddRoom = ({closeRoomModal}) => {
	const {auth, firestore} = useContext(Context)
	const [value, setValue] = useState('')
	let wrapperInput = useRef('')
	const [roomTasks, loading, error] = useCollectionData(
		firestore.collection('roomTask').orderBy('createdAt')
	)
	
	const borderBottom = () => {
		const val = value.length + 1
		wrapperInput.current.style.width = `${val * 15}px`
		if (value <= 1) {
			return wrapperInput.current.style.width = '0px'
		}
	}
	
	const id = value + Date.now()
	const addRoomName = async (e) => {
		firestore.collection('roomTask').doc(id).set({
			uid: id,
			nameRoom: value,
			createdAt: Date.now()
		})
		setValue('')
		closeRoomModal(e)
	}
	if (loading) {
		return <Loader />
	}
	return (
		<div className="create-room">
			<button
				className="create-room__close"
				onClick={(e) => closeRoomModal(e)}
			>
				&#10006;
			</button>
			<h1 className="create-room__name">Create room</h1>
			<div className="create-room__wrapper">
				<input
					type="text"
					className="create-room__input"
					name="create-room__name"
					placeholder="Enter name"
					autoComplete="new-password"
					value={value}
					autoFocus
					onChange={e => {
						setValue(e.target.value)
						borderBottom()
					}}
					onKeyPress={e => {
						if (e.key === 'Enter') {
							addRoomName(e)
						}
					}}
				/>
				<p
					className="create-room__p"
					data-text=""
					ref={wrapperInput}
				>
				</p>
			</div>
			
			<div className="create-room__generation">
				<button className="create-room__generation-button">
					Create link for new room
				</button>
				<p className="create-room__generation-out">
					...
				</p>
				<p className="create-room__generation-mes">
					send a link to your team to add people to it
				</p>
			</div>
			<button
				className="create-room__button"
				onClick={addRoomName}
				disabled={value === ''}
			>
				Create room
			</button>
		</div>
	);
};

export default AddRoom;