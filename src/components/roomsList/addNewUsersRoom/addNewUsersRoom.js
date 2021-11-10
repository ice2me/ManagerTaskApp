import React, {useContext, useEffect, useState} from 'react';
import './addNewUsersRoom.css'
import Push from "../../../images/checkedIcon.svg";
import Closed from "../../../images/closeIcon.svg";
import {Context} from "../../../index";

const AddNewUsersRoom = ({closeAddNewUser}) => {
	const [emailValue, setEmailValue] = useState('')
	const [validation, setValidation] = useState(false)
	const {firestore} = useContext(Context)
	
	const id = (Date.now() + emailValue).split(' ').join('')
	const addNewUser = (e) => {
		e.preventDefault()
		if (validation){
			firestore.collection('groupUsers').doc(id).set({
				uid: id,
				userEmail: emailValue,
				createdAt: Date.now()
			}).then(res => res)
			closeAddNewUser()
		}else{
			console.log('error validation')
		}
		
	}
	
	const validationEmail = (email) => {
		const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		setValidation(reg.test(String(email).toLowerCase()))
	}
	console.log(validation)
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
				autoComplete="new-password"
				value={emailValue}
				autoFocus
				onChange={e => {
					setEmailValue(e.target.value)
					validationEmail(emailValue)
				}}
				// onKeyPress={e => {
				// 	if (e.key === 'Enter') {
				// 		addRoomName(e)
				// 	}
				// }}
			/>
			<button
				className="add-user__button"
				onClick={(e) => addNewUser(e)}
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