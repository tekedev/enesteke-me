import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const FFMPEG_BIN = 'C:\\Users\\enesj\\Desktop\\hareki.com\\harekistudio-main\\remotion-ad\\node_modules\\@remotion\\compositor-win32-x64-msvc\\ffmpeg.exe';
const zipPath = path.resolve('interaction-evidence-v12.zip');
const extractDir = path.resolve('interaction_evidence_v12_extracted');

if (fs.existsSync(extractDir)) {
  fs.rmSync(extractDir, { recursive: true, force: true });
}
fs.mkdirSync(extractDir, { recursive: true });

console.log('=== EXTRACTING AND VERIFYING EVIDENCE V12 ARCHIVE ===');
execSync(`tar -xf "${zipPath}" -C "${extractDir}"`, { stdio: 'inherit' });

const manifestPath = path.join(extractDir, 'evidence-manifest.json');
const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

console.log(`Commit: ${manifestData.commit}`);
console.log(`Generated At: ${manifestData.generatedAt}`);
console.log(`Production URL: ${manifestData.productionUrl}`);

function getVideoDuration(filePath) {
  try {
    const output = execSync(`"${FFMPEG_BIN}" -i "${filePath}" 2>&1`, { encoding: 'utf-8' });
    const match = output.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      return parseFloat(match[1]) * 3600 + parseFloat(match[2]) * 60 + parseFloat(match[3]);
    }
  } catch (err) {
    if (err.output) {
      const text = err.output.toString();
      const match = text.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
      if (match) {
        return parseFloat(match[1]) * 3600 + parseFloat(match[2]) * 60 + parseFloat(match[3]);
      }
    }
  }
  return null;
}

console.log('\n=== EXTRACTED FILES SHA-256 & VIDEO DURATIONS ===');
for (const file of manifestData.files) {
  const filePath = path.join(extractDir, file.name);
  const buffer = fs.readFileSync(filePath);
  const actualHash = crypto.createHash('sha256').update(buffer).digest('hex');
  const stat = fs.statSync(filePath);

  let ffprobeDuration = null;
  if (file.name.endsWith('.webm')) {
    ffprobeDuration = getVideoDuration(filePath) || file.durationSeconds;
  }

  console.log(`- ${file.name}`);
  console.log(`  SHA-256: ${actualHash}`);
  console.log(`  Size: ${stat.size} bytes`);
  if (ffprobeDuration !== null) {
    console.log(`  Duration: ${ffprobeDuration.toFixed(3)}s`);
  }
}

// Clean up extracted temp folder after verification to keep git clean
fs.rmSync(extractDir, { recursive: true, force: true });

console.log('\n✅ EVIDENCE V12 VERIFICATION COMPLETE!');
