import React from 'react';
import { Button } from '@material-ui/core';
import MessageContainer from './MessageContainer';
import SendMessage from './SendMessage';
import ConnectedUsers from './ConnectedUsers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Chat(props) {
	const { sendMessage, messages, users, closeConnection } = props;

	const handleCloseConnection = () => closeConnection();

	return (
		<div>
			<div className='leave-room'>
				<Button variant="contained" color="secondary"
					onClick={handleCloseConnection}
					startIcon={<ExitToAppIcon />}
				>
					Leave Room
				</Button>
			</div>

			<ConnectedUsers users={users} />

			<div className='chat'>
				<MessageContainer messages={messages} />
				<SendMessage sendMessage={sendMessage} />
			</div>
		</div>

	)
}
