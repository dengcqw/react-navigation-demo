/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
//import App from './src/TabScreen';
import App from './src/RootScreen';
import {name as appName} from './app.json';
import './gesture-handler';

AppRegistry.registerComponent(appName, () => App);
