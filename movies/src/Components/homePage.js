import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Nav,
    Navbar,
    NavDropdown,
    Card,
    Form,
    InputGroup,
} from "react-bootstrap";

const HomePage = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [movie_search, setMovie_search] = useState("");
    const [filter, setFilter] = useState("To watch");
    useEffect(() => {
        fetch("http://localhost:8080/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log("hello");
                setMovies(data);
            });
    }, []);
    const watched = (e) => {
        const boolean = { id: e, watched: true };
        fetch("http://localhost:8080/movies", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(boolean),
        })
            .then((response) => response.json())
            .then((data) => setMovies(data.data));
    };
    const toWatch = (e) => {
        const boolean = { id: e, watched: false };
        fetch("http://localhost:8080/movies", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(boolean),
        })
            .then((response) => response.json())
            .then((data) => setMovies(data.data));
    };
    return (
        <>
            <Row>
                <Col></Col>
                <Col className="justify-content-center">
                    <fieldset>
                        <legend>Select a filter</legend>
                        <div>
                            <input
                                type="radio"
                                value="watched"
                                name="filter"
                                id="watched"
                                onChange={() => setFilter("watched")}
                            />
                            <label for="watched">Watched</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="To watch"
                                name="filter"
                                id="To watch"
                                defaultChecked
                                onChange={() => setFilter("To watch")}
                            />
                            <label for="To watch">To Watch</label>
                        </div>
                    </fieldset>
                    <Form.Control
                        placeholder="Search Here"
                        onChange={(e) => setMovie_search(e.target.value)}
                    />
                </Col>
                <Col></Col>
            </Row>
            {filter === "To watch"
                ? movies.map((movie, index) => {
                    if (movie.watched === false) {
                        return (
                            <Row>
                                <Col></Col>
                                <Col className="mx-auto">
                                    <Card
                                        key={index}
                                        style={{ width: "150px" }}
                                        className="text-center"
                                    >
                                        <Card.Text>{movie.title}</Card.Text>
                                        {movie.watched === false ? (
                                            <button onClick={() => watched(movie.id)}>
                                                Watched
                                            </button>
                                        ) : (
                                            <button onClick={() => toWatch(movie.id)}>
                                                Watch Again
                                            </button>
                                        )}
                                    </Card>
                                    <Col></Col>
                                </Col>
                            </Row>
                        );
                    }
                })
                : movies.map((movie, index) => {
                    if (movie.watched === true) {
                        return (
                            <Row>
                                <Col></Col>
                                <Col className="mx-auto">
                                    <Card
                                        key={index}
                                        style={{ width: "150px" }}
                                        className="text-center"
                                    >
                                        <Card.Text>{movie.title}</Card.Text>
                                        {movie.watched === false ? (
                                            <button onClick={() => watched(movie.id)}>
                                                Watched
                                            </button>
                                        ) : (
                                            <button onClick={() => toWatch(movie.id)}>
                                                Watch Again
                                            </button>
                                        )}
                                    </Card>
                                    <Col></Col>
                                    </Col>                                
                            </Row>
                        );
                    }
                })}
            <div>
                {typeof movie_search == typeof ""
                    ? movies
                        .filter((movie) => {
                            if (movie_search === "") {
                                return null;
                            } else if (
                                movie.title.toLowerCase().includes(movie_search.toLowerCase())
                            ) {
                                return movie;
                            }
                        })
                        .map((movie_title) => {
                            return (
                                <div>
                                    <button>{movie_title.title}</button>
                                </div>
                            );
                        })
                    : console.log("yup, im here")}
            </div>
        </>
    );
};

export default HomePage;
