# CHANGELOG

## 0.13.0

* Makes `husky` a little less verbose by default
* Fixes issue with `OS X + brew` where `nvm` was loaded even when `npm` was already present
* Fixes issue with Git `v1.9` on Windows
* Prevents Git hooks being installed when husky is in a sub `node_modules` directory (i.e. `./node_modules/A/node_modules/husky`)

## 0.12.0 (stable)

* Adds Git submodule support
* Adds Cygwin support
* Improves edge cases support (`.git` not found and `git` not in `PATH`)
* If `npm` is already present in path, doesn't load `nvm` default or `.nvmrc` version, which makes things faster in terminal. In GUI apps, the behavior is unchanged.
