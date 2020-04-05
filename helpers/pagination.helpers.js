const hbs = require('hbs');
import * as paginate from 'node_modules/handlebars-paginate';

// var paginate = require('handlebars-paginate');
hbs.registerHelper('paginate', paginate);
 