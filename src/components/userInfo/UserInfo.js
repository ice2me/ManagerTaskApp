import React, {useContext} from 'react';
import {AuthContext} from "../../context/auth.context";

const UserInfo = () => {
	const {user} = useContext(AuthContext)
	return (
		<>
			{user &&
			<div className="manageScreen-user">
				
				<p>
					{user.displayName}
				</p>
				<img
					src={user.photoURL}
					alt="user"
				/>
			</div>}
		</>
	);
};

export default UserInfo;