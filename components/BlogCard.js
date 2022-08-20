import Link from "next/link";
import styles from "../styles/BlogCard.module.css";

export default function BlogPost({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
  content,
}) {
  return (
    <div className={styles.card}>
      <Link href={"/posts/" + slug}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt="Cover picture" />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <img src={author.authorAva.url} alt="author avatar" />
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>{datePublished}</div>
        </div>
      </div>
    </div>
  );
}
