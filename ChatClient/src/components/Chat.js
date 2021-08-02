import React from 'react';
import { Button, Paper, Grid } from '@material-ui/core';
import MessageContainer from './MessageContainer';
import SendMessage from './SendMessage';
import ConnectedUsers from './ConnectedUsers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { styled } from '@material-ui/core';

const LeaveButton = styled("div")({
	textAlign: "right !important",
	marginBottom: "2vh"
});

export default function Chat(props) {
	const { sendMessage, messages, users, closeConnection } = props;
	const handleCloseConnection = () => closeConnection();

	return (
		<div>
			<LeaveButton>
				<Button variant="contained" color="secondary"
					onClick={handleCloseConnection}
					startIcon={<ExitToAppIcon />}
				>
					Leave Room
				</Button>
			</LeaveButton>

			<Paper elevation={3}>
				<Grid container>
					<Grid item>
						<ConnectedUsers users={users} />
					</Grid>

					<Grid item xs>
						<Grid item xs={12}>
							<MessageContainer messages={messages} />
						</Grid>
						<Grid item xs={12}>
							<SendMessage sendMessage={sendMessage} />
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}
