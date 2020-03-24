         const nameCategoryMotor = getAdCategory(category)
          if (nameCategoryMotor == 'Motos') {
            const carAttr = true;
            // false cclow cchigh
            // start conditions
            if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && !ccHigh) {
              modelVariable.find({})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            // insert km - allow km
              else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && !ccHigh) {
              modelVariable.find({km:{$lte:km}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory}})
              })
              .catch(error => console.log(error))
            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // true cclow - false cchigh
            // start conditions
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && !ccHigh) {
              console.log(ccLow)
              modelVariable.find({engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert km - allow km
              else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && !ccHigh) {
              modelVariable.find({km:{$lte:km}, engine:{$gte:ccLow}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km, ccLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // false cclow - true cchigh
            // start conditions
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && !ccLow && ccHigh) {
              modelVariable.find({})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert km - allow km
              else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$lte:ccHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$lte:ccHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && !ccLow && ccHigh) {
              modelVariable.find({km:{$lte:km}, engine:{$lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // true cclow - true cchigh
            // start conditions
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km && ccLow && ccHigh) {
              modelVariable.find({engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert km - allow km
              else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow both
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearLow
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, km, yearLow, yearHigh, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, engine:{$gte:ccLow, $lte:ccHigh}, km:{$lte:km}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow},km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            // insert for YEAR - allow yearHigh
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
                .then(adsAll => {
                  const size = adsAll.length/5;
                  adsAll = adsAll.slice(var1,var2);
                  return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
                })
                .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({$text: {$search: carmodel}, price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }
            else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km && ccLow && ccHigh) {
              modelVariable.find({km:{$lte:km}, engine:{$gte:ccLow, $lte:ccHigh}})
              .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            else {
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, ccLow, ccHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            }
          
          // MOTORBIKE - CC - end
          } else {

          const carAttr = true;
          // start conditions
          if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow both
          else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && !km) {
            modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearLow
          else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh},year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && !km) {
            modelVariable.find({year:{$gte:yearLow}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearHigh
          else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({year:{$lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh},year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && !km) {
            modelVariable.find({year:{$lte:yearHigh}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && !km) {
            modelVariable.find({})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          // insert km - allow km
            else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow both
          else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && yearLow && yearHigh && km) {
            modelVariable.find({year:{$gte:yearLow, $lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearLow
          else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && yearLow && !yearHigh && km) {
            modelVariable.find({year:{$gte:yearLow}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          // insert for YEAR - allow yearHigh
          else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow,yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
              .then(adsAll => {
                const size = adsAll.length/5;
                adsAll = adsAll.slice(var1,var2);
                return res.render('ads/list', {adsAll, parentCategory, motor, carAttr, carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
              })
              .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$gte:priceLow, $lte:priceHigh}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel}, price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({$text: {$search: carmodel},price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow}, year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({price:{$lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && priceLow && priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({price:{$gte:priceLow, $lte:priceHigh},year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, priceLow, priceHigh, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && !yearLow && yearHigh && km) {
            modelVariable.find({year:{$lte:yearHigh}, km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, yearLow, yearHigh, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }
          else if(!!carmodel && !priceLow && !priceHigh && !yearLow && !yearHigh && km) {
            modelVariable.find({km:{$lte:km}})
            .sort({renovate:-1})
            .then(adsAll => {
              const size = adsAll.length/5;
              adsAll = adsAll.slice(var1,var2);
              return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,carmodel, km,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
            })
            .catch(error => console.log(error))
          }

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          else {
            return res.render('ads/list', {adsAll, parentCategory, motor, carAttr,pagination:{page:pageNum,pageCount:getNumberPages(size),parentCategory:parentCategory} })
          }
        }