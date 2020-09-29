import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChats.css";
import db from "../../firebase/firebase";
import { Link } from "react-router-dom";

const SidebarChats = ({ addNewChat, name, id }) => {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState([]);

  // for different profile pictures
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  // to create a new room and add to the database
  const createRoom = (e) => {
    const roomName = prompt("Enter room name:");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  // fetching the last message to display on the sidebar
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLastMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  return !addNewChat ? (
    <Link className="sidebarChats__link" to={`/rooms/${id}`}>
      <div className="sidebarChats">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChats__info">
          <h2>{name}</h2>
          <p>{lastMessage[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createRoom}>
      <div className="sidebarChats">
        <h3>Add new Room</h3>
      </div>
    </div>
  );
};

export default SidebarChats;
