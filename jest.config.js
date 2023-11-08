/* eslint-disable @typescript-eslint/indent */
module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}'
        // '<rootDir>/src/**/*.ts',
        // '!<rootDir>/src/main/**'
    ],
    coverageDirectory: 'coverage',
    // coverageProvider: 'babel',
    testEnvironment: 'node',
    // preset: '@shelf/jest-mongodb',
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
    // moduleNameMapper: {
    //     '@/tests/(.*)': '<rootDir>/tests/$1',
    //     '@/(.*)': '<rootDir>/src/$1'
    // }
}