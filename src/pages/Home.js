import React, { useState, useEffect } from 'react';
import BookCard from '../components/Card';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import CountUp from 'react-countup';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs));
        firebase.getUserCount().then((count) => setUserCount(count));
        setIsLoggedIn(firebase.isLoggedIn);
    }, [firebase]);

    const loggedOutContent = (
        <Container className="d-flex justify-content-center align-items-center vh-100 text-center">
            <div>
                <h3 className="display-4">Welcome to Our Site!</h3>
                <p className="fs-5">Please log in or register to explore more.</p>
            </div>
        </Container>
    );

    const handleViewUsers = () => {
        navigate('/users');
    };

    return (
        <Container className="mt-5">
            {isLoggedIn ? (
                <>
                    <Row className="justify-content-center mb-4">
                        <Col xs={12} md={6}>
                            <Card className="text-center mx-auto shadow-sm" style={{ maxWidth: '300px' }}>
                                <Card.Body>
                                    <Card.Title>User Count</Card.Title>
                                    <Card.Text className="d-flex justify-content-center" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                                        <CountUp end={userCount} duration={2.75} />+
                                    </Card.Text>
                                    <Button variant="primary" onClick={handleViewUsers}>View Users</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {books.length > 0 ? (
                        books.map((book, index) => (
                            index % 4 === 0 && (
                                <Row key={index} className="mb-4">
                                    {books.slice(index, index + 4).map((book) => (
                                        <Col key={book.id} xs={12} sm={6} md={3}>
                                            <BookCard id={book.id} {...book.data()} />
                                        </Col>
                                    ))}
                                </Row>
                            )
                        ))
                    ) : (
                        <div>No books available.</div>
                    )}
                </>
            ) : (
                loggedOutContent
            )}
        </Container>
    );
}

export default HomePage;
