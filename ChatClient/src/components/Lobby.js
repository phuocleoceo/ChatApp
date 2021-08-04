import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, TextField, styled } from '@material-ui/core';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { SAVE_USER, GET_USER_NAME, GET_ROOM } from '../LocalStorageService';

const LobbyForm = styled("form")({
	width: "50%",
	margin: "auto"
});

const WaitingText = styled("div")({
	color: "#78960b",
	fontWeight: "bold",
	fontSize: "20px",
	marginTop: "1.5vh"
});

const fullWidthButton = {
	width: "100%"
}

export default function Lobby(props) {
	const { joinRoom, closeConnection } = props;
	const [connecting, setConnecting] = useState(false);
	const [infor, setInfor] = useState({
		username: "",
		room: ""
	});

	useEffect(() => {
		const ReJoin = async () => {
			const username = GET_USER_NAME();
			const room = GET_ROOM();
			if (username && room) {
				setConnecting(true);
				await joinRoom(username, room);
			} else {
				setConnecting(false);
			}
		}
		ReJoin();
		// eslint-disable-next-line
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setConnecting(true);
		SAVE_USER(infor.username, infor.room);
		joinRoom(infor.username, infor.room);
	};

	const handleStopConnecting = () => {
		setConnecting(false);
		closeConnection();
	};

	const handleChange = (e) => {
		setInfor({
			...infor,
			[e.target.name]: e.target.value
		});
	};

	return (
		<LobbyForm onSubmit={handleSubmit}>
			<TextField name="username" onChange={handleChange} label="Username"
				fullWidth required variant="outlined"
				disabled={connecting} InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountCircle />
						</InputAdornment>
					),
				}}
			/>
			<br /><br />

			<TextField name="room" onChange={handleChange} label="Room"
				fullWidth required variant="outlined" autoComplete="off"
				disabled={connecting} InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MeetingRoomIcon />
						</InputAdornment>
					),
				}}
			/>
			<br /><br />

			{!connecting &&
				<Button type="submit" variant="contained"
					style={fullWidthButton} color="primary"
					endIcon={<FavoriteSharp />}>
					Join Room
				</Button>
			}

			{connecting &&
				<>
					<Button onClick={handleStopConnecting} variant="contained"
						style={fullWidthButton} color="secondary"
						endIcon={<PowerSettingsNewIcon />}>
						Stop Connecting
					</Button>

					<WaitingText>
						Please Wait To Join / ReJoin Room !
					</WaitingText>
				</>
			}
		</LobbyForm >
	)
}
