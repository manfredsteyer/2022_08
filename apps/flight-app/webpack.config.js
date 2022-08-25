const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  // import('passenger/Module')

  remotes: {
    // Zeile anpassen:
    // "passenger": "http://localhost:4201/remoteEntry.js", 
    //               ^---- Hardcoded?! Static Federation
    //                                 Dynamic Federation   
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
