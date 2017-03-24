# CHANGELOG

## 0.13.3

* Revert `Fixes issue with OS X + brew where nvm was loaded even when npm was already present` that was introduced in `v0.13.0` as it was preventing Husky to load `nvm` in some cases [#106](https://github.com/typicode/husky/issues/106)

## 0.13.2

* Fixes issue [#103](https://github.com/typicode/husky/issues/103)

## 0.13.1

* Makes it easier for projects to transition from [ghooks](https://github.com/gtramontina/ghooks) by detecting ghooks installed scripts and automatically migrating them

## 0.13.0

* Makes `husky` a little less verbose by default
* Fixes issue with `OS X + brew` where `nvm` was loaded even when `npm` was already present
* Fixes issue with Git `v1.9` on Windows
* Prevents Git hooks being installed when husky is in a sub `node_modules` directory (i.e. `./node_modules/A/node_modules/husky`)

## 0.12.0

* Adds Git submodule support
* Adds Cygwin support
* Improves edge cases support (`.git` not found and `git` not in `PATH`)
* If `npm` is already present in path, doesn't load `nvm` default or `.nvmrc` version, which makes things faster in terminal. In GUI apps, the behavior is unchanged.
