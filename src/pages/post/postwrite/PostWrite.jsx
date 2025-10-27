import React from 'react';
import { useForm } from 'react-hook-form';

const PostWrite = () => {

  console.log(`${process.env.REACT_APP_BACKEND_URL}/posts/write`)

  const{
  register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}
  } = useForm({mode: "onChange"})
  
  const handleSumbitForm = handleSubmit(async (data) => {
  const{post} = data;

  fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/write`, {
    headers:{
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
    })
  })
  return (
    <div>
      <h1>글작성</h1>
      <form onSubmit={handleSumbitForm}>
      <div>
        <label>
          <input 
            type="text" placeholder="글 제목 입력" name="postTitle"
            {...register("postTitle", {
             required:true
            })}
          />
        </label>
      </div>
      <div>
        <label>
          <input 
            type="text" placeholder="글 내용 입력" name="postContent"
            {...register("postContent", {
              required:true
            })}
          />
        </label>
      </div>
      <div>
        <label>
          <input 
            type="text" placeholder="멤버 아이디 입력" name="memberId"
            {...register("memberId", {
              required:true
            })}
          />
        </label>
      </div>      
      <button disabled={isSubmitting}>글등록</button>
      </form>
    </div>
  );
};

export default PostWrite;