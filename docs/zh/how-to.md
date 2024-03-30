# 如何使用

## 添加新 Hook

添加 hook 与创建文件一样简单。可以通过你喜欢的编辑器、脚本或 echo 命令来实现。例如，在 Linux/macOS 中：
```shell
echo "npm test" > .husky/pre-commit
```

## 启动文件

Husky 允许你在运行钩子之前执行本地命令。它从这些文件中读取命令：

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (已弃用)

Windows 系统：`C:\Users\yourusername\.config\husky\init.sh`

## 跳过 Git 钩子

### 对于单个命令

大多数 Git 命令都包含一个 `-n/--no-verify` 选项来用于跳过钩子：

```sh
git commit -m "..." -n # 跳过 Git 钩子
```

对于没有使用此标识的命令，使用 HUSKY=0 来临时禁用钩子：

```shell
HUSKY=0 git ... # 临时禁用所有 Git 钩子
git ... # 钩子会再次运行
```

### 对于多个命令

在一个较长的时间里禁用钩子（例如，在变基或者合并期间）：

```shell
export HUSKY=0 # 禁用所有 Git 钩子
git ...
git ...
unset HUSKY # 重新启用钩子
```

### 对于 GUI 或全局

要在 GUI 客户端或全局禁用 Git 钩子，请修改 Husky 配置:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # Husky 不会安装，也不会再你的机器上运行钩子
```

## CI 服务器和 Docker

要避免在 CI 服务器或 Docker 中安装 Git 钩子，请使用 `HUSKY=0`。例如，在 GitHub Actions 中：

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

如果只安装 `dependencies`（不是 `devDependencies`），`"prepare": "husky"` 脚本可能会失败，因为 Husky 不会被安装。

你有多种解决方案。

修改 `prepare` 脚本使其永远不会失败：

```json
// package.json
"prepare": "husky || true"
```

你仍然会在输出中看到一个 `command not found` 的错误消息，这可能会让你很感到困惑。为了让它消失，创建 `.husky/install.mjs`：

<!-- Since husky may not be installed, it must be imported dynamically after prod/CI check  -->
```js
// 在生产环境或 CI 环境中跳过 Husky 的安装
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

然后，在 `prepare` 脚本中使用它：

```json
"prepare": "node .husky/install.mjs"
```

## 测试钩子

要测试一个钩子，将 `exit 1` 添加到钩子脚本以中止 Git 命令:

```shell
# .husky/pre-commit

# 你的 WIP 脚本
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# 提交不会被创建
```

## 项目不在 Git 根目录

出于安全考虑，Husky 不会安装在父目录（`../`）中。但是，你可以在 `prepare` 脚本中更改目录。

考虑一下这个项目结构：

```
.
├── .git/
├── backend/  # 没有 package.json
└── frontend/ # package.json 中带有 husky
```

像这样设置你的 prepare 脚本：

```json
"prepare": "cd .. && husky frontend/.husky"
```

在你的 hook 脚本中，将目录切换回相关的子目录：

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## 非 shell 脚本钩子

为了运行需要使用脚本语言的脚本，对每个适用的钩子使用以下模式：

（使用钩子 `pre-commit` 和 NodeJS 的示例）
1. 为钩子创建一个入口：
    ```shell
    .husky/pre-commit
    ```
2. 在文件中添加以下内容：
    ```shell
    node .husky/pre-commit.js
    ```
3. 在 `.husky/pre-commit.js` 文件中：
   ```javascript
   // 你的 NodeJS 代码
   // ...
   ```

## Bash

钩子脚本需要与 POSIX 兼容，以确保最佳兼容性，因为并非每个人都有 bash (例如 Windows 用户)。

也就是说，如果你的团队不使用 Windows，你可以这样使用 Bash：

```shell
# .husky/pre-commit

bash << EOF
# Put your bash script inside
# ...
EOF
```

## Node 版本管理器和 GUI

如果您在 GUI 中使用 Git 钩子，并通过版本管理器（比如 `nvm`、`n`、`fnm`、`asdf`、`volta` 等等）安装 Node，由于 `PATH` 环境变量问题，你可能会遇到 `command not found` 报错。

### 了解 `PATH` 和版本管理器

`PATH` 是一个包含目录列表的环境变量，你的 shell 在这些目录中检索命令，如果没找到这个命令，你就会得到一个 `command not found` 报错。

在 shell 中运行 `echo $PATH` 来查看其内容。

版本管理器的工作方式如下：
1. 将初始化代码添加到 shell 启动文件（`.zshrc`、`.bashrc` 等），它会在每次打开终端时运行。
2. 将 Node 版本下载到主文件夹下的目录中。

例如，如果你有两个 Node 版本：

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

打开终端将初始化版本管理器，它将选择一个版本（比如 `Node-Y`）并预先设置其到 `PATH` 的路径:

```shell
echo $PATH
# 输出
~/version-manager/Node-Y/:...
```

现在，Node 指向 `Node-Y`。切换到 `Node-X` 时会相应地改变 `PATH`：

```shell
echo $PATH
# 输出
~/version-manager/Node-X/:...
```

出现这个问题是因为在终端之外启动的 GUI 没有初始化版本管理器，导致 `PATH` 没有 Node 安装路径。因此，来自 GUI 的 Git 钩子常常会失败。

### 解决方案

husky 在每个钩子之前都会执行 `~/.config/husky/init.sh`。将版本管理器初始化代码复制到这里，以确保在 GUI 中运行。

`nvm` 示例:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # 加载 nvm
```

或者，如果你的 shell 启动文件快速且轻量，也可以直接使用：

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## 手动设置

Git 需要配置，husky 需要在 `.husky/` 中设置文件。

在仓库中运行一次 `husky` 命令。理想情况下，将其设置在 `package.json` 的 `prepare` 脚本中，以便每次安装后自动执行<Badge type="tip" text="推荐" />。

::: code-group

```json [npm]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

```json [pnpm]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

```json [yarn]
{
  "scripts": {
    // Yarn 不支持 prepare 脚本
    "postinstall": "husky",
    // 如果发布到 npmjs.com，需要加上这个
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

```json [bun]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

:::

运行一次 `prepare`：

::: code-group

```sh [npm]
npm run prepare
```

```sh [pnpm]
pnpm run prepare
```

```sh [yarn]
# Yarn 不支持 `prepare`
yarn run postinstall
```

```sh [bun]
bun run prepare
```

:::

在 `.husky/` 目录中创建一个 `pre-commit` 文件：

::: code-group

```shell [npm]
# .husky/pre-commit
npm test
```

```shell [pnpm]
# .husky/pre-commit
pnpm test
```

```shell [yarn]
# .husky/pre-commit
yarn test
```

```sh [bun]
# .husky/pre-commit
bun test
```

:::
