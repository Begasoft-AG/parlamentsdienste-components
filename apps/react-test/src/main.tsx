import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';
import '@parlamentsdienste/pdcomponents-core/styles/parlamentsdienstecore.css';
import '@parlamentsdienste/pdcomponents-core/styles/typography.css';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

setAssetPath('http://localhost:4200');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    // <StrictMode>
    <App />,
    // </StrictMode>,
);
