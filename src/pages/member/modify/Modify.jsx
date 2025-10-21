import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

const Modify = () => {
  // console.log(process.env.REACT_APP_BACKEND_URL)
  // 1. email로 id를 찾는 쿼리
  // 2. 회원 정보 조회 id를 이용해서 멤버 정보 가져오는 쿼리
  // 3. 화면 출력 (input의 초기값)
  // 4. 수정버튼 눌렀을 때 수정 컨트롤러 요청
  // 5. 회원 정보를 수정하는 쿼리
  const member = { memberEmail: "test1234@gmail.com" }

  useEffect(() => {
    
    const fetchMember = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/find`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST", 
          body: JSON.stringify(member)
        })

        const data = await response.json();
        const { id, memberEmail, memberName } = data;
        
        reset({
          id : id,
          memberEmail: memberEmail,
          memberPassword: "",
          memberName: memberName
        })
      }

    fetchMember()
  }, [])

  const {
    register, handleSubmit, getValues, reset, formState: {isSubmitting, isSubmitted, errors}
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: 0,
      memberEmail: "",
      memberPassword: "",
      memberName: ""
    }
  })

  const handleSumbmitForm = handleSubmit(async (memberVO) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/modify`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT", 
      body: JSON.stringify(memberVO)
    })
  })

  // 회원 탈퇴
  const fetchDelete = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/unregister`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
      body: JSON.stringify({
        memberEmail: member.memberEmail
      })
    })
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <div style={{
      width : "400px",
      margin : "0 auto",
    }}>
      <h1>회원정보 수정</h1>
      <form onSubmit={handleSumbmitForm}>
        <p>{member.memberEmail}</p>
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
          <p>이름</p>
          <input 
            type="text" placeholder='이름 입력' name='memberName' 
            {...register("memberName", { required : true })}
          />
          {errors && errors?.memberName?.type === "required" && (
            <p>이름을 입력하세요.</p>
          )}
        </label>

        <button disabled={isSubmitting}>정보 수정</button>
      </form>
      <button onClick={fetchDelete}>회원 탈퇴</button>
    </div>
  );
};

export default Modify;