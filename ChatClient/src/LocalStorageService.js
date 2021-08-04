export const SAVE_USER = (username, room) => {
	localStorage.setItem("current_chat_user", username);
	localStorage.setItem("current_chat_room", room);
};

export const GET_USER_NAME = () => {
	return localStorage.getItem("current_chat_user");
};

export const GET_ROOM = () => {
	return localStorage.getItem("current_chat_room");
};

export const REMOVE_USER = () => {
	localStorage.setItem("current_chat_user", "");
	localStorage.setItem("current_chat_room", "");
};