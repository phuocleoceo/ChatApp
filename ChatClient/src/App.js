import React, { useState } from 'react';
import Chat from './components/Chat';
import Lobby from './components/Lobby';
import { styled } from '@material-ui/core';
import { REMOVE_USER } from './LocalStorageService';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const AppContainer = styled("div")({
	margin: "auto",
	paddingTop: "1vh",
	width: "85%",
	textAlign: "center"
});

const AppTitle = styled("div")({
	fontSize: "1.7rem",
	marginTop: "1vh",
	fontWeight: "bold"
});

const AppLine = styled("hr")({
	border: "1px solid #313131",
	width: "20%",
	marginBottom: "1vh"
});

function App() {
	const [connection, setConnection] = useState();
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	const joinRoom = async (username, room) => {
		try {
			const connection = new HubConnectionBuilder()
				.withUrl(process.env.REACT_APP_HUB)
				.configureLogging(LogLevel.Information)
				.build();

			connection.on("ReceiveMessage", (user, message) => {
				setMessages((messages) => [...messages, { user, message }]);
			});

			connection.on("UsersInRoom", (username) => setUsers(username));

			connection.onclose(e => {
				setConnection();
				setMessages([]);
				setUsers([]);
			});

			await connection.start();
			await connection.invoke("JoinRoom", { username, room });
			setConnection(connection);
		} catch (e) {
			console.log(e);
		}
	}

	const sendMessage = async (message) => {
		try {
			await connection.invoke("SendMessage", message);
		} catch (e) {
			console.log(e);
		}
	}

	const closeConnection = async () => {
		try {
			REMOVE_USER();
			await connection.stop();
		}
		catch (e) {
			console.log(e);
		}
	}

	return (
		<AppContainer>
			<AppTitle>Chat App</AppTitle>
			<AppLine />
			{
				connection
					?
					<Chat sendMessage={sendMessage} messages={messages}
						users={users} closeConnection={closeConnection} />
					:
					<Lobby joinRoom={joinRoom} closeConnection={closeConnection} />
			}
		</AppContainer>
	);
}

export default App;
