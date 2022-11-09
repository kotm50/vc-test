import styled from "@emotion/styled";
const SecondDiv = styled.div`
  padding-top: 0;
  padding-bottom: 1rem;
  width: 100%;
  margin: 0 auto !important;

  display: block;
  align-content: center;
  align-items: center;

  .search {
    input {
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      border: 1px solid #ced4da;
      width: 100%;
      height: 100%;
      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  @media (max-width: 756px) {
    .search {
      width: auto;
      input {
        width: 100%;
      }
    }
    .btn {
      font-size: 0.75rem;
      margin-left: 1rem;
    }
  }
`;

const CompanyDiv = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #eaeaea;
  padding: 10px;
  div.list {
    background-color: #fff;
    margin: 10px auto;
    padding: 5px 10px;
    div.name {
      text-align: left;
      height: 100%;
      line-height: 200%;
    }
  }
`;

export { CompanyDiv, SecondDiv };
