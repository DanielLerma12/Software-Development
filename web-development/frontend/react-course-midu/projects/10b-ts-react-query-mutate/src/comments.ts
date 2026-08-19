export interface Comment {
  title: string;
  message: string;
  preview?: boolean;
  id?: string;
}

export interface CommentWithId extends Comment {
  id: string;
}

export const getComments = async () => {
  const response = await fetch("http://localhost:1236/comments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("Error en el fetch");
  }

  const json = await response.json();

  return json;
};

export const postComment = async (comment: Comment) => {
  const id = crypto.randomUUID();
  const newComment = { ...comment, id };

  const response = await fetch("http://localhost:1236/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error("Failed to post comment.");
  }

  return newComment;
};
