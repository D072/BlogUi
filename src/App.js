import "./App.css";
import {React} from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import DetailsPage from "./components/DetailsPage";
import Protect from "./components/Protect";
import BlogData from "./components/blogData";
import Category from "./components/Category";
import AdLogin from "./components/AdLogin";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AdminOnly from "./components/AdminOnly";
import ADProtect from "./components/ADProtect";
import Navbar from "./components/Navbar";
import { SearchData } from "./components/SearchContext";
import { useState } from "react";

function App() {
  const [data, setData] = useState([])
  return (
    <SearchData.Provider value={{data,setData}}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Protect>
              <Home />  
            </Protect>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/detail/:blogid">
            <Protect>
              <DetailsPage />
            </Protect>
          </Route>
          <Route exact path="/blog/cateCreate">
            <ADProtect>
              <Category />
            </ADProtect>
          </Route>
          <Route exact path="/blog/blogCreate">
            <ADProtect>
              <BlogData />
            </ADProtect>
          </Route>
          <Route exact path="/admin/login">
              <AdLogin />
          </Route>
          <Route exact path="/admin/home">
            <ADProtect>
              <AdminOnly />
            </ADProtect>
          </Route>
        </Switch>
      </Router> 
    </SearchData.Provider>
  );
}

export default App;
