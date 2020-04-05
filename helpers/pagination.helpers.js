const hbs = require('hbs');
// @ts-ignore
var paginate = require('handlebars-paginate');
hbs.registerHelper('paginate', paginate);
 