import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { useDropzone } from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { getAvatarApi, uploadAvatarApi, updateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';
import { UserOutlined, MailOutlined,LockOutlined } from '@ant-design/icons';

import "./EditUserForm.scss";

export default function EditUserForm(props) {

    const { user, setIsVisibleModal, setReloadUsers } = props;
    const [ avatar, setAvatar ] = useState(null);
    const [ userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        });
    }, [user]);

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    },[user]);

    useEffect(() => {
        if(avatar) {
            setUserData({...userData, avatar: avatar.file });
        }
    }, [avatar]);
    
    const updateUser = (event) => {        
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if(userUpdate.password || userUpdate.repeatPassword) {
            if(userUpdate.password !== userUpdate.repeatPassword) {
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales."
                });
            }
            return;
        }

        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
                notification["error"]({
                message: "El nombre, apellidos y email son obligatorios."
            });
            return;
        }

        if(typeof userUpdate.avatar === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName;
                updateUserApi(token, userUpdate, user._id).then(result =>{
                    notification["success"]({message: result.message});
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                });
            });
        } else {
            updateUserApi(token, userUpdate, user._id).then(result =>{
                notification["success"]({message: result.message});
                setIsVisibleModal(false);
                setReloadUsers(true);
            });
          }


    }
    

    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    )
}

function UploadAvatar(props){
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() =>{
        if(avatar) {
            if(avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file)});
        },
        [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    )
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<UserOutlined className="form-edit__icono"/>}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={event => setUserData({ ...userData, name: event.target.value})}
                        />
                </Form.Item>     
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<UserOutlined className="form-edit__icono"/>}
                            placeholder="Apellido"
                            value={userData.lastname}
                            onChange={event => setUserData({ ...userData, lastname: event.target.value})}
                        />
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<MailOutlined className="form-edit__icono"/>}
                            placeholder="Correo Electrónico"
                            value={userData.email}
                            onChange={event => setUserData({ ...userData, email: event.target.value})}
                        />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Select
                        className="form-edit__select"
                        placeholder="Selecciona un rol de usuario"
                        onChange={event => setUserData({ ...userData, role: event})}
                        value={userData.role}
                        >
                        <Option value="admin">Administrador</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="review">Revisor</Option>
                    </Select>
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined className="form-edit__icono"/>}
                            type="password"
                            placeholder="Contraseña"
                            onChange={event => setUserData({ ...userData, password: event.target.value})}
                        />
                    </Form.Item>                
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined className="form-edit__icono"/>}
                            type="password"
                            placeholder="Repetir Contraseña"
                            onChange={event => setUserData({ ...userData, repeatPassword: event.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}