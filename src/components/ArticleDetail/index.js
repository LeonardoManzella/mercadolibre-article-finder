import "./styles.css";

import React from "react";

const ArticleDetail = ({articleData}) => {

  const makeArticleExample = (article) => 
  <a key={article.permalink} href={article.permalink} 
  target="_blank"
  rel="noopener noreferrer"
  className="article-detail-example-container" augmented-ui="br-clip bl-clip exe">
    <div className="article-detail-example-title">{article.title}</div>
    <img className="article-detail-example-img" alt="" src={article.pictures.stack.retina}></img>
  </a> 

  return (
    <div className="article-detail-page">
      <div className="article-detail-container" augmented-ui="tr-clip tl-clip exe">
        <div className="article-detail-title">{articleData.searchTitle}</div>
        <div className="article-detail-small-average">Minimo: $ {articleData.minAverage}</div>
        <div className="article-detail-big-average">Promedio: $ {articleData.totalAverage}</div>
        <div className="article-detail-small-average">Máximo: $ {articleData.maxAverage}</div>
      </div>
      <div className="article-detail-examples">
        {
          articleData.selectedArticles.map( article => makeArticleExample(article))
        }
      </div>
    </div>
  );
};

ArticleDetail.displayName = "ArticleDetail";

export default ArticleDetail;
