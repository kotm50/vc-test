import styled from "@emotion/styled";

const ReplyListDiv = styled.div`
  background-color: #fff;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto !important;
  .noReply {
    text-align: center;
    padding: 10px 0;
  }
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ReplyUploadDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;

  form {
    width: 100%;
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-template-rows: 36px;
    @media (max-width: 756px) {
      grid-template-columns: 4fr 1fr;
      grid-template-rows: 36px;
    }
    input {
      padding: 5px;
      height: 100%;
      border: 0.5px solid #c6c6c6;

      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
      height: 100%;
      border: 0.5px solid #c6c6c6;
      font-weight: bold;
      background-color: #c6c6c6;
      &:hover,
      &:active {
        border: 0.5px solid darkgrey;
        background-color: darkgrey;
      }
    }
  }

  .cancel {
    display: flex;
    justify-content: flex-end;
    button {
      margin-top: 5px;
      font-size: 12px;
      border-radius: 10px;
      padding: 5px;
      border: 1px solid #c6c6c6;
    }
  }
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ReplyContentDiv = styled.div`
  padding: 10px 10px 9px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  flex-wrap : wrap;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto !important;
  div {
    padding: 5px 0;
  }
  .auth {
    width: 90%;
    margin-right: 10px;
    font-weight: bold;
    font-size: 0.9rem;
    color:#666;
    line-height: 1.2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content {
    width: 100%;
    margin-right: 10px;
    line-height: 1.2em;
  }
  .modalControl {
    width: calc(10% - 10px);
    text-align:right;
    padding-right:10px;
    min-width: 10px;
    line-height: 0.5em;
    cursor: pointer;
    position: relative;
    span {
      user-select: none;
      display:block;
      width:100%;
      height:1.2em;
    }
    .modalDiv {
      position: absolute;
      top: 16px;
      right: 10px;
      width: 80px;
      height: 60px;
      overflow: hidden;
      padding: 10px;
      cursor: auto;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-between;
      align-items: center;
      font-size:0.8em;
      background-color: whitesmoke;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.03),
        0px 7.5px 6px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      div {
        color: black;
        margin-bottom: 5px;
        cursor: pointer;
        &.delete {
          color: red;
        }
      }
    }
  @media (max-width: 756px) {
    width: 90%;
  }
`;

export { ReplyListDiv, ReplyUploadDiv, ReplyContentDiv };
