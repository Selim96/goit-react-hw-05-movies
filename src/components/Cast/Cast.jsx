import s from './Cast.module.css';
import noImage from '../imeges/noimage.png';

export default function Cast({ cast }) {
    return (
        <ul>
            {cast.map(actor => {
                const { id, name, character, profile_path } = actor;
                return (<li key={id} className={s.item}><img className={s.image} src={!!profile_path ? `${profile_path}` : noImage} alt={name} width='150'/>
                    <h4>{name}</h4><p className={s.character}>Character: {character}</p></li>);
            })}
        </ul>
    )
}