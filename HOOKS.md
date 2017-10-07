# Hooks

Husky supports all git hooks (https://git-scm.com/docs/githooks). Simply add the corresponding `npm script` to your `package.json`.

| Git hook | npm script |
| -------- | ---------- |
| applypatch-msg | applypatchmsg |
| commit-msg | commitmsg |
| post-applypatch | postapplypatch |
| post-checkout | postcheckout |
| post-commit | postcommit |
| post-merge | postmerge |
| post-receive | postreceive |
| post-rewrite | postrewrite |
| post-update | postupdate |
| pre-applypatch | preapplypatch |
| pre-auto-gc | preautogc |
| pre-commit | precommit |
| pre-push | prepush |
| pre-rebase | prerebase |
| pre-receive | prereceive |
| prepare-commit-msg | preparecommitmsg |
| push-to-checkout | pushtocheckout |
| update | update |
| sendemail-validate | sendemailvalidate |

## Advice

Advice on how to use specific hooks.

### commit-msg

Unlike the `commit-msg` git hook, Husky does not pass the commit message in to the `commitmsg` script. Scripts that want to examine the commit message must read the commit message itself. This can be done by reading `.git/COMMIT_EDITMSG`. For example, in Javascript, the commit message script could read the commit message with:

    var vs = require('fs');

    const commitMessage = fs.readFileSync('./git/COMMIT_EDITMSG', 'utf8');

