import { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import {fetchTrends} from "services/Api";

export default function HomePage() {
    const [films, setFilms] = useState([]);
    const { url } = useRouteMatch();
    const location = useLocation();

    useEffect(() => {
        fetchTrends().then(films =>
        setFilms([...films]))
    }, [])
    
    
    return (
        <div>
            <h2>Trending today</h2>
            <ul>
                {films.map(({id, title, name}) => (
                    <li key={id}><Link to={{pathname:`${url}movies/${id}`, state: location,}}>{title || name}</Link></li>
                ))}
            </ul>
        </div>
    )
}