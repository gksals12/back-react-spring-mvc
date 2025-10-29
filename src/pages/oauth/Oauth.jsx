import React from 'react';
import { Link } from 'react-router-dom';

const Oauth = () => {
  return (
    <div>
      <div>
        <Link to={"http://localhost:10000/oauth2/authorization/google"}>구글 로그인</Link>
      </div>
      <div>
        <Link to={"http://localhost:10000/oauth2/authorization/naver"}>네이버 로그인</Link>
      </div>
      <div>
        <Link to={"http://localhost:10000/oauth2/authorization/kakao"}>카카오 로그인</Link>
      </div>
    </div>
  );
};

export default Oauth;