import React, { useRef, useState } from 'react';
import S from './style';

const File = () => {

  const [fileNames, setFileNames] = useState([`${process.env.PUBLIC_URL}/assets/images/profile.jpg`])
  const [formData, setFormData] = useState(new FormData());

  const onChangeToUploadFile = (e) => {
    const formData = new FormData();
    let names = [];
    for(let file of Array.from(e.target.files)){
      names.push(file.name)
      formData.append("uploadFile", file)
    }
    setFormData(formData)
    fetch("http://localhost:10000/file/upload", {
        method: "POST",
        body: formData
    })
    .then((res) => res.json())
    .then((uuids) => {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      month = month < 10 ? '0' + month : month;
      date = date < 10 ? '0' + date : date;
      setFileNames(uuids.map((uuid, i) => `http://localhost:10000/file/display?fileName=${year}/${month}/${date}/t_${uuid}_${names[i]}`))
      formData.append("uuid", uuids)
    })
    .catch(console.error)
  }

  const onClickToSubmitFiles = async (e) => {
    await fetch("http://localhost:10000/member/mypage", {
      method : "POST",
      body: formData
    })
  }

  return (
    <div>
      <div className='image-wrap'>
        {fileNames.map((fileName) => (
            <S.Label htmlFor="profile1">
              <img className="thumb" src={fileName} alt="디폴트 썸네일" />
              <img className="cancel" src={`${process.env.PUBLIC_URL}/assets/images/cancel.png`} alt="디폴트 썸네일" />
            </S.Label>
        ))}
      </div>
      <div className='inputs'>
        <input type="file" id="profile1" multiple onChange={onChangeToUploadFile} />
      </div>
      <button onClick={onClickToSubmitFiles}>수정 완료</button>
    </div>
  );
};

export default File;