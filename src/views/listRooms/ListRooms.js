import React, { useContext, useEffect, useState } from 'react';
import ListRoom from "../../components/listRoom/ListRoom";
import AddNewRoomModal from "../../components/addNewRoomModal/AddNewRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from '../../index'
import { addUidRoom, getAllRooms, getUsersAll } from "../../redux/actions";
import UserInfo from "../../components/userInfo/UserInfo";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../hooks/auth.hook";
import { AuthContext } from "../../context/auth.context";
import ManageScreenTasks from "../../components/manageScreenTasks/ManageScreenTasks";
import AddNewUserInRoom from "../../components/addNewUserInRoom/AddNewUserInRoom";

const ListRooms = () => {
	const dispatch = useDispatch();
	const [addRoomModal, setAddRoomModal] = useState(false)
	const [showManageScreenTask, setShowManageScreenTask] = useState(false)
	const [roomChecked, setRoomChecked] = useState([])
	const [uidRoomChange, setUidRoomChange] = useState('')
	const [uidUsersAllChange, setUidUsersAllChange] = useState('')
	const [addNewUserInRoom, setAddNewUserInRoom] = useState(false)
	const [eligibleRooms, setEligibleRooms] = useState([])
	const [filteredRoomTasksUser, setFilteredRoomTasksUser] = useState([])
	const [updateInvitedUsers, setUpdateInvitedUsers] = useState([])
	const [tehDocId, setTehDocId] = useState('')
	const { logout } = useAuth()
	const { user, switchTheme } = useContext(AuthContext)
	const { firestore } = useContext(Context)
	
	
	const [roomTasks, roomTasksLoader] = useCollectionData(firestore.collection('roomTask').orderBy('createdAt', 'desc'))
	const rooms = useSelector(state => state.rooms.rooms)
	
	const [userEmailGet, isUserEmailGetLoading] = useCollectionData(firestore.collection('groupUsers'))
	// const usersAll = useSelector(state => state.usersAll.usersAll)
	const [userEmailSet, loading] = useCollectionData(firestore.collection('groupUsers').where('userEmail', '==', user.email))
	const createDefaultId = (
		Date.now() + user.email
	).split('').join('')
	const returnCheckedRoom = (uid) => {
		setUidRoomChange(uid)
		!roomTasksLoader && setRoomChecked(roomTasks.filter(taskUid => taskUid.uid === uid))
	}
	const returnCheckedUsers = (uid) => {
		setUidUsersAllChange(uid)
		!roomTasksLoader && setRoomChecked(roomTasks.filter(taskUid => taskUid.uid === uid))
	}
	// filtered rooms task user+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	useEffect(() => {
		const p = []
		if (!roomTasksLoader) {
			rooms.forEach(item => {
				if (eligibleRooms.indexOf(item.uid) !== -1) {
					p.push(item)
				}
				setFilteredRoomTasksUser(p)
			})
		}
	}, [rooms, eligibleRooms, setEligibleRooms, userEmailGet, roomTasksLoader])
	
	// filtered rooms task user------------------------------------------------------------------
	useEffect(() => {
		userEmailGet && userEmailGet.map(item => {
			const freeUserInfo = []
			if (item.userId === "" && item.userEmail === user.email) {
				freeUserInfo.push(item)
				setUpdateInvitedUsers(freeUserInfo)
			}
		})
	}, [isUserEmailGetLoading])
	
	// create new user+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	useEffect(() => {
		if (!loading && userEmailSet.length === 0) {
			firestore.collection('groupUsers').doc(createDefaultId).set({
				createdAt: Date.now(),
				userId: user.uid,
				permissionsUser: [],
				userEmail: user.email,
				userName: user.displayName,
				photoURL: user.photoURL,
				docId: createDefaultId,
				uid: (
					Date.now() + user.email
				).split(' ').join('')
			}).then(res => res)
		}
	}, [loading])
	// create new user------------------------------------------------------------------
// add room in user permissions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	useEffect(() => {
		if (!isUserEmailGetLoading && userEmailGet) {
			const myUser = userEmailGet.find(myUser => myUser.userId === user.uid)
			if (myUser) {
				setEligibleRooms((
					myUser.permissionsUser
				) || [])
				setTehDocId(myUser.docId)
			}
		}
	}, [userEmailGet])
	
	const updatePermissionRoom = (id) => {
		const tehArr = [...eligibleRooms, id]
		firestore.collection('groupUsers').doc(tehDocId).update({
			permissionsUser: tehArr,
		}).then(res => res)
	}
