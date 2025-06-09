export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/.jest/setEnvVars.js']
};