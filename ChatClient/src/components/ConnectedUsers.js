import React from 'react';
import { styled, Paper } from '@material-ui/core';

const PaperContainer = styled(Paper)({
	backgroundColor: '#313131',
	overflow: "auto",
	height: "100%",
	marginRight: "0.4vw",
	width: "14.5vw",
	maxWidth: "14.5vw"
});

const ListUserTitle = styled("div")({
	fontSize: "1.5rem",
	color: "white",
	marginTop: "1vh",
	fontWeight: "bold"
});

const ConnectedUserName = styled("div")({
	fontSize: "1.1rem",
	color: "greenyellow",
	fontWeight: "bold"
});

export default function ConnectedUsers(props) {
	const { users } = props;

	return (
		<PaperContainer>
			<ListUserTitle>Connected Users</ListUserTitle>
			{
				users.map((u, idx) =>
					<ConnectedUserName key={idx}>
						{u}
					</ConnectedUserName>
				)
			}
		</PaperContainer>

	)
}
