import s from './Cast.module.css';

export default function Cast({ cast }) {
    return (
        <ul>
            {cast.map(actor => {
                const { id, name, character, profile_path } = actor;
                return (<li key={id} className={s.item}><img className={s.image} src={`${profile_path}`} alt={name} width='150'/>
                    <h4>{name}</h4><p className={s.character}>Character: {character}</p></li>);
            })}
        </ul>
    )
}