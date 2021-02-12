import { HISTORY } from "../constants/storage";
import { fetchTextData } from "../utils/internetUtils";
import { getLocalStorageUtils } from "../utils/localStorageUtils";

const PROXY_GENERAL = "https://dev-leo-cors-anywhere.herokuapp.com/";
// const PROXY_WORKER = "https://proxy-worker.leonardo-manzella.workers.dev/corsproxy/?apiurl=";

const MERCADOLIBRE_PAGE_BASE = (term) => `https://listado.mercadolibre.com.ar/nuevo/capital-federal/${term}_OrderId_PRICE`;
const MERCADOLIBRE_PAGE_MULTI = (term, page) => `https://listado.mercadolibre.com.ar/nuevo/capital-federal/${term}_Desde_${1+50*(page-1)}_OrderId_PRICE`;

export const getArticleData = async (
    termToFind,
    setArticleData,
    setErrorMessage,
) => {
    if(!termToFind) {
        setErrorMessage("Por favor escriba un termino de busqueda");
        return;
    }
    //Set loading screen
    setErrorMessage(null);
    setArticleData(null); 
    let searchTerm = termToFind.trim();
    searchTerm = termToFind.replace(/ /gm, '-');

    const [getHistory, setHistory, ] = getLocalStorageUtils(HISTORY, []);
    const history = getHistory();
    const articleInCache = history.find( article => article.searchTerm === searchTerm);
    if(articleInCache) {
        setArticleData(articleInCache);
        return;
    }
    
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
    let requestsPromises = searchURLs.map( search => parseMLdata(search));
    
    articlesFound = await Promise.all(requestsPromises).then(
        responses => responses.flat()
    );

    articlesFound = articlesFound.filter( article => article.price);
    articlesFound = eliminateUnrelatedItems(articlesFound);
    if(articlesFound.length <= 10) {
        setErrorMessage("No hay articulos de este tipo en venta en MercadoLibre");
        return;
    }
    articlesFound = articlesFound.sort(articleComparator);
    // console.log("articlesFound: ", articlesFound);
  
    let articlesPrice = articlesFound.map( article => article.price.amount || 0);
    const totalAverage = calcAverage(articlesPrice);
    const minAverage = calcAverage(articlesPrice.slice(0,articlesPrice.length* 1/5))
    const maxAverage = calcAverage(articlesPrice.slice(articlesPrice.length * 4/5))
    let selectedArticles = articlesFound.filter( article => Math.abs(article.price.amount - totalAverage) <= (totalAverage/5) );
    selectedArticles = deduplicateArticles(selectedArticles);
    selectedArticles = selectedArticles.slice(0, Math.min(12, selectedArticles.length));
    const searchTitle = termToFind[0].toUpperCase() + termToFind.slice(1)

    const articleToShow = {
        searchTerm: searchTerm,
        searchTitle: searchTitle,
        minAverage: minAverage,
        totalAverage: totalAverage,
        maxAverage: maxAverage,
        selectedArticles: selectedArticles,
    };
    setArticleData(articleToShow);
    history.push(articleToShow);
    setHistory(history);
};

const parseMLdata = async (url) => {
    const ONLY = 0;
    return new Promise(async (resolve, _) => {
        try {
            const rawData = await fetchTextData(PROXY_GENERAL + url);
            let selectedText = rawData.match(/{"siteId".*}/,"gm")[ONLY];
            selectedText = JSON.parse(selectedText);
            resolve((selectedText.initialState && selectedText.initialState.results) || []);
        } catch (error) {
            console.error("=== Error al obtener datos de mercadolibre ===");
            console.error("Url Pedida: ", url);
            console.error(error);
            console.trace();
            resolve([]);
        }
    });
}

const articleComparator = (firstArticle, secondArticle) => {
    if(firstArticle.price.amount > secondArticle.price.amount) return 1;
    return -1;
};

const eliminateUnrelatedItems = (articles) => {
    let articlesPrice = articles.map( article => article.price.amount || 0);
    const estimatedTotalAverage = calcAverage(articlesPrice);
    return articles.filter( article => (article.price.amount > (estimatedTotalAverage/3)) && (article.price.amount < (estimatedTotalAverage*3)));
}

const calcAverage = (articlesFound) => {
    const sumAll = (accumulator, currentValue) => accumulator + currentValue;
    const calculatedValue = articlesFound.reduce(sumAll, 0) / articlesFound.length;
    return parseInt(calculatedValue);
}

const deduplicateArticles = (articles) => {
    const compareDuplicates = (accumulator, currentArticle) => {
        if(!accumulator.length || ((accumulator[accumulator.length-1].id !== currentArticle.id) && (accumulator[accumulator.length-1].pictures.stack.retina !== currentArticle.pictures.stack.retina)) ) {
            return [...accumulator, currentArticle]
        } else {
            return accumulator
        }
    }
    return articles.reduce(compareDuplicates, []);
}