export default function Cast({cast}) {
    return (
        <ul>
            {cast.map(actor => {
                const { id, name, character } = actor;
                return (<li key={id}><img /><h4>{name}</h4><p>Character: {character}</p></li>);
            })}
        </ul>
    )
}