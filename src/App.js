import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import AdminRoute from "./routing/AdminRoute";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import RegisterVehicle from "./pages/RegisterVehicle";
import PermitsPage from "./components/Admin/Permits";
import Layout from "./components/Layout";
import NotFound from "./pages/404";
import "./assets/main.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route
                exact
                path="/register-vehicle"
                component={RegisterVehicle}
              />
              {/* user dashboard */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* admin routes */}
              <AdminRoute exact path="/admin" component={Admin} />
              {/* 404 */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
