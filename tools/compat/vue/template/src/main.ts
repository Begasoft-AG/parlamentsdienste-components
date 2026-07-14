import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';
import '@parlamentsdienste/pdcomponents-core/styles/parlamentsdienstecore.css';
import '@parlamentsdienste/pdcomponents-core/styles/typography.css';
import { createApp } from 'vue';
import App from './App.vue';
import './styles.css';

setAssetPath(window.location.origin);

createApp(App).mount('#app');
