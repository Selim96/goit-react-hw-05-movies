import s from './Reviews.module.css';

export default function Reviews({ reviews }) {
    return (
        <ul className={s.reviewsList}>
            {reviews.map(rev => {
                const { author, content, } = rev;
                return (<li className={s.reviewItem} key={author}><h4>Author: {author}</h4><p>{content}</p></li>);
            })}
        </ul>
    )
}