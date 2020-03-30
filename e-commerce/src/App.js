import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
