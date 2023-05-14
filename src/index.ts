import { initServer } from './app';


async function main() {
  const app = await initServer();
  app.listen(8000, () => {
    console.log('Server listening on port 8000');
  });
}

main();