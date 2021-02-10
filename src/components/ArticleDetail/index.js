import "./styles.css";

import React from "react";

const ArticleDetail = ({articleData}) => {

  const makeArticleExample = (article) => 
  <div>
    <h6>{article.title}</h6>
    <img src={article.pictures.stack.retina}></img>
  </div> 

  return (
    <div className="article-detail-container">
      <h3>{articleData.searchTitle}</h3>
      <div>{articleData.minAverage}</div>
      <div>{articleData.totalAverage}</div>
      <div>{articleData.maxAverage}</div>
      {
        articleData.selectedArticles.map( article => makeArticleExample(article))
      }
    </div>
  );
};

ArticleDetail.displayName = "ArticleDetail";

export default ArticleDetail;
