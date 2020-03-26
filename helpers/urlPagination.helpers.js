const hbs = require('hbs');

hbs.registerHelper("urlPagination", function(parentCategory, state, category, n, searchWord, vendor, ageLow, ageHigh) {
  // none
  if(!parentCategory && !state && !category && isNaN(searchWord) == true) {
    console.log('none')
    return '?page='+n;
  }
  // parent
  else if(parentCategory && !state && !category && !searchWord) {
    console.log('parent')
    return `?parentCategory=${parentCategory}&state=&page=${n}`
  }
  // parent + searchWord
  else if(parentCategory && !state && !category && searchWord) {
    console.log('parent')
    return `?parentCategory=${parentCategory}&state=&page=${n}`
  }
  // state
  else if(!parentCategory && state && !searchWord) {
    console.log('state')
    return `?parentCategory=&state=${state}&page=${n}`
  }
  // parent + state - category
  else if(parentCategory && state && !category) {
    console.log('parentCat + state')
    return `?parentCategory=${parentCategory}&category=&state=${state}&searchWord=&vendor=&page=${n}`
  } 

  // #JOBS


  // parent + state + category - searchWord -  
  else if(parentCategory && state && category && !searchWord && !vendor) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&searchWord=&vendor=&page=${n}`
  } 
  // parent + state + category + searchWord - vendor 
  else if(parentCategory && state && category && searchWord && !vendor) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&searchWord=${searchWord}&page=${n}`
  } 
  // parent + state + category + searchWord + vendor 
  else if(parentCategory && state && category && searchWord && vendor) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&searchWord=${searchWord}&vendor=${vendor}&page=${n}`
  } 
  // parent + state + category - searchWord + vendor 
  else if(parentCategory && state && category && !searchWord && vendor) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&searchWord=&vendor=${vendor}&page=${n}`
  } 
  // parent - state + category - searchWord - vendor
  else if(parentCategory && !state && category && !searchWord && !vendor) {
    console.log('parentCat + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=&page=${n}`
  } 
  // parent - state + category + searchWord - vendor
  else if(parentCategory && !state && category && searchWord && !vendor) {
    console.log('parentCat + category + searchWord')
    return `?parentCategory=${parentCategory}&category=${category}&state=&searchWord=${searchWord}&vendor=&page=${n}`
  } 
  // parent - state + category + searchWord + vendor
  else if(parentCategory && !state && category && searchWord && vendor) {
    console.log('parentCat + category + searchWord')
    return `?parentCategory=${parentCategory}&category=${category}&state=&searchWord=${searchWord}&vendor=${vendor}&page=${n}`
  } 
  // parent - state + category - searchWord + vendor
  else if(parentCategory && !state && category && !searchWord && vendor) {
    console.log('parentCat + category + searchWord')
    return `?parentCategory=${parentCategory}&category=${category}&state=&searchWord=&vendor=${vendor}&page=${n}`
  } 
  // #JOBS

  // #CONTACTS

  else if(parentCategory && state && category && !searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&ageLow=&ageHigh=&searchWord=&page=${n}`
  } 
  // parent + state + category + searchWord - vendor 
  else if(parentCategory && state && category && searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&ageLow=&ageHigh=&searchWord=&searchWord=${searchWord}&page=${n}`
  } 
  // parent + state + category + searchWord + vendor 
  else if(parentCategory && state && category && searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&ageLow=&ageHigh=&searchWord=${searchWord}&page=${n}`
  } 
  // parent + state + category - searchWord + vendor 
  else if(parentCategory && state && category && !searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + state + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=${state}&ageLow=&ageHigh=&searchWord=&page=${n}`
  } 
  // parent - state + category - searchWord - vendor
  else if(parentCategory && !state && category && !searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + category')
    return `?parentCategory=${parentCategory}&category=${category}&state=&page=${n}`
  } 
  // parent - state + category + searchWord - vendor
  else if(parentCategory && !state && category && searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + category + searchWord')
    return `?parentCategory=${parentCategory}&category=${category}&state=&searchWord=${searchWord}&vendor=&page=${n}`
  } 
  // parent - state + category + searchWord + vendor
  else if(parentCategory && !state && category && searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + category + searchWord')
    return `?parentCategory=${parentCategory}&category=${category}&state=&ageLow=&ageHigh=&searchWord=${searchWord}&page=${n}`
  } 
  // parent - state + category - searchWord + vendor
  else if(parentCategory && !state && category && !searchWord && !ageLow && !ageHigh ) {
    console.log('parentCat + category + searchWord')
    return `?parentCategory=${parentCategory}&category=${category}&state=&ageLow=&ageHigh=&searchWord=&page=${n}`
  } 

  // #CONTACTS







  else {'#issueUrlPag'}

})