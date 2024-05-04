import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SideBar from "./Components/SideBar/SideBar";
import { UserProvider } from "./Context/UserContext";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
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
      </UserProvider>
    </>
  );
}

export default App;
