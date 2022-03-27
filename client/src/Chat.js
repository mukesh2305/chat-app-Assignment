import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector, useDispatch } from "react-redux";
import { getAllMeassges } from "./redux/actions/chat.action";
import InputEmoji from 'react-input-emoji'

import axios from "axios";
function Chat({ socket, username, room }) {
	const [currentMessage, setCurrentMessage] = useState("");
	// const dispatch = useDispatch();
	const [messageList, setMessageList] = useState([]);




	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
			};

			await socket.emit("send_message", messageData);

			// setMessageList((list) => [...list, messageData]);
			// setMessageList(chatMessage.ChatMessages);
			// dispatch(getAllMeassges());
			setCurrentMessage("");
		}
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const { data } = await axios.get(`http://localhost:3001/api/v1/getAllMessages`);
		setMessageList(data.ChatMessages);

	}, [messageList]);
	// useEffect(() => {
	// 	socket.on("receive_message", (data) => {
	// 		// setMessageList((list) => [...list, data]);
	// 		// setMessageList(chatMessage.ChatMessages);
	// 		dispatch(getAllMeassges());
	// 	});
	// }, [dispatch, messageList, socket]);
	function handleOnEnter(e) {
		sendMessage();
	}
	return (
		<div className="chat-window">

			<div className="chat-header">
				<p>Live Chat</p>
			</div>

			<div className="chat-body">
				<ScrollToBottom className="message-container">

					{
						// eslint-disable-next-line array-callback-return
						messageList && messageList.map((messageContent) => {
							if (messageContent.roomId === room) {
								return (
									<div className="message" id={(username === messageContent.sender) ? "other" : "you"}>
										<div>
											<div className="message-content">
												<p>{messageContent.message}</p>
											</div>

											<div className="message-meta">
												<p id="time">{messageContent.time}</p>
												<p id="author">{messageContent.sender}</p>
											</div>

										</div>
									</div>
								);
							}
						})}

				</ScrollToBottom>
			</div>
			{/* {showEmoji && <Picker onEmojiClick={onEmojiClick} />} */}

			<div className="chat-footer">

				<InputEmoji
					value={currentMessage}
					onChange={setCurrentMessage}
					cleanOnEnter
					onEnter={handleOnEnter}
					placeholder="Type a message"
				/>

				<button onClick={sendMessage}>&#9658;</button>
			</div>

		</div >
	);
}

export default Chat;
