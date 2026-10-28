import { execSync } from 'node:child_process';

// Versão do site, tirada do git na hora do build: cada publicação na main gera uma nova.
// Formato v2026.10.28 (data do último commit) + hash curto, que leva ao commit no GitHub.
const git = (cmd: string) => {
  try {
    return execSync(`git ${cmd}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
};

const data = git('log -1 --format=%cs'); // AAAA-MM-DD
const hash = git('rev-parse --short=7 HEAD');

export const versao = {
  nome: `v${(data || new Date().toISOString().slice(0, 10)).replaceAll('-', '.')}`,
  hash,
  url: hash ? `https://github.com/jcrouzillard/jcrouzillard.github.io/commit/${hash}` : '',
};
