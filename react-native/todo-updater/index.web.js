import { AppRegistry } from 'react-native';

 import App from './src/App';
import * as appConfig from './app';

 AppRegistry.registerComponent(appConfig.name, () => App);

 AppRegistry.runApplication(appConfig.name, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});