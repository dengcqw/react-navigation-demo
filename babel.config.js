module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
     ["module-resolver", {
      "alias": {
        "^react-native$": "react-native-web"
      }
    }]
  ]
};
