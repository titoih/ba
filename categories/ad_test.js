        // parent  - category - state
        if(searchWord && !vendor) {
          modelVariable.find({ $text: {$search: searchWord.trim()}})
          .sort({renovate:-1})
          .then(adsAll => {
            const size = adsAll.length/5;
            adsAll = adsAll.slice(var1,var2);
            return res.render('ads/list', {adsAll, parentCategory, empleo, searchWord, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
          })
        }
        else if(searchWord && vendor) {
          modelVariable.find({ vendor:vendor, $text: {$search: searchWord.trim()}})
          .sort({renovate:-1})
          .then(adsAll => {
            const size = adsAll.length/5;
            adsAll = adsAll.slice(var1,var2);
            return res.render('ads/list', {adsAll, parentCategory, empleo, vendor, searchWord, state, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
          })
        }
        else if(!searchWord && vendor) {
          modelVariable.find({ vendor:vendor})
          .sort({renovate:-1})
          .then(adsAll => {
            const size = adsAll.length/5;
            adsAll = adsAll.slice(var1,var2);
            return res.render('ads/list', {adsAll, parentCategory, empleo, vendor, state, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
          })
        }
        else if (!searchWord && !vendor) {
          modelVariable.find({})
          .sort({renovate:-1})
          .then(adsAll => {
            const size = adsAll.length/5;
            adsAll = adsAll.slice(var1,var2);
            return res.render('ads/list', {adsAll, parentCategory, empleo, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
          })
        }
        else {
            console.log('#issue empleo category + state')
            return res.render('ads/list', {adsAll,parentCategory,category, empleo, pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory,category:category}})
        }
        // parent  - category - state