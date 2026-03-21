# 문제 해결

## 명령어를 찾을 수 없음 (Command not found)

해결 방법은 [사용 방법](how-to) 문서를 참고하세요.

## 훅이 실행되지 않음

1. 파일 이름이 정확한지 확인하세요.
예를 들어, `precommit` 또는 `pre-commit.sh`는 잘못된 이름입니다. 유효한 이름은 Git 훅 [공식 문서](https://git-scm.com/docs/githooks) 를 참고하세요.
2. `git config core.hooksPath` 명령어를 실행하여 출력 결과가 `.husky/_` (혹은 본인이 설정한 커스텀 훅 디렉토리)로 되어 있는지 확인하세요.
1. 사용 중인 Git 버전이 `2.9` 이상인지 확인하세요.

## Husky 제거 후 `.git/hooks/`가 작동하지 않음

만약 `husky`를 제거한 후 `.git/hooks/`의 훅들이 작동하지 않는다면, `git config --unset core.hooksPath` 명령어를 실행해보세요.

## Windows에서 Yarn 사용 시 문제

Windows에서 Git Bash를 사용하면서 Yarn으로 훅을 실행하면
(`stdin is not a tty`) 오류가 발생할 수 있습니다. Windows 사용자라면 아래 해결 방법을 적용하세요:

1. `.husky/common.sh`파일을 생성하고 다음 내용을 입력합니다:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Windows 10, Git Bash 및 Yarn을 위한 임시 해결책
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Yarn 명령어가 실행되는 곳에서 소스로 사용하세요:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```
