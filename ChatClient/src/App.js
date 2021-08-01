import React, { useState } from 'react';
import Chat from './components/Chat';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import './App.css';

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
			await connection.stop();
		}
		catch (e) {
			console.log(e);
		}
	}

	return (
		<div className='app'>
			<h2>Chat App</h2>
			<hr className='line' />
			{
				connection
					? <Chat sendMessage={sendMessage} messages={messages}
						users={users} closeConnection={closeConnection} />
					: <Lobby joinRoom={joinRoom} />
			}
		</div>

	);
}

export default App;
