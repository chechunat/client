import React, { useState, useEffect } from 'react';
import { Form,Input, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';


import './EditMenuWebForm.scss';

export default function EditMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
    const [menuWebData, setMenuWebData] = useState(menu);
    // setReloadMenuWeb(true);

    useEffect(() =>{
        setMenuWebData(menu);
    },[menu]);

    const editMenu = (event) => {
        if(!menuWebData.title || !menuWebData.url) {
            notification["error"]({
                message:"Todos los campos son obligatorios."
            });
        } else {
            const accessToken = getAccessTokenApi();
            updateMenuApi(accessToken,menuWebData._id,menuWebData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                })
                .catch(() =>{
                    notification["error"]({
                        message: "Error del servidor, inténtelo más tarde."
                    });
                });
        }
    }

    return (
        <div className="edit-menu-web-form">
            <EditForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu={editMenu}
            />
        </div>
    )

}

function EditForm(props) {
    const { menuWebData, setMenuWebData, editMenu } = props;
    return (
        <Form className="form-edit" onFinish={editMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined className="form-edit__icono"/>}
                    placeholder="Título"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined className="form-edit__icono"/>}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Menú
                </Button>
            </Form.Item>
        </Form>
    )
}