import { fetchTextData } from "../utils/internetUtils";

const PROXY_GENERAL = "https://dev-leo-cors-anywhere.herokuapp.com/";
const PROXY_WORKER = "https://proxy-worker.leonardo-manzella.workers.dev/corsproxy/?apiurl=";

const MERCADOLIBRE_PAGE_1 = (term) => `https://electronica.mercadolibre.com.ar/nuevo/capital-federal/${term}_OrderId_PRICE`;
const MERCADOLIBRE_PAGE_2 = (term) => `https://electronica.mercadolibre.com.ar/nuevo/capital-federal/${term}_Desde_51_OrderId_PRICE`;
const MERCADOLIBRE_PAGE_3 = (term) => `https://electronica.mercadolibre.com.ar/nuevo/capital-federal/${term}_Desde_101_OrderId_PRICE`;

export const getArticleData = async (
    termToFind,
    setArticleData
) => {
    setArticleData(null); //Sets loading screen

    const searchTerm = termToFind.replace(/ /gm, '-');
    const searchURLs = [
        MERCADOLIBRE_PAGE_1(searchTerm),
        MERCADOLIBRE_PAGE_2(searchTerm),
        MERCADOLIBRE_PAGE_3(searchTerm),
    ];

    let articlesFound = [];
    for (let current = 0; current < searchURLs.length; current++) {
        const url = searchURLs[current];
        const results = await parseMLdata(url);
        articlesFound.push(...results);
    }
    console.log("articlesFound: ", articlesFound);
    
    // TODO continue calculating averages and data
};

const parseMLdata = async (url) => {
    const ONLY = 0;
    const rawData = await fetchTextData(PROXY_GENERAL + url);
    let selectedText = rawData.match(/{"siteId".*}/,"gm")[ONLY];
    selectedText = JSON.parse(selectedText);
    return (selectedText.initialState && selectedText.initialState.results) || [];
}