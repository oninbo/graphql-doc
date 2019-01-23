import React, { Component } from 'react';
import './Login.css';
import AuthService from './AuthService';
import { Button } from 'antd';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleFormSubmit(e){
        console.log(`handleFormSubmit`);
        e.preventDefault();

        this.Auth.login(this.state.login,this.state.password)
            .then(res =>{
               this.props.history.replace('/introspect');
            })
            .catch(err =>{
                alert(err);
            })
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="Login e goes here..."
                            name="login"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <Button type="primary" ghost size="large" icon="check" onClick={ this.handleFormSubmit }>SUBMIT</Button>
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}

export default Login;
