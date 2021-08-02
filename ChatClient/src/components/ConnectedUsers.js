import React from 'react';

export default function ConnectedUsers(props) {
	const { users } = props;
	return (
		<div className='user-list'>
			<h4>Connected Users</h4>
			{
				users.map((u, idx) =>
					<h5 key={idx}>{u}</h5>
				)
			}
		</div>

	)
}
