import React from 'react';
import { Button } from '@material-ui/core';
import MessageContainer from './MessageContainer';
import SendMessage from './SendMessage';
import ConnectedUsers from './ConnectedUsers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';

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
			<Grid container>
				<ConnectedUsers users={users} />

				<Grid container xs>
					<Grid item xs={12}>
						<MessageContainer messages={messages} />
					</Grid>
					<Grid item xs={12}>
						<SendMessage sendMessage={sendMessage} />
					</Grid>
				</Grid>
			</Grid>
		</div>

	)
}
