import app from './app.mjs';


const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`  Server running on port ${port}`));
