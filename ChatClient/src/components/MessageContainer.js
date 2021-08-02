import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	messageContainer: {
		height: "67vh",
		backgroundColor: "white",
		overflow: "auto",
		padding: "5px"
	},
	messageFrame: {
		maxWidth: "40vw",
		backgroundColor: "#0275d8",
		display: "inline-flex",
		padding: "7px",
		fontSize: "17px",
		color: "white",
		borderRadius: "17px",
		marginTop: "0.5vh"
	},
	fromUser: {
		fontSize: "small",
		marginBottom: "3px",
		marginRight: "5px"
	},
	userMessage: {
		textAlign: "right",
		paddingRight: "5px",
		fontSize: "18px"
	}
}));

export default function MessageContainer(props) {
	const { messages } = props;
	const messageRef = useRef();
	const classes = useStyles();

	useEffect(() => {
		if (messageRef && messageRef.current) {
			const { scrollHeight, clientHeight } = messageRef.current;
			messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
		}
	}, [messages]);


	return (
		<div ref={messageRef} className={classes.messageContainer}>
			{messages.map((m, index) =>
				<div key={index} className={classes.userMessage}>
					<div className={classes.messageFrame}>
						{m.message}
					</div>

					<div className={classes.fromUser}>
						{m.user}
					</div>
				</div>
			)}
		</div>

	)
}
