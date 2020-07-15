import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { addMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';
import './AddMenuWebForm.scss';

export default function AddMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb } = props;
    const [menuWebData, setMenuWebData] = useState({});
    setReloadMenuWeb(true);

    const addMenu = (event) => {
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
        }

        if(!finalData || !finalData.url || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son obigatorios."
            });
        } else {
            const accessToken = getAccessTokenApi();
            finalData.active = false;
            finalData.order = 1000;

            addMenuApi(accessToken, finalData).then(response =>{
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setReloadMenuWeb(true);
                setMenuWebData({});
                finalData={};
            }).catch (err =>{
                notification["error"]({
                    message: "Error en el servidor."
                });
            })
        }
    }

    return (
        <div className="add-menu-web-form">
            <AddForm 
                menuWebData = {menuWebData}
                setMenuWebData={setMenuWebData}
                addMenu={addMenu}
            />
        </div>
    );
}

function AddForm(props) {
    const {menuWebData, setMenuWebData, addMenu} = props;

    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{ width: 90 }}
            onChange={e => setMenuWebData({ ...menuWebData, http: e})}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    return (
        <Form className="form-add" onFinish={addMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined className="form-add__icono"/>}
                    placeholder="Título"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Menú
                </Button>
            </Form.Item>
        </Form>
    )
}