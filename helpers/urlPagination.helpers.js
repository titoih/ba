const hbs = require('hbs');

hbs.registerHelper("urlPagination", function(state, parentCategory, category, n) {
  if(state && parentCategory && !category) {
    return `?parentCategory=${parentCategory}&category=&state=${state}&page=${n}`
  } 
  else if(!state && parentCategory && !category) {
    return `?parentCategory=${parentCategory}&state=&page=${n}`
  }
  else if(state && !parentCategory && !category) {
    return `?parentCategory=&state=${state}&page=${n}`
  }
  if(state && parentCategory && category) {
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&page=${n}`
  } 
  else if(!state && parentCategory && category) {
    return `?parentCategory=${parentCategory}&category=${category}&state=&page=${n}`
  }
  else if(state && !parentCategory && category) {
    return `?parentCategory=&category=${category}&state=${state}&page=${n}`
  }

  else {
    return '?page='+n;
  }
})