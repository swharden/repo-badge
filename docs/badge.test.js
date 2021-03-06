const githubStatusBadge_formatNumber = require('./badge.js');

describe('Abbreviation', () => {
    it.each([
        [0, '0'],
        [7, '7'],
        [13, '13'],
        [100, '100'],
        [123, '123'],
        [555, '555'],
        [999, '999'],
        [1000, '1.0k'],
        [1001, '1.0k'],
        [5555, '5.6k'],
        [9999, '10.0k'],
        [10000, '10.0k'],
        [10999, '11.0k'],
        [11000, '11.0k'],
        [55555, '55.6k'],
        [69420, '69.4k'],
        [99999, '100k'],
        [555555, '556k'],
        [123123, '123k'],
        [999999, '1.0M'],
        [1000000, '1.0M'],
        [1500000, '1.5M'],
        [1990000, '2.0M'],
        [69420420, '69.4M'],
    ])('%p abbreviated is %p', (a, b) => {
        expect(githubStatusBadge_formatNumber(a)).toEqual(b)
    });
});