import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from "../form-input/form-input.component";
import {auth, signInWithGoogle} from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    };

    onSubmit = event => {
        event.preventDefault();

        const {email, password} = this.state;
        try {
            auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.error("Error while signin" + error);
        }
    };

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.onSubmit}>
                    <FormInput 
                        name="email"
                        type="email" 
                        label="email" 
                        value={this.state.email} 
                        handleChange={this.onChange} 
                        required/>
 
                    <FormInput 
                        name="password" 
                        type="password" 
                        label="password" 
                        value={this.state.password} 
                        handleChange={this.onChange} 
                        required/>
                    <div className='buttons'>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign In With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;