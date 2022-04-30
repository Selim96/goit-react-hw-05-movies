import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { fetchMovie } from 'services/Api';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
    const [status, setStatus] = useState('resolved');
    const [value, setValue] = useState('');
    const [query, setQuery] = useState('');
    const [films, setFilms] = useState([]);

    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();

    function handlChange(e) {
        setValue(e.currentTarget.value.toLowerCase());
    }

    function handlSubmit(e) {
        e.preventDefault();
        if (value.trim() === '') {
            alert('Please, enter film title!');
            return;
        }
        setQuery(value);
        fetchMovie(query).then(films => {
            if (films.results.length === 0) {
                    return Promise.reject(new Error(`We have not any movie with name '${query}'!`));
                }
            setFilms(films.results);
            setStatus('resolved');
            console.log('SUBMIT FETCH!!');
        }).catch(() => {
            console.log('CATCH is done!')
            setStatus('rejected');
            setValue('');
        });
        console.log('SUBMIT click!!');
        history.push({...location, search: `query=${value}`});
        setValue('');
    }

    const queryParam = new URLSearchParams(location.search).get('query'); 
    // console.log(queryParam);

    useEffect(() => {
        if (!!queryParam) {
            console.log('USEEFFECT FETCH!!')
            fetchMovie(queryParam).then(films => { setFilms(films.results) });
        }
    }, [queryParam]);

    return (
        <div className={s.moviePage}>
            <form onSubmit={handlSubmit}>
                <input
                    className={s.input}
                    type="text"
                    name="name"
                    required
                    value={value}
                    onChange={handlChange}
                />
                <button className={s.button} type='submit'>Search</button>
            </form>
            {status === 'resolved' && <ul>
                {films.map(film => {
                    const { title, id } = film;
                    return (<li key={id} className={s.item}><Link to={{ pathname: `${url}/${id}`, state: location }}>{title}</Link></li>)
                })}
            </ul>}
            {status === 'rejected' && <h2 className={s.errorQuery}>{`We have not any movie with name '${query}'!`}</h2>}
        </div>
    );
}