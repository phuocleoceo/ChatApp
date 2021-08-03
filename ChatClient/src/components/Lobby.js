import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

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
		setDisableButton(false);
	}

	const handleChange = (e) => {
		setInfor({
			...infor,
			[e.target.name]: e.target.value
		});
	};

	return (
		<form onSubmit={handleSubmit} style={{ width: "40%", margin: "auto" }}>
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
		</form >
	)
}
