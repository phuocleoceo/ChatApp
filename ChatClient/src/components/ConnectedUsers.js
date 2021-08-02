import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paperRoot: {
		backgroundColor: '#313131',
		overflow: "auto",
		height: "100%",
		marginRight: "0.4vw",
		width: "14.5vw",
		maxWidth: "14.5vw"
	},
	listTitle: {
		fontSize: "1.5rem",
		color: "white",
		marginTop: "1vh",
		fontWeight: "bold"
	},
	userName: {
		fontSize: "1.1rem",
		color: "greenyellow",
		fontWeight: "bold"
	}
}));

export default function ConnectedUsers(props) {
	const { users } = props;
	const classes = useStyles();

	return (
		<Paper className={classes.paperRoot}>
			<div className={classes.listTitle}>Connected Users</div>
			{
				users.map((u, idx) =>
					<div className={classes.userName} key={idx}>
						{u}
					</div>
				)
			}
		</Paper>

	)
}
