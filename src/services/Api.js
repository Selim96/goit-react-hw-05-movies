const apiKey = '31fa88440d5a9df0ff15d5c8fde4f8d0';
const origin = 'https://api.themoviedb.org/3';

export function fetchTrends() {
    
    return fetch(`${origin}/trending/all/day?api_key=${apiKey}`).then(resp => {
        if (resp.ok) {
            return resp.json()
        }
        return Promise.reject(new Error(`Something go wrong!`));
        }).then(resp => resp.results).catch(error => console.log(error.message));
    
}

export function fetchMovieById(movieId) {
    
    return fetch(`${origin}/movie/${movieId}?api_key=${apiKey}`).then(resp => {
        if (resp.ok) {
            return resp.json()
        }
        return Promise.reject(new Error(`Something go wrong!`));
        }).then(resp => resp.results).catch(error => console.log(error.message));
    
}