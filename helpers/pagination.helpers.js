const hbs = require('hbs');
// modified for production env - 
// const paginate = require('handlebars-paginate');

// IMPORTAT => NEW VARIABLES + set var and add to OBJ

hbs.registerHelper('paginate', function(pagination, options) {
  var type = options.hash.type || 'middle';
  var ret = '';
  var pageCount = Number(pagination.pageCount);
  var page = Number(pagination.page);
  var limit;
  var state = Number(pagination.state);
  var parentCategory = Number(pagination.parentCategory);
  var category = Number(pagination.category);
  var searchWord = pagination.searchWord;
  var vendor = pagination.vendor;
  var ageLow = Number(pagination.ageLow);
  var ageHigh = Number(pagination.ageHigh);
  var vendorType = pagination.vendorType;
  var priceLow = pagination.priceLow;
  var priceHigh = pagination.priceHigh;
  var brand = pagination.brand;
  var carmodel = pagination.carmodel;
  var yearLow = pagination.yearLow;
  var yearHigh = pagination.yearHigh;
  var km = pagination.km;
  var ccLow = pagination.ccLow;
  var ccHigh = pagination.ccHigh;
  var email = pagination.email;
  var ip = pagination.ip;
  var ua = pagination.ua;
  var co = pagination.co;
  var checkContactCat = pagination.checkContactCat;

  var objVarPagination = {
    state: state, 
    parentCategory:parentCategory, 
    category:category, 
    searchWord:searchWord, 
    vendor:vendor, 
    ageLow:ageLow, 
    ageHigh:ageHigh, 
    vendorType:vendorType, 
    priceLow:priceLow, 
    priceHigh:priceHigh, 
    brand:brand, 
    carmodel:carmodel, 
    km:km, 
    yearLow:yearLow, 
    yearHigh:yearHigh, 
    ccLow:ccLow, 
    ccHigh:ccHigh,
    email:email,
    ip:ip,
    ua:ua,
    co:co,
    checkContactCat:checkContactCat
  }
  if (options.hash.limit) limit = +options.hash.limit;
  //page pageCount
  var newContext = {};
  switch (type) {
    case 'middle':
      if (typeof limit === 'number') {
        var i = 0;
        var leftCount = Math.ceil(limit / 2) - 1;
        var rightCount = limit - leftCount - 1;
        if (page + rightCount > pageCount)
          leftCount = limit - (pageCount - page) - 1;
        if (page - leftCount < 1)
          leftCount = page - 1;
        var start = page - leftCount;

        while (i < limit && i < pageCount) {
          newContext = { n: start, ...objVarPagination };
          if (start === page) newContext.active = true;
          ret = ret + options.fn(newContext);
          start++;
          i++;
        }
      }
      else {
        for (var i = 1; i <= pageCount; i++) {
          newContext = { n: i, ...objVarPagination };
          if (i === page) newContext.active = true;
          ret = ret + options.fn(newContext);
        }
      }
      break;
    case 'previous':
      if (page === 1) {
        newContext = { disabled: true, n: 1, ...objVarPagination }
      }
      else {
        newContext = { n: page - 1, ...objVarPagination }
      }
      ret = ret + options.fn(newContext);
      break;
    case 'next':
      newContext = {};
      if (page === pageCount) {
        newContext = { disabled: true, n: pageCount, ...objVarPagination }
      }
      else {
        newContext = { n: page + 1 , ...objVarPagination}
      }
      ret = ret + options.fn(newContext);
      break;
    case 'first':
      if (page === 1) {
        newContext = { disabled: true, n: 1, ...objVarPagination }
      }
      else {
        newContext = { n: 1, ...objVarPagination }
      }
      ret = ret + options.fn(newContext);
      break;
    case 'last':
      if (page === pageCount) {
        newContext = { disabled: true, n: pageCount, ...objVarPagination }
      }
      else {
        newContext = { n: pageCount, ...objVarPagination }
      }
      ret = ret + options.fn(newContext);
      break;
  }

  return ret;
})
 