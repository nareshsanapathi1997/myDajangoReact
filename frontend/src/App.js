import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import { Provider } from "react-redux"; // Import Provider
import store from "./redux/store"; // Make sure the path is correct

// Import pages
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddNote from "./pages/AddNote";
import UserList from "./pages/UserList";
// import AllUsers from "./pages/UserList";

function App() {
  return (
    <Provider store={store}>  {/* Wrap everything inside Provider */}
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/users" element={<UserList />} />
          {/* <Route path="/allUsers" element={<AllUsers />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
