import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Chats from "./components/chats/Chats.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ user }] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chats />
              </Route>
              <Route path="/">
                <Chats />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
