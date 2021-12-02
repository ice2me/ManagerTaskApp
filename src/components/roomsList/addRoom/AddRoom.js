import React, {useContext, useRef, useState} from 'react';
import './AddRoom.css'
import Loader from "../../loader/Loader";
import {Context} from "../../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {AuthContext} from "../../../context/auth.context";

const AddRoom = ({closeRoomModal, updatePermissionRoom}) => {
	const {firestore} = useContext(Context)
	const [value, setValue] = useState('')
	let wrapperInput = useRef('')
	const {user} = useContext(AuthContext)
	const [loading] = useCollectionData(
		firestore.collection('roomTask').orderBy('createdAt')
	)
	const borderBottom = () => {
		const val = value.length + 1
		wrapperInput.current.style.width = `${val * 15}px`
		if (value <= 1) {
			return wrapperInput.current.style.width = '0px'
		}
	}
	
	const tId = (Date.now() + value).split(' ').join('')
	const addRoomName = async (e) => {
		firestore.collection('roomTask').doc(tId).set({
			uid: tId,
			nameRoom: value,
			createdAt: Date.now(),
			email: user.email
		})
		updatePermissionRoom(tId)
		setValue('')
		closeRoomModal(e)
	}
	
	if (!loading) {
		return <Loader />
	}
	return (
		<div className="create-room">
			<div className="create-room__block">
				<button
					className="create-room__close"
					onClick={(e) => closeRoomModal(e)}
				>
					&#10006;
				</button>
				<h1 className="create-room__name">Create room</h1>
				<div className="create-room__wrapper">
					<input
						type="email"
						className="create-room__input"
						name="create-room__name"
						placeholder="Enter name"
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
				<button
					className="create-room__button"
					onClick={addRoomName}
					disabled={value === ''}
				>
					Create room
				</button>
			</div>
		</div>
	);
};

export default AddRoom;