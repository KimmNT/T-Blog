import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1.hygraph.com/v2/cl6zva7u20s5v01uocg5vfz03/master"
);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        authorAva {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

//get all slug
const Sluglist = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(Sluglist);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(query, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 8,
  };
}

function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <img
        src={post.coverPhoto.url}
        alt="cover photo"
        className={styles.cover}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <img src={post.author.authorAva.url} alt="author avatar" />
          <div className={styles.authtext}>
            <h6>By {post.author.name}</h6>
            <h6 className={styles.date}>{post.datePublished}</h6>
          </div>
        </div>
        <h2>{post.title}</h2>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
}

export default BlogPost;
