const app = require('./app');
const { port } = require('./config/config');
const connectDB = require('./config/db');

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
