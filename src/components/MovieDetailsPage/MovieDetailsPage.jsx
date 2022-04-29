import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Route, useParams, useHistory, useLocation, NavLink, useRouteMatch } from "react-router-dom"
import { fetchMovieById, fetchMovieCredits, fetchMovieReviews } from "services/Api";
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import("components/Cast"));
const Reviews = lazy(() => import("components/Reviews"));

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [reviews, setReviews] = useState([]);

    const {url, path} = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const moviesRef = useRef(location);

    useEffect(() => {
        fetchMovieById(movieId).then(result => {
            setMovie(result);
        });
    }, [movieId]);

    useEffect(() => {
        if (location.pathname !== `${url}/cast`) {
            return;
        }
        fetchMovieCredits(movieId).then(result => { setCast(result) });
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname !== `${url}/reviews`) {
            return;
        }
        fetchMovieReviews(movieId).then(result => { setReviews(result.results) });
    }, [location.pathname]);

    const handlGoBack = () => {
        history.push({ ...moviesRef.current.state });
    }

    let disabled = true;
    if (!!moviesRef.current.state ) {
        disabled = false;
    }
    
    return <>
        {movie && 
            <div>   
                <div className={s.movieCard}>
                    <button disabled={disabled} className={s.button} onClick={handlGoBack}>Go back</button>
                    <div className={s.movieDetails}>
                        <img className={s.movieImage} src={`${movie.poster_path}`} />
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
                        {cast && <Cast cast={cast} />}
                    </Route>
                    <Route path={`${path}/reviews`}>
                        {reviews.length !== 0 ? <Reviews reviews={reviews}/> : "We don't have any reviews for this film."}
                    </Route>
                </Suspense>
            </div>
        }
    </>
}