import styled from "styled-components";

const S = {}

S.Label = styled.label`
  position: relative;
  display: block;
  width: 200px;
  height: 200px;

  & .thumb {
    width: 100%;
  }

  & .cancel {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 30px;
  }
`

export default S;