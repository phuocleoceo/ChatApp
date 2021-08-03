import React, { useState } from 'react';
import { Button, InputAdornment, TextField, styled } from '@material-ui/core';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const LobbyForm = styled("form")({
	width: "50%",
	margin: "auto"
});

const WaitingText = styled("div")({
	color: "#78960b",
	fontWeight: "bold",
	fontSize: "20px",
	marginTop: "1vh"
});

export default function Lobby(props) {
	const { joinRoom } = props;
	const [disableButton, setDisableButton] = useState(false);
	const [infor, setInfor] = useState({
		username: "",
		room: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setDisableButton(true);
		localStorage.setItem("current_chat_user", infor.username);
		localStorage.setItem("current_chat_room", infor.room);
		joinRoom(infor.username, infor.room);
		//setDisableButton(false);
	}

	const handleChange = (e) => {
		setInfor({
			...infor,
			[e.target.name]: e.target.value
		});
	};

	return (
		<LobbyForm onSubmit={handleSubmit}>
			<TextField name="username" onChange={handleChange}
				fullWidth required label="Username" variant="outlined"
				autoComplete="off" InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountCircle />
						</InputAdornment>
					),
				}}
			/>
			<br /><br />

			<TextField name="room" onChange={handleChange}
				fullWidth required label="Room" variant="outlined"
				autoComplete="off" InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MeetingRoomIcon />
						</InputAdornment>
					),
				}}
			/>
			<br /><br />

			<Button type="submit" variant="contained"
				style={{ width: "100%" }} color="primary"
				disabled={disableButton} endIcon={<FavoriteSharp />}>
				Join Room
			</Button>
			{disableButton && <WaitingText>
				Waiting to join room ! F5 to retry if it takes too much time
			</WaitingText>}
		</LobbyForm >
	)
}
