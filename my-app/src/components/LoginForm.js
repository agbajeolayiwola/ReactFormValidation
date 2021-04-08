import React, {Component} from 'react'
import { objectExpression } from '@babel/types';


const emailRegEx =  RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

const formValid = ({FormError, ...rest}) =>{
    let valid = true;

    /*Object.values(FormError).forEach(val => {val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val=>{
        val === null && (valid = false)
    });*/
    return valid;
}
class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state={
            Email:null,
            Password:null,
            FormError:{
                Email:"",
                Password:"",

            }
        };
    }
    handleSubmit = e =>{
        e.preventDefault();

        if(formValid(this.state.FormError)){
            console.log(`
                Email: ${this.state.Email}
                Password: ${this.state.Password}
            `);
        }else {
            console.error('form Invalid');
        }
    }

    handleChange = e =>{
        e.preventDefault();
        const {name, value} = e.target;
        let FormError = this.state.FormError;

        console.log('Email:', name);
        console.log('Password:', value);

        switch (name){
            case 'Email':
            FormError.Email = emailRegEx.test(value) && value.length > 0
            ?'': 'Invalid Email Address';
            break;
            case 'Password':
            FormError.Password = value.length < 3 && value.length > 0 ? 'Minimum of 3 Characters' : '';
            break;
        }

        this.setState({FormError, [name]: value }, () => console.log());
    };


    render(){

        const {FormError} = this.state
        return(
        <center className="formDiv" id="formDiv"noValidate >
            <form name="formVal" id="form" method="post" onSubmit={this.handleSubmit}>

	            {FormError.Email.length >0 && (
                    <p className="errorMessage">{FormError.Email}</p>
                )}<br/>
	            <input type="text" id="email" className="email" name="Email" placeholder="   Email/Username" noValidate onChange={this.handleChange} />

	            {FormError.Password.length >0 && (
                    <p className="errorMessage">{FormError.Password}</p>
                )}
	            <input type="password" id="pwd" className={FormError.Password.length > 0 ? "error": null} name="Password" placeholder="  password" noValidate onChange={this.handleChange} />

	            <button type="submit" id="submit" onSubmit={this.handleSubmit}>Submit</button>

            </form>
        </center>
        )
    }
}
export default LoginForm;