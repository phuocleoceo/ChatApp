import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';

export default function SendMessage(props) {
	const { sendMessage } = props;
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		sendMessage(message);
		setMessage("");
	}

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField value={message} name="message" onChange={handleChange}
				fullWidth required label="Message" variant="outlined"
				InputProps={{
					endAdornment: (
						<Button type="submit" color="primary" style={{ width: "1vw" }}>
							<SendIcon />
						</Button>
					),
				}}
			/>
		</form>
	)
}