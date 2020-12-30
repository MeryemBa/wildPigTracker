const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  env: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ,
    DATABASE_URL:process.env.DATABASE_URL
},


})
// module.exports = {
    
    
//   }
