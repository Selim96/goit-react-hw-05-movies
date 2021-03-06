const apiKey = '31fa88440d5a9df0ff15d5c8fde4f8d0';
const origin = 'https://api.themoviedb.org/3';
const imagePathUrl = "https://image.tmdb.org/t/p/w500";

export function fetchTrends() {
    return fetch(`${origin}/trending/all/day?api_key=${apiKey}`).then(resp => {
        if (resp.ok) {
            return resp.json()
        }
        return Promise.reject(new Error(`Something go wrong!`));
        }).then(resp => resp.results).catch(error => console.log(error.message));
}

export function fetchMovie(movie) {
    return fetch(`${origin}/search/movie?api_key=${apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`).then(resp => {
        if (resp.ok) {
            return resp.json()
        }
        return Promise.reject(new Error(`Something go wrong!`));
        }).catch(error => console.log(error.message));
}

export function fetchMovieById(movieId) {
    return fetch(`${origin}/movie/${movieId}?api_key=${apiKey}&language=en-US`).then(resp => {
        if (resp.ok) {
            return resp.json();
        }
        return Promise.reject(new Error(`Something go wrong!`));
    }).then(obj => {
        const { poster_path } = obj;
        const poster = poster_path === null ? '' : `${imagePathUrl}${poster_path}`;
            const results = { ...obj, poster_path: `${poster}`, };
            return results;
        }).catch(error => console.log(error.message));
}

export function fetchMovieCredits(movieId) {
    return fetch(`${origin}/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`).then(resp => {
        if (resp.ok) {
            return resp.json()
        }
        return Promise.reject(new Error(`Something go wrong!`));
        }).then(obj => {
            const arrayActors = obj.cast;
            const results = arrayActors.map(actor => {
                const image = actor.profile_path === null ? '' : `${imagePathUrl}${actor.profile_path}`;
                return { ...actor, profile_path: `${image}`, };
            });
            return results;
        }).catch(error => console.log(error.message));
}

export function fetchMovieReviews(movieId) {
    return fetch(`${origin}/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`).then(resp => {
        if (resp.ok) {
            return resp.json()
        }
        return Promise.reject(new Error(`Something go wrong!`));
        }).catch(error => console.log(error.message));
}