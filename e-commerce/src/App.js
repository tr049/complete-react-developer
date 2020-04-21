import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./components/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import {Switch, Route, Redirect} from 'react-router-dom';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {connect} from 'react-redux';
import { setCurrentUser } from "./redux/user/user.action";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selector";
import './App.css';


class App extends React.Component {

  unSubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async user => {  
      if(user) {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            });
        });
      }
      else {
        setCurrentUser(user);
      }
     
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/shop" component={ShopPage}/>
            <Route path="/checkout" component={CheckoutPage}/>
            <Route exact path="/signin" render={() => {
              return this.props.currentUser? (
                <Redirect to='/' />
              ): (
                <SignInAndSignUpPage />
              );
            }}/>
          </Switch>
        </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
