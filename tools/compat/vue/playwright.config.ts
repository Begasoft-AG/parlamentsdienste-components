import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env['BASE_URL'] || 'http://127.0.0.1:4200';
const consumerDir = process.env['COMPAT_CONSUMER_DIR'];

if (!consumerDir) {
    throw new Error('COMPAT_CONSUMER_DIR is required to run the Vue compat Playwright suite.');
}

export default defineConfig({
    testDir: './e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'line',
    use: {
        baseURL,
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run dev -- --host 127.0.0.1 --port 4200',
        url: baseURL,
        reuseExistingServer: false,
        cwd: consumerDir,
        timeout: 120000,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
