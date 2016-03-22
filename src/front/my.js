export const foo = (a) => {
    if (!a) {
        return 1;
    }
    return a;
};

export const bar = (fn) => {
    fn('bar');
};

export const fooBar = (obj) => ({
    ...obj,
    foo: 'foo',
    bar: 'bar'
});
