import React, { useEffect, useRef } from 'react';
import { styled } from '@material-ui/core';

const MessContainer = styled("div")({
	height: "67vh",
	backgroundColor: "white",
	overflow: "auto",
	padding: "5px"
});

const UserMessage = styled("div")({
	textAlign: "right",
	paddingRight: "5px",
	fontSize: "18px"
});

const CurrentMessageContent = styled("div")({
	maxWidth: "40vw",
	backgroundColor: "#0275d8",
	display: "inline-flex",
	padding: "7px",
	fontSize: "17px",
	color: "white",
	borderRadius: "17px",
	marginTop: "0.5vh"
});

const CurrentUser = styled("div")({
	fontSize: "small",
	marginBottom: "3px",
	marginRight: "5px"
});

const OtherMessageContent = styled("div")({
	maxWidth: "35vw",
	backgroundColor: "#c4ccc6",
	padding: "7px",
	fontSize: "17px",
	color: "black",
	borderRadius: "17px",
	marginTop: "0.5vh"
});

const OtherUser = styled("div")({
	textAlign: "center",
	fontSize: "small",
	marginBottom: "3px",
	marginRight: "5px"
});

export default function MessageContainer(props) {
	const { messages } = props;
	const messageRef = useRef();

	useEffect(() => {
		if (messageRef && messageRef.current) {
			const { scrollHeight, clientHeight } = messageRef.current;
			messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
		}
	}, [messages]);


	return (
		<MessContainer ref={messageRef}>
			{messages.map((m, index) =>
				<UserMessage key={index}>
					<CurrentMessageContent>
						{m.message}
					</CurrentMessageContent>

					<CurrentUser>
						{m.user}
					</CurrentUser>
				</UserMessage>
			)}
		</MessContainer>
	)
}
