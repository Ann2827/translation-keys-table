import spawn from 'cross-spawn';

process.on('unhandledRejection', (err) => {
  throw err;
});

export function main() {
  const result = spawn.sync(
    process.execPath,
    // eslint-disable-next-line unicorn/prefer-module, unicorn/prefer-spread
    [require.resolve('../lib/index.mjs')],
    { stdio: 'inherit' },
  );

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      throw new Error(
        'The script failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.',
      );
    } else if (result.signal === 'SIGTERM') {
      throw new Error(
        'The script failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.',
      );
    }
  }
}

// eslint-disable-next-line unicorn/prefer-module
if (require.main === module) {
  main();
}
