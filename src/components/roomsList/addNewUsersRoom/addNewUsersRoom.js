import React, {useContext, useEffect, useState} from 'react';
import './addNewUsersRoom.css'
import Push from "../../../images/checkedIcon.svg";
import Closed from "../../../images/closeIcon.svg";
import {Context} from "../../../index";

const AddNewUsersRoom = ({closeAddNewUser, uid, windowReqHasBeenSent, userEmailGet, suchUserAlreadyExists}) => {
	const [emailValue, setEmailValue] = useState('')
	const [validation, setValidation] = useState(false)
	const [errorEmail, setErrorEmail] = useState('')
	const [sortRoomsForUser, setSortRoomsForUser] = useState([])
	const {firestore} = useContext(Context)
	const id = (Date.now() + emailValue).split('').join('')
	const createDefaultId = (Date.now() + emailValue).split('').join('')
	useEffect(() => {
		setSortRoomsForUser(userEmailGet.find(us => us.userEmail === emailValue))
	}, [setEmailValue, emailValue])
	
	const addNewUser = (e) => {
		e.preventDefault()
		if (sortRoomsForUser) {
			const tehUid = sortRoomsForUser.permissionsUser.find(item => item === uid)
			if (tehUid !== uid) {
				firestore.collection('groupUsers').doc(sortRoomsForUser.docId).update({
					permissionsUser: [...sortRoomsForUser.permissionsUser, uid],
				}).then(res => res)
				windowReqHasBeenSent()
			} else {
				suchUserAlreadyExists()
			}
			closeAddNewUser()
		} else {
			if (validation) {
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
			} else {
				setErrorEmail(<p className="rooms-block__error-email"> Enter straight e-mail </p>)
			}
		}
		setTimeout(() => {
			setErrorEmail('')
		}, 1000)
	}
	const validationEmail = (email) => {
		const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		setValidation(reg.test(String(email).toLowerCase()))
	}
	
	useEffect(() => {
	}, [emailValue])
	
	return (
		<div className="add-user">
			<input
				type="email"
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
				className="form__todo-task__push"
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
				className="form__todo-task__delete"
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