describe('Title', function () {
    it('should be as defined', function () {
        browser.ignoreSynchronization = true;
        browser.get('/');
        expect(browser.getTitle()).toEqual('Travel and help');
    });
});