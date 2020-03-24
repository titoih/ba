          // #contact parent -category + state
          if(searchWord && !ageLow && !ageHigh) {
            modelVariable.find({$text: {$search: searchWord.trim()}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, searchWord, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          } 
          else if(searchWord && ageLow && !ageHigh) {
            modelVariable.find({$text: {$search: searchWord.trim()}, age:{$gte:ageLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, searchWord, ageLow, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          } 
          else if(searchWord && !ageLow && ageHigh) {
            modelVariable.find({$text: {$search: searchWord.trim()}, age:{$lte:ageHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, searchWord, ageHigh, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          } 
          else if(searchWord && ageLow && ageHigh) {
            modelVariable.find({$text: {$search: searchWord.trim()}, age:{$gte:ageLow,$lte:ageHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, searchWord, ageLow, ageHigh, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          }
          else if(!searchWord && ageLow && ageHigh) {
            modelVariable.find({age:{$gte:ageLow,$lte:ageHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, ageLow, ageHigh, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          } 
          else if(!searchWord && !ageLow && ageHigh) {
            modelVariable.find({age:{$lte:ageHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, ageHigh, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          } 
          else if(!searchWord && ageLow && !ageHigh) {
            modelVariable.find({age:{$gte:ageLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, ageLow, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          } 
          else if(!searchWord && !ageLow && !ageHigh) {
            modelVariable.find({})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory,contact, pagination:{page:pageNum, pageCount:getNumberPages(size), parentCategory:parentCategory}}) 
            })
          } 


