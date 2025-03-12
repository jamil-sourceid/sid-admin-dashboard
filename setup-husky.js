const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Initializing Husky setup...');

// Check if .husky directory exists
if (!fs.existsSync('.husky')) {
  console.error("Error: Husky is not initialized. Run 'yarn prepare' first.");
  process.exit(1);
}

const isWindows = process.platform === 'win32';
const huskyHooks = ['pre-commit', 'commit-msg', 'pre-push'];

try {
  huskyHooks.forEach((hook) => {
    const hookPath = path.join('.husky', hook);
    if (fs.existsSync(hookPath)) {
      if (isWindows) {
        execSync(`git update-index --chmod=+x "${hookPath}"`);
        console.log(`Updated permissions for ${hookPath}`);
      } else {
        execSync(`chmod +x "${hookPath}"`);
        console.log(`Updated permissions for ${hookPath}`);
      }
    }
  });

  console.log("Husky hooks are set up and executable. You're good to go!");
} catch (error) {
  console.error('Error setting up Husky hooks:', error.message);
  process.exit(1);
}
