import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';
import '@parlamentsdienste/pdcomponents-core/styles/parlamentsdienstecore.css';
import '@parlamentsdienste/pdcomponents-core/styles/typography.css';
import { createApp } from 'vue';
import App from './app/App.vue';
import './styles.css';

setAssetPath('http://localhost:4200');

const app = createApp(App);
app.mount('#root');
