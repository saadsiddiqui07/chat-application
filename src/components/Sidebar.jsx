import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MessageIcon from "@material-ui/icons/Message";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChats from "./SidebarChats";
import db from "../firebase/firebase";
import { useStateValue } from "../context/StateProvider.js";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();

  // fetching rooms data from the database
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          room: doc.data(),
        }))
      )
    );
    return () => {
      // performing a clean up action
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} /> {user.displayName}
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChats addNewChat />
        {rooms.map(({ id, room }) => (
          <SidebarChats key={id} id={id} name={room.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
