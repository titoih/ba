const cron = require('node-cron');
const Ad = require('../models/ad.model');
const Car = require('../models/car.model');
const Contact = require('../models/contact.model');
const Misc = require('../models/misc.model');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');


const cronFunction = (maxDateAd) => {
  return Promise.all([Ad.deleteMany({renovate:{$lte:maxDateAd}}),
    Car.deleteMany({renovate:{$lte:maxDateAd}}),
    Contact.deleteMany({renovate:{$lte:maxDateAd}}),
    Misc.deleteMany({renovate:{$lte:maxDateAd}})])
    .then( result => {
      console.log(`Cron works! ads deletes ${result.length}`)
    })
    .catch(error => console.log(error))
}

module.exports.expireAds = (req, res, next) => {
  // expire ads with more than 30 days
  const maxDateAd = new Date().getTime() - 2592000000;
  cron.schedule("* * * * *", function() {
  console.log("running a task every minute => expired ads");
  cronFunction(maxDateAd);
  });
}

module.exports.deleteLockedEmail = (req, res, next) => {
    // expire ads with more than 30 days
  const maxDateAd = new Date().getTime() - 2592000000;
  const t = new Date();
  const adIdsToDelete = [];
  const models = [
    {
    model: Contact,
    ad: 'contact'
    },
    {
    model: Ad,
    ad: 'ad'
    },
  ];

  const deleteAds = (userLocked, checkModelAndAds ) => {
    if(userLocked[checkModelAndAds.ad] != '') {
      checkModelAndAds.model.find({_id:userLocked[checkModelAndAds.ad]})
        .then(isLocked => {
          isLocked.map(getRenovate => {
            if(new Date().getTime() > getRenovate.renovate.getTime() + 120000 & getRenovate.renovate.getTime() + 120000 > new Date().getTime() - 240000){
              checkModelAndAds.model.deleteOne({_id:getRenovate.id})
                .then(id => console.log(`Ads deleted by Locked Email: ${id.deletedCount} ads`))
            } else {
              console.log('not get ads')
            }
          })
        })
        .catch(error => console.log(error))
    }
  }
  
  cron.schedule("* * * * *", function() {

  console.log("running a task every minute => delete locked ads");
  return Admin.find({})
    .then(emailLocked => {
      const mapToLockedEm =  emailLocked.map(element => {
        return User.findOne({email:element.email})
                .then(userLocked => {
                  // userLocked ? userLocked.ad != '' ? adIdsToDelete.push(...userLocked.ad ) : `` : ``
                  // userLocked ? userLocked.misc != '' ? adIdsToDelete.push(...userLocked.misc ) : `` : ``
                  // userLocked ? userLocked.car != '' ? adIdsToDelete.push(...userLocked.car ) : `` : ``
                  if(userLocked != null) {
                    models.map(sendObj => deleteAds(userLocked, sendObj))
                  }
               })
                .catch(error => console.log(error))
      })
      return Promise.all(mapToLockedEm)
    })
    .then(() => {
      // console.log(adIdsToDelete)
    })
    
    .catch(error => console.log(error))
  });
}