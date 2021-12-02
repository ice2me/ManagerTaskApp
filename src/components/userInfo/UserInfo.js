import React from 'react';

const UserInfo = ({user}) => {
	return (
		<>
			{user &&
				<>
					<div
						className="manageScreen-user"
						title="User info"
					>
						<div className="userInfoBlock">
							<p>
								{user.displayName}
							</p>
							<p className="userEmail">
								{user.email}
							</p>
						</div>
						<img
							src={user.photoURL}
							alt="user"
						/>
					</div>
				</>
			}
		</>
	);
};

export default UserInfo;