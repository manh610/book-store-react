import './App.css';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";
import { Switch , Route } from "react-router-dom";
import Header from './components/Header/Header';
import React, { useEffect, useState} from 'react'
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Account from './pages/Acoount/Account';
import Book from './pages/Book/Book';
import Cart from './pages/Cart/Cart';
import Admin from './pages/Admin/Admin';
import BookInfo from './pages/BookInfo/BookInfo';

function App() {
  
  const [textSearh, setTextSearch] = useState('');
  const [clickSearch, setClickSearch] = useState(0)

  return (
    <div className="App">
      <TopBar />
      <Header />
      <Navbar changeTextSearch = {setTextSearch} valueClick={clickSearch} onClickSearch={setClickSearch} />
      <Switch>  
        <Route path="/" exact><Home textSearch={textSearh} valueClick={clickSearch}/></Route>
        <Route path="/login" ><Login /></Route>
        <Route path="/register" ><Register /></Route>
        <Route path="/account" ><Account /></Route>
        <Route path="/book/:id" ><Book /></Route>
        <Route path="/cart" ><Cart /></Route>
        <Route path="/admin" ><Admin /></Route>
        <Route path="/manage-book/:id" ><BookInfo /></Route>
      </Switch>
    </div>
  );
}

export default App;
