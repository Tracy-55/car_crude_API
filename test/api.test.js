// test/api.test.js

const chai = require('chai');
const expect = chai.expect;
const { mostPopularMake } = require('../Backend/index.js'); // Adjust path as needed

describe('mostPopularMake', () => {
    it('should return the most popular car make', () => {
        const cars = [
            { make: 'Toyota' },
            { make: 'Ford' },
            { make: 'Toyota' },
            { make: 'Nissan' },
        ];
        const result = mostPopularMake(cars);
        expect(result).to.equal('toyota'); // Make sure this matches the normalized case
    });

    it('should return the first make if there is a tie', () => {
        const cars = [
            { make: 'Toyota' },
            { make: 'Ford' },
            { make: 'Toyota' },
            { make: 'Ford' },
        ];
        const result = mostPopularMake(cars);
        expect(result).to.equal('toyota'); // Ensure this matches your tie-breaking logic
    });

    it('should return undefined if the array is empty', () => {
        const cars = [];
        const result = mostPopularMake(cars);
        expect(result).to.be.undefined;
    });

    it('should handle case-insensitive make names', () => {
        const cars = [
            { make: 'toyota' },
            { make: 'Toyota' },
            { make: 'FORD' },
            { make: 'Ford' },
        ];
        const result = mostPopularMake(cars);
        expect(result).to.equal('toyota'); // Ensure this matches your normalization
    });
});
