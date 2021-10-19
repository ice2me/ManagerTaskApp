import React from 'react';
import './manageScreen.css'
import user from '../../images/user.png'
import {Link, Router, useHistory} from "react-router-dom";


const ManageScreen = () => {
	const history = useHistory()
	const goBackButton = () => {
		history.goBack()
	}
	return (
		<div className="manageScreen">
			<h1 className="manageScreen-name">Task management</h1>
			<Router history={history}>
				<div className="manageScreen-wrapper">
					<Link to="/urgently" className="manageScreen-link">
							urgently
					</Link>
					<Link to="/delegate" className="manageScreen-link">
							delegate
					</Link>
					<Link to="/noUrgently" className="manageScreen-link">
							no urgently
					</Link>
					<Link to="/delete" className="manageScreen-link">
							delete
					</Link>
					
				</div>
			</Router>
			<div className="manageScreen-footer">
				<button className="manageScreen-exit" onClick={goBackButton}>exit</button>
				<div className="manageScreen-user">
					<p>Serhii Serhii</p>
					<img
						src={user}
						alt="user"
					/>
				</div>
			</div>
		</div>
	)
		;
};

export default ManageScreen;