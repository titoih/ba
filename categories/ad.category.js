// parent + category - state

if(searchWord && !vendor) {
    modelVariable.find({category:getAdCategory(category), $text: {$search: searchWord.trim()}})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, searchWord, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else if(searchWord && vendor) {
    modelVariable.find({category:getAdCategory(category), vendor:vendor, $text: {$search: searchWord.trim()}})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, vendor, searchWord, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else if(!searchWord && vendor) {
    modelVariable.find({category:getAdCategory(category), vendor:vendor})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, vendor, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else if (!searchWord && !vendor) {
    modelVariable.find({category:getAdCategory(category)})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else {
      console.log('#issue empleo category')
      return res.render('ads/list', {adsAll,parentCategory,category, empleo, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
  }

  // parent + category - state

  if(searchWord && !vendor && state) {
    modelVariable.find({state:getState(state), category:getAdCategory(category), $text: {$search: searchWord.trim()}})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, searchWord, state, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else if(searchWord && vendor && state) {
    modelVariable.find({state:getState(state), category:getAdCategory(category), vendor:vendor, $text: {$search: searchWord.trim()}})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, vendor, searchWord, state, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else if(!searchWord && vendor && state) {
    modelVariable.find({state:getState(state), category:getAdCategory(category), vendor:vendor})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, vendor, state, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else if (!searchWord && !vendor && state) {
    modelVariable.find({state:getState(state), category:getAdCategory(category)})
    .sort({renovate:-1})
    .then(adsAll => {
      const size = adsAll.length/5;
      adsAll = adsAll.slice(var1,var2);
      return res.render('ads/list', {adsAll, parentCategory, category, empleo, state, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory, category:category}}) 
    })
  }
  else {
      console.log('#issue empleo category + state')
      return res.render('ads/list', {adsAll,parentCategory,category, empleo, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
  }

  // parent + category - state