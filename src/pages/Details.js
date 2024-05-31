import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, [params.bookId, firebase]);

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data, firebase]);

    if (data == null) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" />
        </Container>
    );

    return (
        <Container className="mt-5">
            <Row>
                <Col xs={12} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title as="h1" className="mb-4">{data.name}</Card.Title>
                            <div className="d-flex justify-content-center">
                                <Card.Img 
                                    variant="top" 
                                    src={url} 
                                    alt="Book Cover" 
                                    className="img-fluid rounded" 
                                />
                            </div>
                            <Card.Text as="h2" className="mt-4">Details</Card.Text>
                            <p><strong>Price:</strong> Rs. {data.price}</p>
                            <p><strong>ISBN Number:</strong> {data.isbn}</p>
                            <Card.Text as="h2">Owner Details</Card.Text>
                            <p><strong>Name:</strong> {data.displayName}</p>
                            <p><strong>Email:</strong> {data.userEmail}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetailPage;
