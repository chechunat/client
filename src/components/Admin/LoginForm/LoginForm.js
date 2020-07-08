import React, { useState } from 'react';
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

import "./LoginForm.scss";

export default function LoginForm() {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm = (event) =>{
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    const login = async (event) =>{

        const result = await signInApi(inputs);        

        // Si sale un mensaje es que hay un error...
        if (result.message) {
            notification["error"] ({
                message: result.message
            });
        } else {
            const {accessToken, refreshToken } = result; //Desestructuramos el resultado y traemos las variables
            localStorage.setItem(ACCESS_TOKEN, accessToken); // Guardamos el valor en localStorage
            localStorage.setItem(REFRESH_TOKEN, refreshToken); // Guardamos el valor en localStorage
            //sacamos un mensaje para decir que se ha logueado correctamente.
            notification["success"] ({
                message: "login correcto."
            });

            //enviamos al usuario al panel de administrador
            window.location.href = "/admin";
        }

        console.log(result);
    }

    return (
            <Form className="login-form" onChange={changeForm} onFinish={login}>
                <Form.Item>
                    <Input
                        prefix = {<UserOutlined className="login-form__icono-input" style={{color:"rga(0,0,0,.25"}}/>}
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        className="login-form__input"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix = {<LockOutlined className="login-form__icono-input" style={{color:"rga(0,0,0,.25"}}/>}
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="login-form__input"
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="login-form__button">
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
    );
}