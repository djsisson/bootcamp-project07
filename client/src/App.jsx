import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SideBar from "./Components/SideBar/SideBar";
import { UserContext } from "./Context/UserContext";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userProfile = useLoaderData();

  useEffect(() => {
    if(userProfile=="") return
    setCurrentUser(userProfile)
  }, []);


  return (
    <>
      <div id="app">
        <Header></Header>
        <div id="main">
          <SideBar></SideBar>
          <div id="detail">
            <Outlet />
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
