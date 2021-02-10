import React, { useState } from "react"
import ContentLoader from 'react-content-loader'

import MenuBar from "../components/MenuBar"
import { getArticleData } from "../services/mercadoLibreService";

const App = ({ }) => {
  const [articleData, setArticleData] = useState(null);

  /* TODO 
    - Focus on parse data from MercadoLibre
  */

  const executeSearch = (term) => {
    getArticleData(term, setArticleData);
  }

  const Loader = () => (
    <div style={{overflowX: "hidden"}}>
      <ContentLoader 
        speed={2}
        width={"130%"}
        viewBox="0 0 300 280"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="11" y="14" rx="0" ry="0" width="212" height="11" /> 
        <rect x="12" y="31" rx="0" ry="0" width="18" height="58" /> 
        <rect x="39" y="51" rx="0" ry="0" width="103" height="17" /> 
        <rect x="39" y="74" rx="0" ry="0" width="84" height="9" /> 
        <rect x="39" y="35" rx="0" ry="0" width="84" height="9" /> 
        <rect x="77" y="100" rx="0" ry="0" width="60" height="55" /> 
        <rect x="11" y="100" rx="0" ry="0" width="60" height="55" /> 
        <rect x="141" y="100" rx="0" ry="0" width="60" height="55" /> 
        <rect x="77" y="158" rx="0" ry="0" width="60" height="55" /> 
        <rect x="11" y="158" rx="0" ry="0" width="60" height="55" /> 
        <rect x="141" y="158" rx="0" ry="0" width="60" height="55" />
        <rect x="77" y="220" rx="0" ry="0" width="60" height="55" /> 
        <rect x="11" y="220" rx="0" ry="0" width="60" height="55" /> 
        <rect x="141" y="220" rx="0" ry="0" width="60" height="55" />
      </ContentLoader>
    </div>
  )

  return (
    <>
    <MenuBar executeSearch={executeSearch} setArticle={setArticleData} />
      { articleData
        ? <></>
        : <Loader />
      }
    </>
  )
}

export default App;
