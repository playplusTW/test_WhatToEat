import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import pkg from '../package.json' assert { type: 'json' };

async function main() {
  const commit = execSync('git rev-parse --short HEAD').toString().trim();
  const date = new Date().toISOString();
  const content = `# ${pkg.name}

Built with [Vite](https://vitejs.dev).

- **Version**: ${pkg.version}
- **Last commit**: ${commit}
- **Generated**: ${date}

## Development

\`\`\`bash
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`
`;
  await fs.writeFile('README.md', content);
}

main();
