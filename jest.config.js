module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
    },
    transformIgnorePatterns: ['/node_modules/(?!(@mui)/)'],
};
