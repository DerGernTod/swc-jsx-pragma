/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    displayName: "JavaScript Agent Gen 2",
    silent: true,
    // testEnvironment: "<rootDir>/source/testtools/jsdom-environment-global.spec.ts",
    roots: [
        "<rootDir>/source"
    ],
    maxWorkers: "50%", // As recommended in jest.io https://jestjs.io/docs/configuration#maxworkers-number--string
    transform: {
        "^.+\\.(t|j)s$": ["@swc/jest", {
            sourceMaps: "inline",
            module: {
                type: "commonjs",
                strict: false,
                strictMode: false
            },

            jsc: {
                target: "es5",
                parser: {
                    syntax: "typescript",
                    dynamicImport: true
                }
            }
        }]
    },
    transformIgnorePatterns: [
        "node_modules"
    ],
    testMatch: [
        "**/*/*.spec.ts"
    ],
    moduleFileExtensions: ["ts", "js", "node", "json"],
    reporters: [
        "default",
        ["jest-junit", {suiteName: "jsagent", outputDirectory: "test-results/junit/"}]
    ],
    globals: {
        // These two get monkey patched by jsdom to its own values,
        // but this is needed to not break tests that run in node env
        self: {},
        navigator: {},
        // We are running tests with jest-circus so jasmine does not exist anymore in global scope.
        // We need to stub the global to trick jasmine-ajax library that we are still using it,
        // so ajax can be installed to this object.
        jasmine: {},
        __UNIT__: true
    },
    coverageDirectory: "test-results",
    // in ci npm test runs this with --coverage, so leave this off here to not slow down tests when executing locally
    collectCoverage: false,
    collectCoverageFrom: [
        "./source/**/*.ts",
        "!**/*/index-*.ts"
    ],
    coveragePathIgnorePatterns: [
        "/\\.spec\\.ts$/i",
        "/.*node_modules.*/",
        // "/.*testtools.*/"
    ],
    coverageReporters: [
        "cobertura"
    ],
    coverageProvider: "v8",
    resetMocks: true,
    restoreMocks: true,
    resetModules: true,
    // setupFilesAfterEnv: [
    //     "jest-extended/all",
    //     "<rootDir>/source/testtools/setup.spec.ts"
    // ],
    testEnvironmentOptions: {
        url: "http://localhost:3000/context.html" // NOSONAR
    },
    // moduleNameMapper: {
    //     "^@test-helpers": "<rootDir>/source/testtools/index.spec.ts",
    //     "^@lib/(.*)": "<rootDir>/lib/$1",
    //     "^@agent-shared/(.*)": "<rootDir>/source/shared/$1",
    //     "^@type-guards/(.*)": "<rootDir>/source/shared/type-guards/$1",
    //     "^@test-tools/(.*)": "<rootDir>/source/testtools/$1",
    //     "^@core-shared/(.*)": "<rootDir>/source/core/shared/$1",
    //     "^@init-code/(.*)": "<rootDir>/source/core/initCode/$1",
    //     "^@async-core/(.*)": ["<rootDir>/source/core/asyncCore/$1"],
    //     "^@recorder/(.*)": "<rootDir>/source/modules/Q_sessionrecorder/$1",
    //     "^@recorder-shared/(.*)": "<rootDir>/source/shared/sessionrecorder/$1",
    //     '^(\\.{1,2}/.*)\\.js$': '$1'
    // }
};
module.exports = config;
