import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { useParams, useHistory, useLocation, NavLink, useRouteMatch } from "react-router-dom"
import { fetchMovieById, fetchMovieCredits, fetchMovieReviews } from "services/Api";
import s from './MovieDetailsPage.module.css';
import { Route } from "react-router-dom";

const Cast = lazy(() => import("components/Cast"));
const Reviews = lazy(() => import("components/Reviews"));

const imagePathUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [reviews, setReviews] = useState([]);

    const {url, path} = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const moviesRef = useRef(location);
    const queryParam = new URLSearchParams(location.search).get('query'); 
    console.log("location:", location);
    console.log("history:", history);

    useEffect(() => {
        fetchMovieById(movieId).then(result => { setMovie(result) });
        fetchMovieCredits(movieId).then(result => { setCast(result.cast) });
        fetchMovieReviews(movieId).then(result => { setReviews(result.results) });
    }, [movieId]);

    useEffect(() => {
        
    }, [queryParam])

    const handlGoBack = () => {
        history.push({ ...moviesRef.current.state });
    }
    
    return <>
        {movie && 
            <div>   
                <div className={s.movieCard}>
                    <button className={s.button} onClick={handlGoBack}>Go back</button>
                    <div className={s.movieDetails}>
                        <img className={s.movieImage} src={`${imagePathUrl}/${movie.poster_path}`} />
                        <h3 className={s.movieTitle}>{`${movie.original_title} (${(new Date(movie.release_date)).getFullYear()})`}</h3>
                        <p>User score: {(movie.vote_average) * 10}%</p>
                        <div>
                            <h4 className={s.title}>Overview</h4>
                            <p className={s.movieOverview}>{movie.overview }</p>
                        </div>
                        <div>
                            <h4>Genres</h4>
                            <ul className={s.genresList}>
                                {movie.genres.map(({id, name, }) => (<li key={id}>{name}</li>))}
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
                <Suspense fallback={<h2>Loading, upload...</h2>}>
                    <Route path={`${path}/cast`}>
                        {cast && <Cast cast={cast} imageUrl={imagePathUrl}/>}
                    </Route>
                    <Route path={`${path}/reviews`}>
                        {reviews.length !== 0 ? <Reviews reviews={reviews}/> : "We don't have any reviews for this film."}
                    </Route>
                </Suspense>
            </div>
        }
    </>
}