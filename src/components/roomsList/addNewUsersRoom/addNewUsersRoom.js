import React, { useContext, useEffect, useState } from 'react';
import './addNewUsersRoom.css'
import Push from "../../../images/checkedIcon.svg";
import Closed from "../../../images/closeIcon.svg";
import { Context } from "../../../index";

const AddNewUsersRoom = ({ closeAddNewUser, uid, windowReqHasBeenSent, userEmailGet, updatePermissionRoom }) => {
	const [emailValue, setEmailValue] = useState('')
	const [validation, setValidation] = useState(false)
	const [errorEmail, setErrorEmail] = useState('')
	const [sortRoomsForUser, setSortRoomsForUser] = useState([])
	const { firestore } = useContext(Context)
	// const { user } = useContext(AuthContext)
	const id = (Date.now() + emailValue).split('').join('')
	const createDefaultId = (Date.now() + emailValue).split('').join('')
	
	useEffect(() => {
		setSortRoomsForUser(userEmailGet.find(us => us.userEmail === emailValue))
		// const tehArr = [...eligibleRooms, id]
	}, [setEmailValue, emailValue])
	console.log(sortRoomsForUser)
	const addNewUser = (e) => {
		e.preventDefault()
		if (sortRoomsForUser) {
			
			// const tehArr = [...eligibleRooms, id]
			firestore.collection('groupUsers').doc(sortRoomsForUser.docId).update({
				permissionsUser: [`test__________${uid}`],
			}).then(res => res)
			closeAddNewUser()
			windowReqHasBeenSent()
		} else {
			if (validation) {
				console.log('validation', validation)
				firestore.collection('groupUsers').doc(id).set({
					createdAt: Date.now(),
					userId: '',
					userEmail: emailValue,
					userName: '',
					photoURL: '',
					permissionsUser: [uid],
					uid: id,
					docId: createDefaultId
				}).then(res => res)
				closeAddNewUser()
				windowReqHasBeenSent()
			} else {
				setErrorEmail(<p className="rooms-block__error-email"> Enter straight e-mail </p>)
			}
		}
		
	}
	// const addNewUser = (e) => {
	// 	e.preventDefault()
	// 	if (validation) {
	// 		firestore.collection('groupUsers').doc(id).set({
	// 			createdAt: Date.now(),
	// 			userId: '',
	// 			userEmail: emailValue,
	// 			userName: '',
	// 			photoURL: '',
	// 			permissionsUser: [uid],
	// 			uid: id,
	// 			docId: createDefaultId
	// 		}).then(res => res)
	// 		closeAddNewUser()
	// 		windowReqHasBeenSent()
	// 	} else {
	// 		setErrorEmail(<p className="rooms-block__error-email"> Enter straight e-mail </p>)
	// 	}
	// }
	const validationEmail = (email) => {
		const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		setValidation(reg.test(String(email).toLowerCase()))
	}
	
	useEffect(() => {}, [emailValue])
	
	return (
		<div className="add-user">
			<input
				type="email"
				pattern=".+@globex\.com"
				required
				size="30"
				className="add-user__input"
				name="add-user__email"
				placeholder="Enter e-mail"
				autoComplete="off"
				value={emailValue}
				autoFocus
				onChange={e => {
					setEmailValue(e.target.value)
					validationEmail(emailValue)
				}}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						addNewUser(e)
					}
				}}
			/>
			{errorEmail && errorEmail}
			<button
				className="add-user__button"
				onClick={(e) => {
					addNewUser(e)
				}}
				title="Push user e-mail"
			>
				<img
					src={Push}
					alt="push"
				/>
			</button>
			<button
				className="add-user__button"
				title="Close"
				onClick={closeAddNewUser}
			>
				<img
					src={Closed}
					alt="closed"
				/>
			</button>
		</div>
	);
};

export default AddNewUsersRoom;