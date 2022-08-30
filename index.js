import {AppRegistry} from 'react-native';
import navigation from './navigation';
import {appName} from './app.json';

AppRegistry.registerComponent(appName, () => navigation);