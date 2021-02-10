import { fetchTextData } from "../utils/internetUtils";

const PROXY_GENERAL = "https://dev-leo-cors-anywhere.herokuapp.com/";
const PROXY_WORKER = "https://proxy-worker.leonardo-manzella.workers.dev/corsproxy/?apiurl=";

const MERCADOLIBRE_PAGE_BASE = (term) => `https://electronica.mercadolibre.com.ar/nuevo/capital-federal/${term}_OrderId_PRICE`;
const MERCADOLIBRE_PAGE_MULTI = (term, page) => `https://electronica.mercadolibre.com.ar/nuevo/capital-federal/${term}_Desde_${1+50*(page-1)}_OrderId_PRICE`;

export const getArticleData = async (
    termToFind,
    setArticleData
) => {
    setArticleData(null); //Sets loading screen

    let searchTerm = termToFind.trim();
    searchTerm = termToFind.replace(/ /gm, '-');
    const searchURLs = [
        MERCADOLIBRE_PAGE_BASE(searchTerm),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 2),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 3),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 4),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 5),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 6),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 7),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 8),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 9),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 10),

        MERCADOLIBRE_PAGE_BASE(searchTerm),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 2),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 3),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 4),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 5),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 6),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 7),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 8),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 9),
        MERCADOLIBRE_PAGE_MULTI(searchTerm, 10),
    ];

    let articlesFound = [];
    // TODO transforn to use promises en paralelo para mejorar tiempo de respuesta
    for (let current = 0; current < searchURLs.length; current++) {
        const url = searchURLs[current];
        const results = await parseMLdata(url);
        articlesFound.push(...results);
    }
    articlesFound = articlesFound.filter( article => article.price);
    articlesFound = eliminateUnrelatedItems(articlesFound);
    articlesFound = articlesFound.sort(articleComparator);
    // console.log("articlesFound: ", articlesFound);
  
    let articlesPrice = articlesFound.map( article => article.price.amount || 0);
    const totalAverage = calcAverage(articlesPrice);
    const minAverage = calcAverage(articlesPrice.slice(0,articlesPrice.length* 1/5))
    const maxAverage = calcAverage(articlesPrice.slice(articlesPrice.length * 4/5))
    let selectedArticles = articlesFound.filter( article => Math.abs(article.price.amount - totalAverage <= (totalAverage/5)) );
    selectedArticles = selectedArticles.slice(0, Math.min(9, selectedArticles.length));
    const searchTitle = termToFind[0].toUpperCase() + termToFind.slice(1)

    setArticleData({
        searchTitle: searchTitle,
        minAverage: minAverage,
        totalAverage: totalAverage,
        maxAverage: maxAverage,
        selectedArticles: selectedArticles,
    });
};

const parseMLdata = async (url) => {
    const ONLY = 0;
    try {
        const rawData = await fetchTextData(PROXY_GENERAL + url);
        let selectedText = rawData.match(/{"siteId".*}/,"gm")[ONLY];
        selectedText = JSON.parse(selectedText);
        return (selectedText.initialState && selectedText.initialState.results) || [];
    } catch (error) {
        console.error("=== Error al obtener datos de mercadolibre ===");
        console.error("Url Pedida: ", url);
        console.error(error);
        console.trace();
        return [];
    }
}

const articleComparator = (firstArticle, secondArticle) => {
    if(firstArticle.price.amount > secondArticle.price.amount) return 1;
    return -1;
};

const eliminateUnrelatedItems = (articles) => {
    let articlesPrice = articles.map( article => article.price.amount || 0);
    const estimatedTotalAverage = calcAverage(articlesPrice);
    return articles.filter( article => (article.price.amount > (estimatedTotalAverage/4)) && (article.price.amount < (estimatedTotalAverage*3)));
}

const calcAverage = (articlesFound) => {
    const sumAll = (accumulator, currentValue) => accumulator + currentValue;
    const calculatedValue = articlesFound.reduce(sumAll) / articlesFound.length;
    return parseInt(calculatedValue);
}
