import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector, useDispatch } from "react-redux";
import { getAllMeassges } from "./redux/actions/chat.action";
import InputEmoji from 'react-input-emoji';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";



import axios from "axios";
function Chat({ socket, username, room }) {
	const [currentMessage, setCurrentMessage] = useState("");
	// const dispatch = useDispatch();
	const [messageList, setMessageList] = useState([]);
	const [show, setShow] = useState(false);
	const [idDetails, setIdDetails] = useState("");
	const [chatEdit, setChatEdit] = useState();
	const [id, setId] = useState("");
	const [clikUserName, setClikUserName] = useState("");
	const [joinUser, setJoinUser] = useState("");




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
	// console.log("chatId", chatId);
	// setMessageShow("delete successFully")
	const deleteChat = async (chatId) => {
		// if (clikUserName === joinUser) {
		const { data } = await axios.delete(`http://localhost:3001/api/v1/deleteChat/${chatId}`)
		// } else {
		// alert("you have not permission to delete this message")
		// }
	}
	const updateChat = async (chatId) => {
		setId(chatId)
		setShow(true);
	}

	const idDetailsFunction = (id) => {

		// eslint-disable-next-line array-callback-return
		// messageList.map((message) => {
		// 	if (message._id === id) {
		// 		setClikUserName(message.sender);
		// 	}
		// });
		// // eslint-disable-next-line array-callback-return
		// messageList.map((message) => {
		// 	if (message.sender === username) {
		// 		setJoinUser(message.sender);
		// 	}
		// });
		setIdDetails(id);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const { data } = await axios.get(`http://localhost:3001/api/v1/getAllMessages`);
		setMessageList(data.ChatMessages);

	}, [messageList]);

	const saveValue = async () => {
		// if (clikUserName === joinUser) {
		const { data } = await axios.put(`http://localhost:3001/api/v1/updateChat/${id}`, {
			message: chatEdit,
		});
		setShow(false);
		// } else {
		// alert("you have not permission to Edit this message")
		// }
	}
	const changeChatFunc = (e) => {
		const value = e.target.value;
		setChatEdit(value);

	}

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
									<div>

										{((messageContent._id === idDetails) && messageContent.sender === username) &&
											<div className="modal">


												<div>
													{/* <EditOutlined className="edit-button" onClick={() => updateChat(messageContent._id)} /> */}
													<EditOutlined className="edit-button" onClick={() => updateChat(messageContent._id)} />

													<DeleteOutlined className="delete-button" onClick={() => deleteChat(messageContent._id)} />

												</div>

											</div>
										}

										<div
											className="message"
											id={(username === messageContent.sender) ? "other" : "you"}
											// onClick={() => setShowModel(!showModel)}
											onClick={() => idDetailsFunction(messageContent._id)}
										>
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


									</div>

								);
							}
						})}

					{show &&
						<>
							<input type="text" onChange={changeChatFunc} />
							<button onClick={saveValue}>saveEditedChate</button>
						</>
					}

				</ScrollToBottom>

			</div >
			{/* {showEmoji && <Picker onEmojiClick={onEmojiClick} />} */}

			< div className="chat-footer" >

				<InputEmoji
					value={currentMessage}
					onChange={setCurrentMessage}
					cleanOnEnter
					onEnter={handleOnEnter}
					placeholder="Type a message"
				/>

				<button onClick={sendMessage}>&#9658;</button>
			</ div>

		</div >
	);
}

export default Chat;
