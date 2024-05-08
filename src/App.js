import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignupProvider } from "./context/SignupContext";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";
import Home from "./pages/home/Home";
import BookDetails from "./pages/home/BookDetails";
import Profile from "./components/Profile";
import ForgotPassword from "./pages/accounts/ForgotPassword";
import Cart from "./pages/home/Cart";
import CheckOut from "./pages/home/CheckOut";
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <Router>
      <SignupProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/home/books/:id" element={<BookDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login/forgotpassword" element={<ForgotPassword />} />
          <Route path="/mycart" element={<Cart />} />
          <Route path="/mycart/checkout" element={<CheckOut />} />
        </Routes>
          <Toaster />
      </SignupProvider>
    </Router>
  );
};

export default App;
