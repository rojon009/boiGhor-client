import { useEffect, useState } from "react";
import { createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PrivetRoute from "./components/PrivetRoute/PrivetRoute";
import { auth } from "./firebase/firebase";
import Admin from "./pages/Admin/Admin";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Orders from "./pages/Orders/Orders";

export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header loggedInUser={loggedInUser} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivetRoute path="/admin">
            <Admin/>
          </PrivetRoute>
          <PrivetRoute path="/checkout/:id">
            <Checkout />
          </PrivetRoute>
          <PrivetRoute path="/orders/:uid">
            <Orders />
          </PrivetRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
