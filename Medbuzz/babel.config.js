module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // this will allow you to import env variables easily
        path: '.env',
        allowUndefined: false,
      },
    ],
  ],
};