'use strict';
// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'HefpS7BfsxJICFEias3anOju7',
        'consumerSecret'    : 'LCbPUw0U6r34mskHjUsn2Y3PiKsOKZYWdZrA2qYd2uzhpb5eY4',
        'callbackURL'       : 'https://jsproject-mstoklos-1.c9.io/api/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    },
    
    'test' : {
        
    }

};