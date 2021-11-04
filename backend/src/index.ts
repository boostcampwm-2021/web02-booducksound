import 'dotenv/config';
import './db';
import server from './server';

const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
