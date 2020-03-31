import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from "../form-input/form-input.component";

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

        this.setState({email: '', password: ''});
    };

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.onSubmit}>
                    <FormInput name="email" type="email" label="email" value={this.state.email} handleChange={this.onChange} required/>
 
                    <FormInput name="password" type="password" label="password" value={this.state.password} handleChange={this.onChange} required/>

                    <CustomButton type="submit">Sign In</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;