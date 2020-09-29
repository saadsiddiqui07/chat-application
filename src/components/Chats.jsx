import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import db from "../firebase/firebase.js";
import { useStateValue } from "../context/StateProvider";
import firebase from "firebase";

const Chats = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }] = useStateValue();

  // for different profile picture
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, [roomId]);

  useEffect(() => {
    // fetching room names through ( roomId ) from the database
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => setRoomName(snapshot.data().name));

      // fetching messages from different rooms through (roomId) from the database
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [roomId]);

  // function to send a message and store in the database
  const sendMessage = e => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    setInput("");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chats__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen at {new Date().toUTCString()}</p>
        </div>
        <div className="chats__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chats__body">
        {messages.map(message => (
          <p
            className={`chats__message ${message.name === user.displayName &&
              "chats__user"}`}
          >
            <span className="chats__name">{message.name}</span>
            {message.message}
            <span className="chats__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chats__footer">
        <InsertEmoticonIcon />
        <AttachFileIcon />
        <form>
          <input
            disabled={!user}
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} disabled={!input} type="submit">
            Send
          </button>
        </form>
        {!input ? (
          <MicIcon className="chats__footerIcon" />
        ) : (
          <SendIcon onClick={sendMessage} className="chats__footerIcon" />
        )}
      </div>
    </div>
  );
};

export default Chats;
