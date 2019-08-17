module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: [
    "mocha"
  ],

  rules: {
    "linebreak-style": [
      "error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"
    ],
    'consistent-return': 0,
    'no-console': 'off',
    "no-underscore-dangle": ["error", {
      "allow": ["_place"]
    }],
    "prefer-default-export": false
    // "mocha/no-exclusive-tests": "error"
  },
};