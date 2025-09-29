// Minimal CI smoke test for the abguard project
// Exits with 0 on success, non-zero on failure.

const fs = require('fs');
const path = require('path');

function fail(msg) {
  console.error('CI TEST FAIL:', msg);
  process.exit(1);
}

try {
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  // Check Node is available
  if (typeof process.version !== 'string') {
    fail('Node.js not available');
  }

  // Check Next and React are installed (not strictly required for CI but good smoke)
  const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
  ['next', 'react', 'react-dom'].forEach((d) => {
    if (!deps[d]) {
      console.warn(`ci-test warning: dependency ${d} not listed in package.json`);
    }
  });

  console.log('ci-test: Node version', process.version);
  console.log('ci-test: package name', pkg.name, pkg.version);
  console.log('ci-test: OK');
  process.exit(0);
} catch (err) {
  fail(err && err.message ? err.message : String(err));
}
