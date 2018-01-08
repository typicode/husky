# Hooks

Husky supports all [git](https://git-scm.com/docs/githooks) / [mercurial](https://www.mercurial-scm.org/repo/hg/help/hgrc) hooks.
Simply add the corresponding `npm script` to your `package.json`.

#### git

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

#### Mercurial / hg

| hg hook | npm script |
| -------- | ---------- |
| changegroup | changegroup |
| commit | commit |
| incoming | incoming |
| outgoing| outgoing |
| post-<command> | post<command> |
| fail-<command> | fail<command> |
| pre-<command> | pre<command> |
| prechangegroup | prechangegroup |
| precommit | precommit |
| prelistkeys | prelistkeys |
| preoutgoing | preoutgoing |
| prepushkey | prepushkey |
| pretag | pretag |
| pretxnopen | pretxnopen |
| pretxnclose | pretxnclose |
| txnclose | txnclose |
| txnabort | txnabort |
| pretxnchangegroup | pretxnchangegroup |
| pretxncommit | pretxncommit |
| preupdate | preupdate |
| listkeys | listkeys |
| pushkey | pushkey |
| tag | tag |
| update | update |