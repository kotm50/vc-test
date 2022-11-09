import styled from "@emotion/styled";

const ApplyDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const ApplyForm = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  textarea {
    min-height: 200px;
    resize: none;
    border-radius: 0.25rem;
    border: 1px solid #dedede;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 15px;
      background-colip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
        background-color:#eaeaea
        border-radius:15px;
        box-shadow: inset 0px 0p 5px whitesmoke;
    }
  }
  label {
    font-weight:bold;
    margin-top:10px;
    margin-bottom:3px;
  }
`;

const ApplyButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    background-color: black;
    color: white;
    border: 1px solid black;
    &:hover {
      background-color: #fff;
      color: black;
      border: 1px solid black;
      font-weight: bold;
    }
    &.cancel {
      margin-right: 10px;
      background-color: #fff;
      color: black;
      border: 1px solid black;
      font-weight: bold;
      &:hover {
        background-color: black;
        color: white;
        border: 1px solid black;
      }
    }
  }
`;

const Secondary = styled.div`
  font-size: 0.9rem;
`;
export { ApplyDiv, ApplyButtonDiv, ApplyForm, Secondary };
