const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/oi', (req, res) => {
    res.send('oi');
});

app.get('/getPDF', async (req, res) => {
    const url = 'https://www.churchofjesuschrist.org/bc/content/shared/content/portuguese/pdf/language-materials/83800_por.pdf';

    try {
        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': userAgent
            }
        });

        const pdfBase64 = Buffer.from(response.data, 'binary').toString('base64');

        res.json({ base64: pdfBase64 });
    } catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).json({ error: 'Failed to fetch the PDF' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
