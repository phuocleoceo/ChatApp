import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function Lobby(props) {
	const { joinRoom } = props;
	const [infor, setInfor] = useState({
		username: "",
		room: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		joinRoom(infor.username, infor.room);
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
				InputProps={{
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
				InputProps={{
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
				endIcon={<FavoriteSharp />}>
				Join Room
			</Button>
		</form >
	)
}
