import axios from 'axios';

const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

const allowedStacks = ['backend', 'frontend'];
const allowedLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
const allowedPackages = [
    'cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service',
    'api', 'component', 'hook', 'page', 'state', 'style',
    'auth', 'config', 'middleware', 'utils'
];

const Log = async (stack, level, pkg, message) => {
    try {
        if (!allowedStacks.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
        if (!allowedLevels.includes(level)) throw new Error(`Invalid level: ${level}`);
        if (!allowedPackages.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);

        await axios.post(LOG_ENDPOINT, {
            stack,
            level,
            package: pkg,
            message,
        });
    } catch (err) {
        console.error('Frontend Log failed:', err.message);
    }
};

export default Log;
