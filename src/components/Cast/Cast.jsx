import s from './Cast.module.css';

export default function Cast({ cast, imageUrl }) {
    return (
        <ul>
            {cast.map(actor => {
                const { id, name, character, profile_path } = actor;
                return (<li key={id}><img className={s.image} src={`${imageUrl}/${profile_path}`} />
                    <h4>{name}</h4><p>Character: {character}</p></li>);
            })}
        </ul>
    )
}