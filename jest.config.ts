export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    },
    setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
}