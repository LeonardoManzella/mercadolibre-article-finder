/**
 * Get HTML asynchronously
 * @param  {String}   url      The URL to get HTML from
 * @param  {Function} callback A callback funtion. Pass in "response" variable to use returned HTML.
 */
export const getHTML = function(url) {
    return new Promise((resolve, reject) => {
        // Feature detection
        if (!window.XMLHttpRequest) reject("Not window.XMLHttpRequest supported");

        // Create new request
        let xhr = new XMLHttpRequest();

        // Setup callback
        xhr.onload = function() {
        resolve(this.responseXML);
        };
        xhr.onerror = function(event) {
        reject(event);
        };

        // Get the HTML
        xhr.open("GET", url);
        xhr.responseType = "document";
        xhr.send();
    });
};

export const decodeHTML = anString => {
    return anString
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&nbsp;/gi, " ");
};

export const fetchJsonData = (url, options) => {
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => {
        console.error(`-- Error al fetchear url: ${url} ---`);
        console.error(error);
        console.trace();
        });
};

export const fetchTextData = (url, options) => {
    return fetch(url, options)
        .then(response => response.text())
        .catch(error => {
        console.error(`-- Error al fetchear url: ${url} ---`);
        console.error(error);
        console.trace();
        });
};
