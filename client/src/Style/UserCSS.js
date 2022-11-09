import styled from "@emotion/styled";

const LoginDiv = styled.div`
  width: 50%;
  max-width: 640px;
  margin: 5rem auto 0;
  form {
    width: 90%;
    background-color: #fff;
    padding: 20px;
    margin: 0 auto;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.03), 0 15px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    label {
      font-weight: bold;
    }
    input {
      border-radius: 4px;
      border: 1px solid #c6c6c6;
      padding: 5px;
      margin-bottom: 10px;
      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 4px;
      padding: 5px 10px;
      background-color: black;
      color: white;
      border: 1px solid black;
      margin-top: 10px;
      &:hover {
        background-color: #666;
        border-color: #666;
      }
    }
    button:disabled:hover {
      background-color: black;
    }
    p.errMsg {
      font-size: 0.9em;
      margin-bottom: 3px;
      color: crimson;
      font-weight: bold;
    }
    p.currect {
      font-size: 0.9em;
      margin-bottom: 3px;
      color: green;
      font-weight: bold;
    }
    @media (max-width: 756px) {
      width: 90%;
    }
  }
`;
export default LoginDiv;
