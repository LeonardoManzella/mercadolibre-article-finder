import React, { useState } from "react"
import ContentLoader from 'react-content-loader'
import ArticleDetail from "../components/ArticleDetail";

import MenuBar from "../components/MenuBar"
import { getArticleData } from "../services/mercadoLibreService";

const App = () => {
  const [articleData, setArticleData] = useState(null);

  /** COLOR PALETTE
  * Background color: #ecebeb
  * Base yellow and normal details: #EDDB15
  * Normal text color: black
  * Extra Background orange: #D6B009
  * Normal highlight or sub-details: #F7B30A
  * One of the upper 2 to use with transparency
  * Special details or smaller highlight radioative green: #96F70A
  */

  /* TODO 
    - Design icon with round circle and big 'B'
    - Error check search or not found if less than 10 articles

    - Share button in price section
    - Add history feature
    - Pensar si mostrar las cosas mas vendidas/buscadas ahora en mercado libre en la home debajo de la barra de busqueda cuando inicia la APP (QUE aporta? visibilidad de aumento de precios? No me engañan pichanga?), seria una pantalla separada de las busquedas en si, autocontenida en si misma, que se muestra hasta la primera busqueda
  */

  const executeSearch = (term) => {
    getArticleData(term, setArticleData);
  }

  const Loader = () => (
    <div style={{overflowX: "hidden"}}>
      <ContentLoader 
        speed={2}
        width={"140%"}
        viewBox="0 0 300 280"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="11" y="14" rx="0" ry="0" width="190" height="11" /> 
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
        ? <ArticleDetail articleData={articleData} />
        : <Loader />
      }
    </>
  )
}

export default App;
