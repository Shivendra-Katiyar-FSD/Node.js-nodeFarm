///////////////////////////////
///////////http Server/////////
///////////////////////////////

//1-Core Modules
const fs = require('fs');
const http = require('http');
const url = require('url');

//2-3rd Party Modules
const slugify = require('slugify');

//3-Own Modules
const replaceTemplate = require('./modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// console.log(data);
const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  console.log(url.parse(req.url, true));

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const cardsHTML = dataObj.map((el) => replaceTemplate(templateCard, el)).join('');
    const output = templateOverview.replace('{%PRODUCT_CARD%}', cardsHTML);
    res.end(output);
  }

  //Product Page
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  }

  //API
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }

  //404-Not Found
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to the requests on port 3000');
});
