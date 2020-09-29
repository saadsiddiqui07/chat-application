import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chats from "./components/Chats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
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
