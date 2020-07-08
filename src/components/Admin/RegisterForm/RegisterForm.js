import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification }from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';
 
import './RegisterForm.scss';
// import Password from 'antd/lib/input/Password';


export default function RegisterForm(){

    const minimPassword = 6;

    const [inputs, setInputs] = useState ({
        email:"",
        password:"",
        repeatPassword:"",
        privacyPolicy: false
    });

    const [formValid, setFormValid] =useState ({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const inputValidation =(event) => {
        const { type, name } = event.target;
        if (type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(event.target)
            });
        }

        if (type === 'password') {
            setFormValid({
                ...formValid,
                [name]:minLengthValidation(event.target,minimPassword)
            });
        }

        if (type === 'checkbox') {
            setFormValid({
                ...formValid,
                [name]: event.target.checked
            });
        }

    }

    const changeForm = (event) =>{    
        if(event.target.name === "privacyPolicy"){
            setInputs({
                ...inputs,
                [event.target.name] : event.target.checked
            })
        } else {
            setInputs({
                ...inputs,
                [event.target.name] : event.target.value
            })
        }    
    }

    const register = async (event) => {
        
        const { email, password, repeatPassword, privacyPolicy } = formValid;
        // const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        // const privacyPolicyVal = inputs.privacyPolicy;

        if(!email || !password || !repeatPassword || !privacyPolicy) {
            if(!email){
                notification['error']({
                    message: "Debes introdcir un mail correcto."
                });
            } else if (!password) {
                notification['error']({
                    message: `El password debe tener un minimo de ${minimPassword}.`
                });
            } else if (!repeatPassword) {
                notification['error']({
                    message: `El password debe tener un minimo de ${minimPassword}.`
                });
            } else {          
                notification['error']({
                    message: "Todos los campos son obligatorios."
                });
            }
        } else if(passwordVal !== repeatPasswordVal) {
                notification['error']({
                    message: "Las contraseñas tienen que ser iguales."
                });
        } else {
            const result = await signUpApi(inputs);
            if(!result.ok) {
                notification["error"]({
                    message: result.message
                });
            } else {
                notification["success"]({
                    message: result.message
                });
                resetForm();
            }            
        }

    }

    const resetForm = () => {
        const input = document.getElementsByTagName('input');

        for (let i=0; i<input.length; i++) {
            input[i].classList.remove('success');
            input[i].classList.remove('error');            
        }
        setInputs ({
            email:"",
            repeatPassword:"",
            privacyPolicy: false,
            password:""
        })
        setFormValid({
            email: false,
            repeatPassword: false,
            privacyPolicy: false,
            password: false,
        })
    }

    return (
        <Form className="register-form" onFinish={register} onChange={changeForm}>
            <Form.Item>
                <Input
                    prefix ={<UserOutlined className="register-form__icono-input" style={{ color: "rgba(0,0,0,.25"}}/>}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />                
            </Form.Item>
            <Form.Item>
                <Input
                    prefix ={<LockOutlined className="register-form__icono-input" style={{ color: "rgba(0,0,0,.25"}}/>}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                
                <Input
                    prefix ={<LockOutlined className="register-form__icono-input" style={{ color: "rgba(0,0,0,.25"}}/>}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox 
                    name="privacyPolicy"
                    onChange={inputValidation}
                    checked={inputs.privacyPolicy}
                >
                    He leído y acepto la política de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    )
    
}