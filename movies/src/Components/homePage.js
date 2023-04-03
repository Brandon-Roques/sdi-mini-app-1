import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [movie_search, setMovie_search] = useState("");
    const [filter, setFilter] = useState('To watch')
    // const [watchedMovies, setWatchedMovies] = useState([]);
    // const [toWatch, setToWatch] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/movies')
            .then(response => response.json())
            .then(data => {
                console.log('hello')
                setMovies(data)
            })
    }, []);
    const watched = (e) => {
        const boolean = { id: e, watched: true }
        fetch('http://localhost:8080/movies', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boolean)
        })
            .then(response => response.json())
            .then(data => setMovies(data.data))
    }
    const toWatch = (e) => {
        const boolean = { id: e, watched: false }
        fetch('http://localhost:8080/movies', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boolean)
        })
            .then(response => response.json())
            .then(data => setMovies(data.data))
    }
    return (
        <div className="home">
            <button onClick={() => navigate('/addMovie')}>Add Movie</button>
            {console.log('filter', filter)}
            <fieldset>
                <legend>Select a filter</legend>
                <div>
                    <input type='radio' value='watched' name='filter' id='watched' onChange={() => setFilter('watched')} />
                    <label for='watched'>Watched</label>
                </div>
                <div>
                    <input type='radio' value='To watch' name='filter' id='To watch' defaultChecked onChange={() => setFilter('To watch')} />
                    <label for='To watch'>To Watch</label>
                </div>
            </fieldset>
            {filter === 'To watch' ? movies.map((movie, index) => {
                if (movie.watched === false) {
                    return (
                        <div key={index}>
                            {movie.title}
                            {movie.watched === false ? <button onClick={() => watched(movie.id)}>Watched</button> : <button onClick={() => toWatch(movie.id)}>Watch Again</button>}
                        </div>
                    )
                }
            }) : movies.map((movie, index) => {
                if (movie.watched === true) {
                    return (
                        <div key={index}>
                            {movie.title}
                            {movie.watched === false ? <button onClick={() => watched(movie.id)}>Watched</button> : <button onClick={() => toWatch(movie.id)}>Watch Again</button>}
                        </div>
                    )
                }
            })}

            <input type="text" placeholder='Search Here' onChange={(e) => setMovie_search(e.target.value)} />
            <div>
                {typeof movie_search == typeof "" ? movies.filter(movie => {
                    if (movie_search === "") {
                        return null
                    } else if (movie.title.toLowerCase().includes(movie_search.toLowerCase())) {
                        return movie
                    }
                }).map(movie_title => {
                    return (
                        <div>
                            <button>{movie_title.title}</button>
                        </div>
                    )
                }) : console.log('yup, im here')}
            </div>
        </div>
    );
}

export default HomePage;