import React, { useContext, useRef, useState, useEffect } from 'react';
import { Context } from "../../index";

const AddNewUserInRoom = ({ closeRoomModal, uid, userEmailGet }) => {
	const [emailValue, setEmailValue] = useState('')
	let wrapperInput = useRef()
	const [validation, setValidation] = useState(false)
	const [errorEmail, setErrorEmail] = useState('')
	const [sortRoomsForUser, setSortRoomsForUser] = useState([])
	const [reqHasBeenSent, setReqHasBeenSent] = useState('')
	const { firestore } = useContext(Context)
	const id = (
		Date.now() + emailValue
	).split('').join('')
	const createDefaultId = (
		Date.now() + emailValue
	).split('').join('')
	
	const borderBottom = () => {
		const val = emailValue.length + 1
		wrapperInput.current.style.width = `${val * 15}px`
		if (emailValue <= 1) {
			return wrapperInput.current.style.width = '0px'
		}
	}
	
	const windowReqHasBeenSent = () => {
		setReqHasBeenSent(
			<div className="alertModal">
				<h3 className="alertModal-text">
					Request has been sent
				</h3>
			</div>
		)
		return setTimeout(() => {
			setReqHasBeenSent('')
		}, 2000)
	}
	const suchUserAlreadyExists = () => {
		setReqHasBeenSent(
			<div className="alertModal-such">
				<h3 className="alertModal-text__such">
					such user already exists
				</h3>
			</div>
		)
		return setTimeout(() => {
			setReqHasBeenSent('')
		}, 2000)
	}
	
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
			setTimeout(() => closeRoomModal(), 2000)
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
				closeRoomModal()
			} else {
				setErrorEmail(<p className="rooms-block__error-email"> Enter correct address e-mail </p>)
			}
		}
		setTimeout(() => {
			setErrorEmail('')
		}, 2000)
	}
	const validationEmail = (email) => {
		const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		setValidation(reg.test(String(email).toLowerCase()))
	}
	
	useEffect(() => {
	}, [emailValue])
	
	return (
		<div className="add-new_user">
			{reqHasBeenSent || errorEmail}
			<div className="add-new_user__wrapper">
				<div className="add-new_user__block">
					<div
						className="add-new_user__close"
						onClick={closeRoomModal}
					>
						&#10006;
					</div>
					<h1 className="add-new_user__name">Invite to the room</h1>
					<div className="add-new_user__box">
						<input
							type="email"
							className="add-new_user__input"
							name="add-new_user__name"
							placeholder="Enter email"
							autoComplete="off"
							value={emailValue}
							autoFocus
							onChange={e => {
								setEmailValue(e.target.value)
								validationEmail(emailValue)
								borderBottom()
							}}
							onKeyPress={e => {
								if (e.key === 'Enter') {
									addNewUser(e)
								}
							}}
						/>
						<p
							className="add-new_user__p"
							data-text=""
							ref={wrapperInput}
						>
						</p>
					</div>
					<button
						className="add-new_user__button"
						onClick={addNewUser}
						disabled={emailValue === ''}
					>
						Push task
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddNewUserInRoom;