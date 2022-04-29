import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchMovie } from 'services/Api';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
    const [value, setValue] = useState('');
    const [query, setQuery] = useState('');
    const [films, setFilms] = useState([]);
    const {url} = useRouteMatch();

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
        setValue('');
    }

    useEffect(() => {
        if (query === '') {
            return;
        }
        fetchMovie(query).then(films => { setFilms(films.results) });

    }, [query]);

    return (
        <div>
            <form onSubmit={handlSubmit}>
                <input
                    type="text"
                    name="name"
                    // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={value}
                    onChange={handlChange}
                    />
                <button type='submit'>Search</button>
            </form>
            {films && <ul>
                {films.map(film => {
                    const { title, id } = film; 
                    return (<li key={id}><Link to={`${url}/${id}`}>{title}</Link></li>)})}
            </ul>}
        </div>
    )
}