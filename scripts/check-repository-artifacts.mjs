import { execFileSync } from 'child_process';

console.log('=== CHECKING FOR TRACKED EVIDENCE ARTIFACTS IN GIT ===');

const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

const forbiddenRegex = /interaction[_-]evidence|screenshots|\.webm$|contact-sheet|playwright-report|test-results/;
const forbidden = tracked.filter((file) => forbiddenRegex.test(file));

if (forbidden.length > 0) {
  console.error('❌ FORBIDDEN TRACKED ARTIFACTS FOUND:');
  forbidden.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}

console.log('✅ REPOSITORY CLEAN: No tracked evidence artifacts found!');
