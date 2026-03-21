# 사용 방법

## 새로운 훅 추가하기

훅을 추가하는 것은 파일 하나를 만드는 것만큼 간단합니다. 선호하는 편집기, 스크립트, 또는 단순한 echo 명령어를 사용할 수 있습니다. 예를 들어, Linux/macOS에서는 다음과 같이 사용할 수 있습니다:
```shell
echo "npm test" > .husky/pre-commit
```

## 스크립트 파일 시작하기

Husky는 훅을 실행하기 전에 로컬 명령을 실행할 수 있도록 해줍니다. 다음 파일들에서 명령을 읽어옵니다:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (더 이상 사용되지 않음)

Windows에서는: `C:\Users\사용자이름\.config\husky\init.sh`

## Git 훅 건너뛰기

### 단일 명령어에서

대부분의 Git 명령은 `-n` 또는 `--no-verify` 옵션으로 훅을 건너뛸 수 있습니다:

```sh
git commit -m "..." -n # Git 훅 건너뜀
```

해당 옵션이 없는 명령어의 경우, `HUSKY=0`을 사용해 일시적으로 비활성화 할 수 있습니다:

```shell
HUSKY=0 git ... # 일시적으로 훅 비활성화
git ... # 다시 훅 활성화
```

### 여러 명령어에서

여러 명령을 실행해야 하는 경우 다음처럼 사용합니다 (예시: rebase나 merge중에):

```shell
export HUSKY=0 # 훅 비활성화
git ...
git ...
unset HUSKY # 훅 다시 활성화
```

### GUI 또는 전체 시스템에서 비활성화

GUI 클라이언트나 전체 시스템에서 비활성화 하려면 husky 설정 파일을 수정하세요:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # 이 시스템에서는 husky도 훅도 설치되지 않음
```

## CI 서버 및 Docker 환경

CI 서버나 Docker 컨테이너에서 Git 훅 설치를 피하려면 `HUSKY=0`을 설정하세요. 예를 들어 GitHub Actions에서는 다음과 같이 사용합니다:

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

만약 `dependencies`만 설치하고 `devDependencies`는 생략한다면, husky는 설치되지 않았기에 `"prepare": "husky"`스크립트는 실패할 것입니다.

여러 가지 해결 방법이 있습니다.

`prepare` 스크립트 수정하기:

```json
// package.json
"prepare": "husky || true"
```

이 경우 출력에 명령어가 없다는 에러 메세지가 다음과 같이 나타날 수 있습니다 `command not found`. 이 메세지를 숨기려면 `.husky/install.mjs`파일을 생성하세요:

<!-- Since husky may not be installed, it must be imported dynamically after prod/CI check  -->
```js
// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

그리고 `prepare`를 설정하세요:

```json
"prepare": "node .husky/install.mjs"
```

## 커밋 없이 훅 테스트하기

훅을 테스트하려면 스크립트에 `exit 1`을 추가해 Git 명령을 중단시킬 수 있습니다:

```shell
# .husky/pre-commit

# 당신이 작업 중인 스크립트...
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# 커밋이 생성되지 않음
```

## 프로젝트가 Git 루트 디렉토리에 없을 경우

보안상의 이유로 Husky는 상위 디렉토리(`../`)에 설치되지 않습니다. 하지만 `prepare` 스크립트에서 디렉토리를 변경해 사용할 수 있습니다.

예시 프로젝트 구조:

```
.
├── .git/
├── backend/  # package.json 없음
└── frontend/ # package.json 및 husky 있음
```

`prepare` 스크립트를 이렇게 설정하세요:

```json
"prepare": "cd .. && husky frontend/.husky"
```

훅 스크립트 안에서 작업해야 할 하위 디렉토리로 디렉토리를 다시 변경하세요:

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## 셸이 아닌 훅

스크립트 언어가 필요한 명령어를 훅에서 실행하려면, 각 훅마다 아래와 같은 패턴을 사용하세요:

(예시: `pre-commit`훅과 NodeJS 사용)
1. 훅을 위한 진입점을 만드세요:
    ```shell
    .husky/pre-commit
    ```