// add room in user permissions------------------------------------------------------------------
	useEffect(() => {
		const getDocId = updateInvitedUsers.map(item => item.docId)[0]
		!isUserEmailGetLoading && firestore.collection('groupUsers').doc(getDocId).update({
			userId: user.uid, userName: user.displayName, photoURL: user.photoURL
		}).then(res => res)
	}, [updateInvitedUsers])
	
	const closeRoomModal = () => {
		setAddRoomModal(false)
		setShowManageScreenTask(false)
		setAddNewUserInRoom(false)
	}
	const toggleManageScreenTask = (way) => {
		setShowManageScreenTask(way)
	}
	
	useEffect(() => {
		roomTasks && dispatch(getAllRooms(roomTasks))
	}, [roomTasks])
	
	useEffect(() => {
		userEmailGet && dispatch(getUsersAll(userEmailGet))
	}, [userEmailGet])
	
	useEffect(() => {
		dispatch((
			addUidRoom(uidRoomChange)
		))
	}, [uidRoomChange])
	
	const AddNewUserForRoom = (uid) => {
		setUidUsersAllChange(uid)
		setAddNewUserInRoom(true)
	}

// deletedRoomTaskHandler ++++++++++++++++++++++++++++++++++++++++++++++++++++++
	const deletedRoomTaskHandler = (e, id) => {
		e.preventDefault()
		const updatedRoomsList = eligibleRooms.filter(it => it !== id)
		firestore.collection('groupUsers').doc(tehDocId).update({
			permissionsUser: updatedRoomsList,
		}).then(() => {
			setEligibleRooms(updatedRoomsList)
			setFilteredRoomTasksUser(filteredRoomTasksUser.filter(room => room.uid !== id))
		})
		
		firestore.collection('roomTask').doc(id).collection('tasks').get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				doc.ref.delete();
			});
		});
		firestore.collection('roomTask').doc(id).delete()
	}
	
	if (loading || isUserEmailGetLoading || roomTasksLoader) {
		return <Loader />
	}
	return (
		<div className="list-rooms">
			<div className="list-rooms__header">
				<h1 className="list-rooms__name">List Rooms</h1>
				<div className="list-rooms__add-rooms">
					<div
						className="list-rooms__checkbox"
						title="switch theme"
					>
						<input
							className="react-switch-checkbox"
							id={`react-switch-new`}
							type="checkbox"
							onChange={(e) => {
								switchTheme(e.target.checked)
							}}
						/>
						<label
							className="react-switch-label"
							htmlFor={`react-switch-new`}
						>
							<span className={`react-switch-button`} />
						</label>
					</div>
					<button
						title="Add new room"
						onClick={() => setAddRoomModal(true)}
					>
						Room +
					</button>
				</div>
			</div>
			{!roomTasksLoader ? (
				addRoomModal && <AddNewRoomModal
					closeRoomModal={closeRoomModal}
					updatePermissionRoom={updatePermissionRoom}
					user={user}
				/>
			) : <Loader />}
			{!roomTasksLoader ? (
				showManageScreenTask && <ManageScreenTasks
					roomChecked={roomChecked}
					closeRoomModal={closeRoomModal}
					user={user}
				/>
			) : <Loader />}
			{
				addNewUserInRoom && <AddNewUserInRoom
					closeRoomModal={closeRoomModal}
					uid={uidUsersAllChange}
					userEmailGet={userEmailGet}
				/>
			}
			<div className="list-rooms__body">
				<ul>
					{
						filteredRoomTasksUser.length > 0 ? filteredRoomTasksUser && filteredRoomTasksUser.map((room, index) =>
							<ListRoom
								room={room}
								key={room.uid}
								index={index}
								showManageScreenTask={toggleManageScreenTask}
								returnCheckedRoom={returnCheckedRoom}
								AddNewUserForRoom={AddNewUserForRoom}
								returnCheckedUsers={returnCheckedUsers}
								deletedRoomTaskHandler={deletedRoomTaskHandler}
							/>)
							:
							<div className="list-rooms__tasks-length">
								<p>No rooms, create a room</p>
								<button onClick={() => setAddRoomModal(true)}>
									Room +
								</button>
							</div>
					}
				</ul>
			</div>
			<div className="list-rooms__info">
				<button
					title="Log out"
					onClick={() => logout()}
				>
					Log out
				</button>
				<UserInfo userInfo={user} />
			</div>
		</div>
	);
};

export default ListRooms;