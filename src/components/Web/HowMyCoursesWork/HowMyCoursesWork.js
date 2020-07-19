import React from 'react'
import { Row, Col, Card } from 'antd';
import {    ClockCircleOutlined, KeyOutlined, MessageOutlined, 
            UserOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';

import './HowMyCoursesWork.scss';

export default function HowMyCoursesWork() {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className="how-my-courses-work__title">
                <h2>Como funcionan mis cursos</h2>
                <h3>
                    Cada curso cuenta con contenido bajo la web de udemy, 
                    activa las 24 horas al día, los 365 días del año.
                </h3>
            </Col> 
        
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo
                            icon= {<ClockCircleOutlined/>}
                            title="Cursos y Clases"
                            description="Cursos de entre 10 y 30 horas y cada clase del curso
                            con duración máxima de 15 minutos."
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<KeyOutlined />}
                            title="Acceso 24/7"
                            description="Accede al curso en cualquier momento, desde cualquier 
                            lugar sin importar la hora."
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<MessageOutlined/>}
                            title="Aprendizaje colabrativo"
                            description="Aprende de los demás, dejando tus dudas para que los
                            profesor@s y compañer@s puedan ayudarte."
                        />
                    </Col>
                </Row>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo
                            icon={<UserOutlined/>}
                            title="Mejora tu perfil"
                            description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones."
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<DollarOutlined/>}
                            title="Precios bajos"
                            description="Obtén el curso que necesitas por sólo 9.99€ y ten acceso ilimitado."
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<CheckCircleOutlined/>}
                            title="Certificados de finalización"
                            description="Al completar el curso recibirás un certificado."
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
        </Row>
    )
}


function CardInfo(props) {
    const { icon, title, description } = props;
    const { Meta } = Card;

    return (
        <Card className="how-my-courses-work__card">            
            {icon} 
            <Meta title={title} description={description} />
        </Card>
    )

}