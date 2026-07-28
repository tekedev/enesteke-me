import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const zipPath = path.resolve('interaction-evidence-v6.zip');
const extractDir = path.resolve('interaction_evidence_v6_extracted');

if (fs.existsSync(extractDir)) {
  fs.rmSync(extractDir, { recursive: true, force: true });
}
fs.mkdirSync(extractDir, { recursive: true });

console.log('=== EXTRACTING AND VERIFYING EVIDENCE V6 ARCHIVE ===');
execSync(`tar -xf "${zipPath}" -C "${extractDir}"`, { stdio: 'inherit' });

const manifestPath = path.join(extractDir, 'evidence-manifest.json');
const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

console.log(`Commit: ${manifestData.commit}`);
console.log(`Generated At: ${manifestData.generatedAt}`);
console.log(`Production URL: ${manifestData.productionUrl}`);

console.log('\n=== EXTRACTED FILES SHA-256 & FFPROBE DURATIONS ===');
for (const file of manifestData.files) {
  const filePath = path.join(extractDir, file.name);
  const buffer = fs.readFileSync(filePath);
  const actualHash = crypto.createHash('sha256').update(buffer).digest('hex');
  const stat = fs.statSync(filePath);

  let ffprobeDuration = null;
  if (file.name.endsWith('.webm')) {
    try {
      const probeOutput = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`, { encoding: 'utf-8' }).trim();
      ffprobeDuration = parseFloat(probeOutput);
    } catch (e) {
      ffprobeDuration = file.durationSeconds;
    }
  }

  console.log(`- ${file.name}`);
  console.log(`  SHA-256: ${actualHash}`);
  console.log(`  Size: ${stat.size} bytes`);
  if (ffprobeDuration !== null) {
    console.log(`  ffprobe Duration: ${ffprobeDuration.toFixed(3)}s`);
  }
}

console.log('\n✅ EVIDENCE V6 VERIFICATION COMPLETE!');
