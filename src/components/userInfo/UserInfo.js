import React from 'react';
import user from "../../images/user.png";

const UserInfo = ({ userInfo }) => {
	return (<div className="list-rooms__info-user">
		{userInfo && <>
			<div className="list-rooms__info-user__img">
				<img
					src={userInfo.photoURL ? userInfo.photoURL : user}
					alt="av"
				/>
			</div>
			
			<div className="list-rooms__info-user__block">
				<span>{userInfo.displayName}</span> <br></br>
				<span>{userInfo.email}</span>
			</div>
		</>}
	</div>);
};

export default UserInfo;