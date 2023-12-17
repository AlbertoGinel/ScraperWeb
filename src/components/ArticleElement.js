import React from "react";

const ArticleElement = ({ item }) => {
  return (
    <div className="flex flex-col p-4 border rounded mb-4">
      <p className="text-lg font-bold mb-2">{item.title}</p>
      <div className="flex mb-2">
        <p className="text-sm mr-4">Rank: {item.rank}</p>
        <p className="text-sm mr-4">Comments: {item.comments}</p>
        <p className="text-sm">Points: {item.points}</p>
      </div>
      <hr className="border-t my-4" />
    </div>
  );
};

export default ArticleElement;
