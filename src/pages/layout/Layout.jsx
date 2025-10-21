import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      레이아웃
      <header style={{
        display: "flex",
        gap: "10px",
        padding: "0 10px"
      }}>
        <Link to={"/"}>홈</Link>
        <Link to={"/members/sign-in"}>로그인</Link>
        <Link to={"/members/modify"}>회원정보 수정</Link>
        <Link to={"/members/sign-up"}>회원가입</Link>
        <Link to={"/posts/list"}>게시판</Link>
        <Link to={"/posts/write"}>글작성</Link>
      </header>
      <main>
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;