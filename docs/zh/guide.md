# 指南

## Monorepo

建议在根目录下的 `package.json` 中添加 husky。你可以使用诸如 [lerna](https://github.com/lerna/lerna) 和 filter 之类的工具来仅在已更改的包中运行脚本。

## 自定义目录

如果你想在另一个目录安装 husky，比如 `.config` 目录，你可以在 `install` 命令后面添加参数。示例如下：

::: code-group

```js [package.json]
{
  "scripts": {
    "prepare": "husky install .config/husky"
  }
}
```

:::

另一种情况，如果你的 `package.json` 文件和 `.git` 目录不在同一级目录。例如，`project/.git` 和 `project/front/package.json`。

设计上，`husky install` 必须运行在于 `.git` 相同的目录，但是你可以通过在 `prepare` 脚本中传入一个子目录来改变目录：

::: code-group

```js [package.json]
{
  "scripts": {
    "prepare": "cd .. && husky install front/.husky"
  }
}
```

:::

在你的 hooks 中，你也需要去更改目录：

::: code-group

```shell [.husky/pre-commit]
# ...
cd front
npm test
```

:::

## 绕过 hooks

你能使用 Git命令的 `-n/--no-verify` 选项来绕过 `pre-commit` 和 `commit-msg` hooks：

```shell
git commit -m "yolo!" --no-verify
```

对于没有使用 `--no-verify` 选项的 Git 命令，你可以使用 `HUSKY` 环境变量：

```shell
HUSKY=0 git push # yolo!
```

## 在 CI/Docker/Prod 中禁用 husky

在 CI/Docker/Prod上下文中禁用 husky 没有对错之分，这在很大程度上 **取决于你的使用情况**。

### 使用 npm

如果你想阻止 husky 完全安装

```shell
npm ci --omit=dev --ignore-scripts
```

或者，你也能明确地禁用 `prepare` 脚本

```shell
npm pkg delete scripts.prepare
npm ci --omit=dev
```

### 使用自定义脚本

您可以创建一个自定义 JS 脚本，有条件地要求使用 husky 和安装 hooks。

::: code-group

```json [package.json]
"prepare": "node ./prepare.js"
```

```js [prepare.js]
const isCi = process.env.CI !== undefined
if (!isCi) {
  require('husky').install()
}
```

:::

或者在未安装 husky 的情况下，让 `prepare` 脚本无声地失败：
Or make `prepare` script fail silently if husky is not installed:

```json [package.json]
"prepare": "node -e \"try { require('husky').install() } catch (e) {if (e.code !== 'MODULE_NOT_FOUND') throw e}\""
```

### 使用环境变量

你可以在你的 CI 配置文件中，将 `HUSKY` 环境变量设置为 `0`，来禁用 hooks 安装。

另外，大多数持续集成服务器都会设置一个 `CI` 环境变量。你可以在钩子中使用它来检测是否在 CI 中运行。

::: code-group

```shell [.husky/pre-commit]
# ...
[ -n "$CI" ] && exit 0
```

:::

### 使用 is-ci

您还可以在 `prepare` 脚本中使用 [is-ci](https://github.com/watson/is-ci)，有条件地安装 husky

```shell
npm install is-ci --save-dev
```

::: code-group

```js [package.json]
{
  "scripts": {
    "prepare": "is-ci || husky install"
  }
}
```

:::

## 测试 hooks

如果要测试 hook，可以在脚本末尾添加 `exit 1` 来终止 git 命令。

::: code-group

```shell [.husky/pre-commit]
# ...
exit 1 # Commit will be aborted
```

:::

## Git-flow

如果使用 [git-flow](https://github.com/petervanderdoes/gitflow-avh/)，需要确保 git-flow hooks 目录设置为使用 husky（默认为 `.husky`）。

```shell
git config gitflow.path.hooks .husky
```

**注意:**

- 如果在安装 husky 之后配置 git-flow，那么 git-flow 设置过程将正确地建议使用 `.husky` 目录。
- 如果您已经为 husky 设置了一个 [自定义目录](#自定义目录)，那么您需要指定这个目录(比如 `git config gitflow. path.hooks. config/husky`)

要将 Git-flow hook 目录 **恢复** 到默认目录，需要重置配置，使其指向默认的 Git hook 目录。

```shell
git config gitflow.path.hooks .git/hooks
```
