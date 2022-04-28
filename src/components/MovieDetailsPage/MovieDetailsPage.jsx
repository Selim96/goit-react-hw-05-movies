import { useState, useEffect } from "react";
import { useParams, useHistory, NavLink, useRouteMatch } from "react-router-dom"
import { fetchMovieById, fetchMovieImage, fetchMovieCredits, fetchMovieReviews } from "services/Api";
import Cast from "components/Cast";
import Reviews from "components/Reviews";
import s from './MovieDetailsPage.module.css';
import { Route } from "react-router-dom";

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState(null);
    const [image, setImage] = useState(null);
    const [cast, setCast] = useState([]);
    const [reviews, setReviews] = useState([]);

    const {url, path} = useRouteMatch();
    const history = useHistory();
    const {movieId} = useParams();

    useEffect(() => {
        fetchMovieById(movieId).then(result => { setMovie(result) });
        fetchMovieImage(movieId).then(img => { setImage(img) });
        fetchMovieCredits(movieId).then(result => { setCast(result.cast) });
        fetchMovieReviews(movieId).then(result => { setReviews(result.results) });
    }, [movieId]);

    console.log(image);
    
    return <>
        <h2>This is Details page</h2>
        {movie && 
            <div>   
                <div className={s.movieCard}>
                    <button className={s.button} onClick={() => history.goBack()}>Go back</button>
                    <div className={s.movieDetails}>
                        <img className={s.movieImage} src="" />
                        <h3 className={s.movieTitle}>{`${movie.original_title} (${(new Date(movie.release_date)).getFullYear()})`}</h3>
                        <p>User score: {(movie.vote_average) * 10}%</p>
                        <div>
                            <h4 className={s.title}>Overview</h4>
                            <p className={s.movieOverview}>{movie.overview }</p>
                        </div>
                        <div>
                            <h4>Genres</h4>
                            <ul className={s.genresList}>
                                {movie.genres.map(genre => (<li key={genre.id}>{genre.name}</li>))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={s.additionalCard}>
                    <h3>Additional information</h3>
                    <ul>
                        <li><NavLink to={`${url}/cast`}>Cast</NavLink></li>
                        <li><NavLink to={`${url}/reviews`}>Reviews</NavLink></li>
                    </ul>
                </div>
                <Route path={`${path}/cast`}>
                    {cast && <Cast cast={cast}/>}
                </Route>
                <Route path="/movies/:movieId/reviews">
                    {reviews.length !== 0 ? <Reviews reviews={reviews}/> : "We don't have any reviews for this film."}
                </Route>
            </div>
        }
    </>
}