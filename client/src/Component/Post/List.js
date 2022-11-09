import React from "react";
import { ListDiv, ListItem } from "../../Style/ListCSS.js";
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/locale/ko";

function List(props) {
  return (
    <ListDiv>
      {props.PostList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.postNum}`}>
              <p className="title">{post.title}</p>
              <p className="author">
                {moment(post.updatedAt).format("YYYY년 MMM Do dddd LT")}에{" "}
                <strong>{post.author.displayName}</strong> 님이{" "}
                {post.updatedAt === post.createdAt ? "작성" : "수정"}했습니다
              </p>
              <p className="content">{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;
