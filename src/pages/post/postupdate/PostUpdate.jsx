import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const PostUpdate = () => {
  const{id} = useParams();
  const[post, setPost] = useState([]);
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
  },[])
    const {
      register, handleSubmit, getValues, reset, formState: {isSubmitting, isSubmitted, errors}
    } = useForm({
      mode: "onChange",
      defaultValues: {
        postTitle: "",
        postContent: "",
      }
    })

    const handleSumbmitForm = handleSubmit(async (postVO) => {
      const updatedPost = { ...postVO, id: post.id };
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/update`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(updatedPost)
      })
    })

    const fetchDelete = async () => {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/delete/${id}`,{
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE",
      })
    }

  return (
    <div>
      <h3>회원정보 수정</h3>
      <form onSubmit={handleSumbmitForm}>
        <div>
          <input 
            type="text" placeholder={post.postTitle} name='postTitle'
            {...register("postTitle", {required : true})}
          />
        </div>
        <div>
          <input 
            type="text" placeholder={post.postContent} name='postContent'
            {...register("postContent", {required : true})}
          />
        </div>

        <button disabled={isSubmitting}>정보수정</button>
      </form>
      <button onClick={fetchDelete}>글삭제</button>
    </div>
  );
};

export default PostUpdate;