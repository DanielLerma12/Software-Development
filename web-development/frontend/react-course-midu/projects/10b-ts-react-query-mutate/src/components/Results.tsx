import { type CommentWithId } from "../comments";
import "../Results.css";

export const Results = ({ data }: { data?: CommentWithId[] }) => {
  return (
    <ul className="comments-list">
      {data?.map((comment) => (
        <li key={comment.id}>
          <article
            className={`comment-card ${
              comment.preview ? "comment-card--preview" : ""
            }`}
          >
            <h2>{comment.title}</h2>
            <p>{comment.message}</p>
          </article>
        </li>
      ))}
    </ul>
  );
};
