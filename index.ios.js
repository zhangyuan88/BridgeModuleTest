/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry
// } from 'react-native';'use strict';
'use strict';
import React from 'react';
import {
  AppRegistry,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native'

var TestMode = require('./src/communicationBetweenJSandNative/TestMode.js');
//var UniformView = require('./navigator_uniform.js');
AppRegistry.registerComponent('BridgeModuleTest', () => TestMode);
