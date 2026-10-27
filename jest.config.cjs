module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "CommonJS",
          moduleResolution: "Node",
          esModuleInterop: true,
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};
