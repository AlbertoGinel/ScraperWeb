import React from "react";

const ArticleElement = ({ item }) => {
  console.log(item);

  return (
    <div>
      <p>{item.title}</p>
      <div>
        <p>Rank: {item.rank}</p>
        <p>Comments: {item.comments}</p>
        <p>Points: {item.points}</p>
      </div>
      <hr />
    </div>
  );
};

export default ArticleElement;
