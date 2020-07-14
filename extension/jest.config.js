module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.ts'],
    globals: {
        'ts-jest': {
            tsConfig: {
                sourceMap: true,
                inlineSourceMap: true
            }
        },
    },
    roots: ['src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    preset: 'ts-jest',
    testEnvironment: 'node'
};