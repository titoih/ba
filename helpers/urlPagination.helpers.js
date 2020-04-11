const hbs = require('hbs');

hbs.registerHelper("urlPagination", function(parentCategory, state, category, n, searchWord, vendor, ageLow, ageHigh, vendorType, priceLow, priceHigh, brand, carmodel, km, yearLow, yearHigh, ccLow, ccHigh, email, ip) {
  // #JOBS
  // if(parentCategory) {
    const constructQuery = (parentCategory, state, category, n, searchWord, vendor, ageLow, ageHigh, vendorType, priceLow, priceHigh, brand, carmodel, km, yearLow, yearHigh, ccLow, ccHigh, email, ip) => 
    `?parentCategory=${parentCategory ? parentCategory : ``}${category ? `&category=${category}` : ''}${state ? `&state=${state}` : ''}${brand ? `&brand=${brand}` : ''}${carmodel ? `&carmodel=${carmodel}` : ''}${yearLow ? `&yearLow=${yearLow}` : ''}${yearHigh ? `&yearHigh=${yearHigh}` : ''}${km ? `&km=${km}` : ''}${ccLow ? `&ccLow=${ccLow}` : ''}${ccHigh ? `&ccHigh=${ccHigh}` : ''}${ageLow ? `&ageLow=${ageLow}` : ''}${ageHigh ? `&ageHigh=${ageHigh}` : ''}${priceLow ? `&priceLow=${priceLow}` : ''}${priceHigh ? `&priceHigh=${priceHigh}` : ''}${vendor ? `&vendor=${vendor}` : ''}${vendorType ? `&vendorType=${vendorType}` : ''}${searchWord ? `&searchWord=${searchWord}` : ''}${email ? `&email=${email}` : ''}${ip ? `&ip=${ip}` : ''}&page=${n}`
    return constructQuery(parentCategory, state, category, n, searchWord, vendor, ageLow, ageHigh, vendorType, priceLow, priceHigh, brand, carmodel, km, yearLow, yearHigh, ccLow, ccHigh, email, ip)
  // } 

  // #CONTACTS
//   if(parentCategory == 4) {
//   const constructQuery = (parentCategory, state, category, searchWord, ageLow, ageHigh, n) => 
//     `?parentCategory=${parentCategory ? parentCategory : ''}&category=${category ? category : ''}&state=${state ? state : ''}&ageLow=${ageLow ? ageLow : ''}&ageHigh=${ageHigh ? ageHigh : ''}&searchWord=${searchWord ? searchWord : ''}&page=${n}`
//   return constructQuery(parentCategory, state, category, searchWord, ageLow, ageHigh, n)
// }
  // #CONTACTS

  // #MISC
  // if(parentCategory == 3) {
  //   const constructQuery = (parentCategory, state, category, searchWord, vendor, vendorType, priceLow, priceHigh, n) => 
  //   `?parentCategory=${parentCategory ? parentCategory : ''}&category=${category ? category : ''}&state=${state ? state : ''}&priceLow=${priceLow ? priceLow : ''}&priceHigh=${priceHigh ? priceHigh : ''}&vendor=${vendor ? vendor : ''}&vendorType=${vendorType ? vendorType : ''}&searchWord=${searchWord ? searchWord : ''}&page=${n}`
  //   return constructQuery(parentCategory, state, category, searchWord, vendor, vendorType, priceLow, priceHigh, n)
  // }
  // #MISC

  // #MOTOR
  // if(parentCategory == 1) {
  //   if(category == 1 || category == 3) {
  //   const constructQuery = (parentCategory, state, category, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, n) => 
  //   `?parentCategory=${parentCategory ? parentCategory : ''}&category=${category ? category : ''}&state=${state ? state : ''}&brand=${brand ? brand : ''}&carmodel=${carmodel ? carmodel : ''}&priceLow=${priceLow ? priceLow : ''}&priceHigh=${priceHigh ? priceHigh : ''}&yearLow=${yearLow ? yearLow : ''}&yearHigh=${yearHigh ? yearHigh : ''}&km=${km ? km : ''}&page=${n}`
  //   return constructQuery(parentCategory, state, category, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, n)
  //   } else {
  //   const constructQuery = (parentCategory, state, category, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh, n) => 
  //   `?parentCategory=${parentCategory ? parentCategory : ''}&category=${category ? category : ''}&state=${state ? state : ''}&brand=${brand ? brand : ''}&carmodel=${carmodel ? carmodel : ''}&priceLow=${priceLow ? priceLow : ''}&priceHigh=${priceHigh ? priceHigh : ''}&yearLow=${yearLow ? yearLow : ''}&yearHigh=${yearHigh ? yearHigh : ''}&km=${km ? km : ''}&ccLow=${ccLow ? ccLow : ''}&ccHigh=${ccHigh ? ccHigh : ''}&page=${n}`
  //   return constructQuery(parentCategory, state, category, brand, carmodel, priceLow, priceHigh, yearLow, yearHigh, km,ccLow, ccHigh, n)
  //   }
  // }
  // else {
  //   // none
  //   if(!parentCategory && !state && !category && !searchWord) {
  //     return `?page=${n}`;
  //   }
  //   // state
  //   else if(!parentCategory && state && !searchWord) {
  //     console.log('state')
  //     return `?state=${state}&page=${n}`
  //   }

  // }

})