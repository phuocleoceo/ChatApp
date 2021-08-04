import React, { useState } from 'react';
import { Button, TextField, Paper, Modal, styled } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Picker from 'emoji-picker-react';

const AdornmentButton = styled(Button)({
	color: "#3f51b5",
	width: "1vw"
});

const EmojiModalPosition = {
	top: "35%",
	left: "23%"
};

export default function SendMessage(props) {
	const { sendMessage } = props;
	const [message, setMessage] = useState("");
	const [showEmoji, setShowEmoji] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		sendMessage(message);
		setMessage("");
	}

	const handleChange = (e) => setMessage(e.target.value);

	const handleShowEmoji = () => setShowEmoji(true);

	const handleCloseEmoji = () => setShowEmoji(false);

	const handleEmojiClick = (e, emojiObject) => {
		setMessage(message + emojiObject.emoji);
	};

	return (
		<Paper elevation={3} component="form" onSubmit={handleSubmit} style={{ display: "flex" }} >

			<Modal open={showEmoji} onClose={handleCloseEmoji}
				style={EmojiModalPosition} disableEnforceFocus>
				<Picker onEmojiClick={handleEmojiClick}
					disableAutoFocus disableSkinTonePicker disableSearchBar />
			</Modal>

			<TextField value={message} name="message" onChange={handleChange}
				fullWidth required label="Message" variant="outlined" autoComplete="off"
			/>

			<AdornmentButton onClick={handleShowEmoji}>
				<EmojiEmotionsIcon />
			</AdornmentButton>

			<AdornmentButton type="submit">
				<SendIcon />
			</AdornmentButton>
		</Paper>
	)
}
