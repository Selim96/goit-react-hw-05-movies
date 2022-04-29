import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { fetchMovie } from 'services/Api';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
    const [value, setValue] = useState('');
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
        fetchMovie(value).then(films => { setFilms(films.results) });
        history.push({...location, search: `query=${value}`});
        setValue('');
    }

    const queryParam = new URLSearchParams(location.search).get('query'); 

    useEffect(() => {
        if (!!queryParam) {
            fetchMovie(queryParam).then(films => { setFilms(films.results) });
        }
    }, [queryParam]);

    return (
        <div>
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
            {films && <ul>
                {films.map(film => {
                    const { title, id } = film;
                    return (<li key={id}><Link to={{ pathname: `${url}/${id}`, state: location }}>{title}</Link></li>)
                })}
            </ul>}
        </div>
    );
}