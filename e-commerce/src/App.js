import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

import './App.css';


class App extends React.Component {

  unSubscribeFromAuth = null;

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async user => {  
      if(user) {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()              }
            });
        });
      }
      else {
        this.setState({
          currentUser: user
        });
      }
     
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/shop" component={ShopPage}/>
            <Route path="/signin" component={SignInAndSignUpPage}/>
          </Switch>
        </BrowserRouter>
      </div>  
    );
  }
  
}

export default App;
