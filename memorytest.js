const express = require('express');

const app = express();

const memoryLeak = [];

app.get('/', (req, res) => {
    res.send('Memory Leak Test App Running');
});

app.get('/consume', (req, res) => {

    const sizeMB = parseInt(req.query.mb) || 50;

    const buffer = Buffer.alloc(sizeMB * 1024 * 1024, 'A');

    memoryLeak.push(buffer);

    const memoryUsage = process.memoryUsage();

    res.json({
        message: `Allocated ${sizeMB} MB memory`,
        rss_MB: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsed_MB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotal_MB: Math.round(memoryUsage.heapTotal / 1024 / 1024)
    });
});

app.get('/status', (req, res) => {

    const memoryUsage = process.memoryUsage();

    res.json({
        rss_MB: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsed_MB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotal_MB: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        leakObjects: memoryLeak.length
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
