exports.config = {
    capabilities: {
        'browserName': 'chrome'
    },
    sauceUser: 'stremann',
    sauceKey: '0ecb489b-6279-4011-9fad-9ccf73037f2e',
    specs: ['test/e2e/*.js']
};