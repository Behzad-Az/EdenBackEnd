import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';
import propertiesRoutes from './routes/properties.js';
import projectsRoutes from './routes/projects.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/projects', projectsRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

app.get('/', (req, res) => {
  res.send('Hello from homepage');
});