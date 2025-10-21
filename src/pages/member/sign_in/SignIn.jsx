import React from 'react';
import { useForm } from 'react-hook-form'

const SignIn = () => {
  // console.log(process.env.REACT_APP_BACKEND_URL)

  const {
    register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}
  } = useForm({mode: "onChange"})

  const handleSumbmitForm = handleSubmit(async (data) => {
    const {memberPasswordConfirm, ...member} = data; 

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/login`, {
      headers: {
        "Content-Type" : "application/json"
      },
      method: "POST", 
      body: JSON.stringify(member)
    }).then(res  => res.json())
    .then(console.log)
  })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <div style={{
      width : "400px",
      margin : "0 auto",
    }}>
      <h1>로그인</h1>
      <form onSubmit={handleSumbmitForm}>
        <label>
          <p>이메일</p>
          <input 
            type="text" placeholder='이메일 입력' name='memberEmail' 
            {...register("memberEmail", {
              required : true,
              pattern : {
                value : emailRegex
              }
            })}
          />
         
        </label>
        <label>
          <p>비밀번호</p>
          <input 
            type="text" placeholder='비밀번호 입력' name='memberPassword'
            {...register("memberPassword", {
              required : true,
              pattern : {
                value : passwordRegex
              }
            })}
          />
          {errors && errors?.memberPassword?.type === "required" && (
            <p>비밀번호를 입력하세요.</p>
          )}
          {errors && errors?.memberPassword?.type === "pattern" && (
            <p>소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.</p>
          )}
        </label>
        <button disabled={isSubmitting}>로그인</button>
      </form>
    </div>
  );
};

export default SignIn;