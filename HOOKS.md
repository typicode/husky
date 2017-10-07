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

Scripts that want to hoook into `commit-msg` must read the commit message themselves; it is not passed in `process.argv`. Instead, the hook script must load the commit message itself. For example, a script could check the message by reading `.git/COMMIT_EDITMSG`. For example, with node,

    var vs = require('fs');

    const commitMessage = fs.readFileSync('./git/COMMIT_EDITMSG', 'utf8');

