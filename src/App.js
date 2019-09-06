import React from 'react';
import axios from 'axios';
import './App.css';

import Navbar from 'react-bootstrap/Navbar'

class MoviesList extends React.Component {
    state = {
        moviesList: ['tt3896198'],
        searchTerm: ''
    };

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.omdbapi.com/?apikey=fa281222&s=${
                    this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { moviesList } = this.state;

        return (
            <div>
				<Navbar>
                <Navbar.Brand><h4 id="head">Movie Search App</h4></Navbar.Brand>
  				<Navbar.Toggle />
					 <form onSubmit={this.search}>
                    <input
                        placeholder="Search for a movie"
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        <i className="fa fa-search" />
                    </button>
                </form>
  				<Navbar.Collapse className="justify-content-end">
    			<Navbar.Text>
      			<h4 id="sign-in"><i class="fa fa-user"></i> Sallabh Kumar  <i class="fa fa-caret-down"></i></h4>
    			</Navbar.Text>
 				</Navbar.Collapse>
				</Navbar>
               
                {moviesList.length > 0 ? (
                    moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                ) : (
                    <p>
                        Couldn't find any movie. Please search again using
                        another search criteria.
                    </p>
                )}
            </div>
        );
    }
}

class MovieCard extends React.Component {
    state = {
        movieData: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=fa281222&i=${
                    this.props.movieID
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
    }

    render() {
        const {
            Title,
            Released,
            Genre,
            Plot,
            Poster,
            imdbRating
        } = this.state.movieData;

        if (!Poster || Poster === 'N/A') {
            return null;
        }

        return (
            <div className="movie-card-container">
                <div className="image-container">
                    <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${Poster})` }}
                    />
                </div>
                <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                        <h1>{Title}</h1>
                        <small>Released Date: {Released}</small>
                    </div>
                    <h4>Rating: {imdbRating} / 10</h4>
                    <p>{Plot && Plot.substr(0, 350)}</p>
                    <div className="tags-container">
                        {Genre && Genre.split(', ').map(g => <span>{g}</span>)}
                    </div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
	
	render(){
		
		return (
			<div className="App">
								
				<MoviesList />
		<footer>
		<p>
		Created by Sallabh
		</p>
	</footer>					
	</div>
		)
		
	}
}

export default App;
