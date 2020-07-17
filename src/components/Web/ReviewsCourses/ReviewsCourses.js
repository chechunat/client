import React from 'react';
import { Row, Col, Card, Avatar } from 'antd';
import AvatarPersona1 from '../../../assets/img/avatares/avatarChica1.png';
import AvatarPersona2 from '../../../assets/img/avatares/avatarChico1.png';
import AvatarPersona3 from '../../../assets/img/avatares/avatarMonkey.png';

import './ReviewsCourses.scss';

export default function ReviewsCourses() {
    return (
        
        <Row className="reviews-courses">
            <Col lg={4} />
            <Col lg={16} className="reviews-courses__title">
                <h2>Forma parte de los +35 estudiantes que están aprenciendo con mis cursos</h2>
            </Col>
            <Col lg={4} />        
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReviews 
                                name="Alonso Campos"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona2}
                                review="Un gran curso, con unas explicaciones fantásticas."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReviews 
                                name="Francisco Pérez"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona2}
                                review="Un curso muy ameno, el profesor ayuda cuando lo necesitas."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReviews 
                                name="Maria de la O"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona3}
                                review="No me esperaba que estuviera tan bien, la verdad es que ha superado
                                mis espectativas."
                            />
                        </Col>
                    </Row>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReviews 
                                name="Erin Gonzalez"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona1}
                                review="Muy entretenido, la verdad es que me lo he pasaso en grande."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReviews 
                                name="Marc de Abajo"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona3}
                                review="Pues no me he enterado mucho del curso, demasiado nivel para mi."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReviews 
                                name="Emma Watson"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona1}
                                review="Uno de los mejores cursos que he hecho ha sido aquí."
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>
        </Row>
        
    );
}

function CardReviews(props) {
    const { name, subtitle, avatar, review } = props;
    const { Meta } = Card
    return (
        <Card className="reviews-courses__card">
            <p>{review}</p>
            <Meta
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
    )
}