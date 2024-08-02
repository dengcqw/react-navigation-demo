/**
 * @format
 */

import {createRoot} from 'react-dom/client';
import App from './src/RootScreen';
import {name as appName} from './app.json';

// https://dev.to/mikehamilton00/adding-web-support-to-a-react-native-project-in-2023-4m4l
const root = createRoot(document.getElementById('root'));
root.render(<App />);