2. 파일 안에 아래 코드를 추가해주세요:
    ```shell
    node .husky/pre-commit.js
    ```
3. 그리고 `.husky/pre-commit.js`라는 파일을 생성해 여기에 NodeJS 코드를 작성합니다:
   ```javascript
   // 여기에 NodeJS 코드 작성
   // ...
   ```

## Bash 사용

훅 스크립트는 가능한 최고의 호환성을 위해 POSIX 규격을 준수해야 합니다. 모든 사용자가 `bash`를 사용하는 것은 아니기 때문입니다 (예시: Windows 사용자).

하지만 팀에서 Windows를 사용하지 않는다면, 아래와 같이 Bash를 사용할 수 있습니다:

```shell
# .husky/pre-commit

bash << EOF
# 여기에 bash 스크립트를 작성하세요
# ...
EOF
```

## Node 버전 관리자와 GUI 환경

Node를 버전 관리자(`nvm`, `n`, `fnm`, `asdf`, `volta` 등...)를 통해 설치하고 GUI 환경에서 Git 훅을 사용하는 경우, `command not found` 오류가 발생할 수 있습니다. 이는 `PATH` 환경 변수 문제로 인해 발생합니다.

### `PATH`와 버전 관리자 이해하기

`PATH`는 디렉터리 목록을 담은 환경 변수로, 셸은 여기에 포함된 디렉터리에서 명령어를 찾습니다. 명령어를 찾을 수 없으면 `command not found` 오류가 발생합니다.

셸에서 `echo $PATH` 명령을 실행하면 현재 PATH의 내용을 확인할 수 있습니다.

버전 관리자는 다음과 같은 방식으로 동작합니다:
1. 셸 시작 파일 (`.zshrc`, `.bashrc` 등...)에 초기화 코드를 추가합니다. 이 코드는 터미널을 열 때마다 실행됩니다.
2. 여러 버전의 Node를 사용자 홈 디렉터리에 다운로드합니다.

예를 들어, 두 개의 Node 버전이 설치되어 있다면:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

터미널을 열면 버전 관리자가 초기화되고, 하나의 버전(예시: `Node-Y`)을 선택하여 해당 경로를 `PATH` 앞부분에 추가합니다:

```shell
echo $PATH
# 출력 예시
~/version-manager/Node-Y/:...
```

이제 node 명령은 `Node-Y`를 가리킵니다. `Node-X`로 전환하면 `PATH`도 그에 맞게 바뀝니다:

```shell
echo $PATH
# 출력 예시
~/version-manager/Node-X/:...
```

문제는 GUI에서 애플리케이션을 실행할 경우, 터미널처럼 버전 관리자가 초기화되지 않는다는 점입니다. 결과적으로 `PATH`에 Node 경로가 포함되지 않아 Git 훅이 실패할 수 있습니다.

### 해결 방법

Husky는 각 Git 훅 전에 `~/.config/husky/init.sh`를 실행합니다. 이 파일에 버전 관리자 초기화 코드를 복사하면 GUI 환경에서도 제대로 동작합니다.

`nvm` 사용 예시:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # nvm 로드
```

또는, 셸 시작 파일이 빠르고 가볍다면 그 파일을 직접 불러올 수도 있습니다:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## 수동 설정

Git 설정이 완료되어 있어야 하고, Husky는 `.husky/` 디렉터리에 파일을 설정해야 합니다.

레포지토리에서 한 번 `husky` 명령어를 실행하세요. 일반적으로 `package.json`의 `prepare` 스크립트에 추가하여 설치 후 자동 실행되도록 하는 것을 권장합니다.

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
    // Yarn은 prepare 스크립트를 지원하지 않음
    "postinstall": "husky",
    // npmjs.com에 배포할 경우 필요
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

`prepare`를 한 번 실행하세요:

::: code-group

```sh [npm]
npm run prepare
```

```sh [pnpm]
pnpm run prepare
```

```sh [yarn]
# Yarn은 `prepare`를 지원하지 않음
yarn run postinstall
```

```sh [bun]
bun run prepare
```

:::

`.husky/` 디렉터리에 `pre-commit` 파일을 생성하세요:

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
