module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./jest.setup.ts'],
    setupFilesAfterEnv: [
        'jest-expect-message',
        'jest-mock-console/dist/setupTestFramework.js',
    ],
}
