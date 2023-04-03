import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [userMovies, setUserMovies] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/movies')
            .then(response => response.json())
            .then(data => {
                setUserMovies(data)
            })
    },[])
    const newMovie = () => {
        if (title === "") {
            return null
        }
        const movie = {"title": title, 'user_added': true}
        fetch('http://localhost:8080/newMovie', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) alert("New Movie Added")
                })
        }
        const deleteMovie = (e) => {
            const id = {"id": e}
            fetch('http://localhost:8080/newMovie', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id)
                })
                .then(response => response.json())
                .then(data => console.log('something', data))
        }
    return (
        <div>
            <button onClick={() => navigate('/')}>Home</button> <br />
            Enter New Movie Title Here: <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
            <button onClick={newMovie}>Submit</button>
            {userMovies.map((movie, index) => {
                if (movie["user_added"] == true) {
                    return (
                    <div key={index}>
                        <button id={movie.id} onClick={() => deleteMovie(movie.id)}>Delete</button>
                        {movie.title}
                    </div>
            )}
            })}
        </div>
    )
}

export default AddMovie