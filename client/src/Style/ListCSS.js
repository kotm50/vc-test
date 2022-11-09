import styled from "@emotion/styled";

const ListDiv = styled.div`
  padding: 1rem 0;
  max-width: 756px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  width: 100%;
  height: auto;
  min-height: 120px;
  background: #fff;
  margin: 5vh auto;
  padding: 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);

  div.grid {
    display: grid;
    grid-template-columns: 100px calc(100% - 100px);
    div {
    }
  }
  div {
    margin-right: 10px;
  }
  .title {
    font-size: 1.5em;
  }
  .author {
    font-size: 0.9em;
    text-align: right;
  }

  a {
    color: black;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
  p.content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
`;

const ListItemDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: start;
  flex-direction: column;
  div.author {
    text-align: right;
    margin-top: 10px;
    margin-right: 0;
  }
`;

const Avatar = styled.div`
  max-width: 100px;
  margin-right: 10px;
  height: auto;
  img {
    width: 100%;
  }
`;

const MoreItem = styled.div`
  border-top: 1px solid #eaeaea;
  margin-top: 10px;
  padding-top: 10px;
  width: 100%;
  .btns {
    margin: 10px auto;
    width: 100%;
    text-align: right;
    display: flex;
    flex-wrap: wrap;
    .btn {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
`;

const SecondListDiv = styled.div`
  padding: 1rem 0;
  max-width: 756px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const SecondListItem = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  margin: 5vh auto;
  padding: 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);

  display: flex;

  div {
    margin-right: 10px;
  }
  .title {
    font-size: 1.5em;
  }
  .author {
    font-size: 0.9em;
    text-align: right;
  }

  a {
    color: black;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
  p.content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
`;

const SecondListItemDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: start;
  flex-direction: column;
  div {
    margin: 5px 0;

    font-size: 0.9rem;
  }
  div.author {
    text-align: right;
    margin-top: 10px;
    margin-right: 0;
  }
`;

export {
  ListDiv,
  ListItem,
  ListItemDiv,
  Avatar,
  MoreItem,
  SecondListDiv,
  SecondListItem,
  SecondListItemDiv,
};
