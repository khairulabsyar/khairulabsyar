import './App.css';
import { Route } from "react-router-dom"
import Navbar from "./Containers/Navbar";
import HomePage from "./Components/HomePage";
import UserProfilePage from "./pages/UserProfilePage"
import OtherProfilePage from "./pages/OtherProfilePage"
import { ToastContainer } from 'react-toastify';
import UploadPage from "./pages/UploadPage";

function App() {
  /*
   * The default boolean for loggedIn state would be
   * determined by whether JWT exists in localStorage
  */
  return (
    <>
      <ToastContainer/>
      <Navbar/>
      <div>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/users/profile">
          <UserProfilePage />
        </Route>
        <Route exact path="/users/:id">
          <OtherProfilePage />
        </Route>
        <Route exact path="/upload">
          <UploadPage />
        </Route>
      </div>
    </>
  );
}

export default App;