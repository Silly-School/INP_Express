"use strict";

// get all needed dependencies
const fs = require('fs');

//  Read products.csv, split at \n and shift one line.
const productData = fs.readFileSync('./public/csv/products.csv', 'UTF8');
const products = productData.split('\n');
products.shift();

/*
    prepairHTML function
    This function will split the csv data to finally use it in our html
*/
const prepairHTML = function(url) {

    const splitEachProduct = record => {
        const fields = record.split(";");

        //  reads the productExample.html - a template for a product view on a website
        let html = fs.readFileSync('./views/productExample.html', 'utf-8');

        fields.forEach((field, index) => {
            // the backslash is very important, otherwise it would count the ${fields[]} an js object.
            html = html.replaceAll(`\${fields[${index}]}`, field);
        });

        html = html.replaceAll('{element}', fields[0].toLowerCase().replace(/ /g, "-"));

        //  returns the html
        return html;
    };

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    //  prepair for end result
    let result;

    //  find the correct element
    pages.forEach((element) => {
        if (element.includes(url) == true) {
            result = element;
        }
    });

    return (result);
};

module.exports = prepairHTML;