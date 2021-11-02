import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import ManageScreen from "../../manageScreen/ManageScreen";


const RoomFromList = ({id, roomTaskCard, index, deletedRoomTaskHandler}) => {
		const [showManageMenuPage, setShowManageMenuPage] = useState(false)
		const {nameRoom, uid} = roomTaskCard
		const history = useHistory()
		
		// const openManageMenu = (e) => {
		// 	e.preventDefault()
		// 	history.push('/manageScreen/')
		// }
		const openManageMenuPage = () => {
			history.push('/manageScreen/')
			setShowManageMenuPage(true)
		}
		return (
			<li
				className="rooms-block__li"
			>
				<div
					className="rooms-block__a"
				>
					<h3
						className="rooms-block__title"
						// onClick={(e) => {openManageMenu(e)}}
						onClick={openManageMenuPage}
					>
						<span className="rooms-block__num">{index + 1}</span>
						{nameRoom}
					</h3>
					<div className="rooms-block__wrapper">
						<button
							className="rooms-block__delete"
							onClick={(e) => deletedRoomTaskHandler(e, uid)}
						>
							delete
						</button>
					</div>
				</div>
				{showManageMenuPage && <ManageScreen id={uid} />}
			</li>
		);
	}
;

export default RoomFromList;