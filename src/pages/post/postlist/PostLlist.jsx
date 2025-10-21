import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/list`, {
      headers: { 
        "Content-Type": "application/json" 
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>게시글 목록</h1>

      {data.map((post) => (
        <div key={post.id}>
          <ul>
            <li>
              <Link to={`/posts/read/${post.id}`}>제목: {post.postTitle}</Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PostList;
