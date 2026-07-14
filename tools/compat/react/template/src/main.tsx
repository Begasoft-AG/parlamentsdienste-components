import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';
import '@parlamentsdienste/pdcomponents-core/styles/parlamentsdienstecore.css';
import '@parlamentsdienste/pdcomponents-core/styles/typography.css';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import './styles.css';

setAssetPath(window.location.origin);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
