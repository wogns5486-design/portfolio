const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const BLOG_DIR = __dirname;
const WRITE_URL = 'https://blog.naver.com/wogns4569?Redirect=Write';

// 글 파일 목록 (순서대로)
const files = [
  '글01_홈페이지_제작_비용.txt',
  '글02_랜딩페이지_vs_홈페이지.txt',
  '글03_외주_실패하는_이유.txt',
  '글04_반응형_웹이란.txt',
  '글05_스타트업_MVP.txt',
  '글06_웹앱_vs_네이티브앱.txt',
  '글07_관리자_대시보드.txt',
  '글08_외주_견적서_읽는법.txt',
  '글09_프로젝트_후기_포트폴리오.txt',
  '글10_자주_묻는_질문.txt',
];

function copyToClipboard(text) {
  // Windows clip 명령어 사용
  const proc = require('child_process').spawnSync('clip', { input: text, encoding: 'utf-8' });
}

function openBrowser(url) {
  execSync(`start "" "${url}"`, { shell: true });
}

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let category = '';
  let title = '';
  let body = '';
  let bodyStart = false;

  for (const line of lines) {
    if (line.startsWith('【카테고리】')) {
      category = line.replace('【카테고리】', '').trim();
    } else if (line.startsWith('【제목】')) {
      title = line.replace('【제목】', '').trim();
      bodyStart = true;
    } else if (bodyStart) {
      body += line + '\n';
    }
  }

  return { category, title, body: body.trim() };
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise(r => rl.question(q, r));

  console.log('');
  console.log('========================================');
  console.log('  네이버 블로그 글쓰기 도우미');
  console.log('  글 ' + files.length + '개 준비됨');
  console.log('========================================');
  console.log('');

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(BLOG_DIR, files[i]);

    if (!fs.existsSync(filePath)) {
      console.log(`[${i + 1}] ${files[i]} — 파일 없음, 건너뜀`);
      continue;
    }

    const { category, title, body } = parseFile(filePath);

    console.log(`──────────────────────────────────`);
    console.log(`[${i + 1}/${files.length}] ${files[i]}`);
    console.log(`  카테고리: ${category}`);
    console.log(`  제목: ${title}`);
    console.log(`──────────────────────────────────`);

    // Step 1: 제목 복사 + 브라우저 열기
    await ask('\n  Enter 누르면 → 제목이 클립보드에 복사되고 글쓰기 페이지가 열립니다...');
    copyToClipboard(title);
    openBrowser(WRITE_URL);
    console.log('  ✅ 제목 복사됨! 블로그 글쓰기 페이지에서 제목란에 Ctrl+V 하세요.');
    console.log(`  📁 카테고리: "${category}" 선택하세요.`);

    // Step 2: 본문 복사
    await ask('\n  제목 붙여넣기 + 카테고리 선택 했으면 Enter...');
    copyToClipboard(body);
    console.log('  ✅ 본문 복사됨! 본문 영역에 Ctrl+V 하세요.');

    // Step 3: 발행 대기
    await ask('\n  본문 붙여넣기 + 발행 완료했으면 Enter (다음 글로 넘어감)...');
    console.log(`  ✅ [${i + 1}/${files.length}] 완료!\n`);
  }

  console.log('========================================');
  console.log('  🎉 전체 ' + files.length + '개 글 작성 완료!');
  console.log('========================================');

  rl.close();
}

main();
