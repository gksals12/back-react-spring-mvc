import React from 'react';
import { useForm } from 'react-hook-form'

const SignUp = () => {
  // console.log(process.env.REACT_APP_BACKEND_URL)

  const {
    register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}
  } = useForm({mode: "onChange"})

  const handleSumbmitForm = handleSubmit(async (data) => {
    const {memberPasswordConfirm, ...member} = data; 

    fetch(`${process.env.REACT_APP_BACKEND_URL}/members/register`, {
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST", 
      body: JSON.stringify(member)
    })
  })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <div style={{
      width : "400px",
      margin : "0 auto",
    }}>
      <h1>회원가입</h1>
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
          {errors && errors?.memberEmail?.type === "required" && (
            <p>이메일을 입력하세요.</p>
          )}
          {errors && errors?.memberEmail?.type === "pattern" && (
            <p>이메일 양식에 맞게 입력해주세요.</p>
          )}
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
        <label>
          <p>비밀번호 확인</p>
          <input 
            type="text" placeholder='비밀번호 확인' name='memberPasswordConfirm'
            {...register("memberPasswordConfirm", {
              required : true,
              validate : {
                matchPassword : (memberPasswordConfirm) => {
                  const { memberPassword } = getValues();
                  console.log(memberPassword, memberPasswordConfirm, memberPassword === memberPasswordConfirm)
                  return memberPassword === memberPasswordConfirm
                }
              }
            })}
          />
          {errors && errors?.memberPasswordConfirm?.type === "matchPassword" && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
        </label>

         <label>
          <p>이름</p>
          <input 
            type="text" placeholder='이름 입력' name='memberName' 
            {...register("memberName", { required : true })}
          />
          {errors && errors?.memberName?.type === "required" && (
            <p>이름을 입력하세요.</p>
          )}
        </label>

        <button disabled={isSubmitting}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;