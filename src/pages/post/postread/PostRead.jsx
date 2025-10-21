import React, { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';

const PostList = () => {
  const{id} = useParams();
  console.log(id)
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/read/${id}`, {
      headers: {
        "Content-Type": "application/json" 
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(json => setPost(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div key={post.id}>
      <h3>제목: {post.postTitle}</h3>
      <p>내용: {post.postContent}</p>
      <p>작성자: {post.memberId}</p>
      <p>조회수: {post.postReadCount}</p>
      <Link to={`/posts/update/${post.id}`}>수정하기</Link>
    </div>
  );
};

export default PostList;
