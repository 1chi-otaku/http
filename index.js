import http from 'http';
import { appendFile } from 'fs';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <html>
                <body>
                    <h2>Enter your information:</h2>
                    <form method="POST" action="/">
                        <label>Name: <input type="text" name="name"></label><br>
                        <label>Email: <input type="email" name="email"></label><br>
                        <label>Password: <input type="password" name="pwd"></label><br>
                        <input type="submit" value="Submit">
                    </form>
                </body>
            </html>
        `);
        res.end();
    } else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const data = {
                name: params.get('name'),
                email: params.get('email'),
                pwd: params.get('pwd')
            };

            const newData = `${data.name}, ${data.email}, ${data.pwd}\n`;

            appendFile('data.txt', newData, (err) => {
                if (err) throw err;
                console.log('Data appended to file.');
            });

            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('Succss yahoo.');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
