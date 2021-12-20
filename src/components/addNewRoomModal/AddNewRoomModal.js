import React, { useContext, useRef, useState } from 'react';
import { Context } from "../../index";

const AddNewRoomModal = ({ closeRoomModal, user, updatePermissionRoom }) => {
	const [value, setValue] = useState('')
	let wrapperInput = useRef('')
	const {firestore} = useContext(Context)
	
	const borderBottom = () => {
		const val = value.length + 1
		wrapperInput.current.style.width = `${val * 15}px`
		if (value <= 1) {
			return wrapperInput.current.style.width = '0px'
		}
	}
	
	const tId = (Date.now() + value).split(' ').join('')
	const submitAddNameRoomHandler = async (e) => {
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
	return (
		<div className="create-room" >
			<div className="create-room__wrapper">
				<div className="create-room__block">
					<button
						className="create-room__close"
						onClick={(e) => closeRoomModal()}
					>
						&#10006;
					</button>
					<h1 className="create-room__name">Create room</h1>
					<div className="create-room__box">
						<input
							type="email"
							className="create-room__input"
							name="create-room__name"
							placeholder="Enter name"
							autoComplete="off"
							value={value}
							autoFocus
							onChange={e => {
								setValue(e.target.value)
								borderBottom()
							}}
							onKeyPress={e => {
								if (e.key === 'Enter') {
									submitAddNameRoomHandler(e)
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
						onClick={submitAddNameRoomHandler}
						disabled={value === ''}
					>
						Create room
					</button>
				</div>
			</div>
			<button
				className="underlay"
				onClick={closeRoomModal}
			>
				.
			</button>
		</div>
	);
};

export default AddNewRoomModal;