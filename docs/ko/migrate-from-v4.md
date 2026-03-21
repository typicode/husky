# v4에서 마이그레이션

`package.json` 스크립트를 `npm`이나 `yarn`을 사용하여 호출하고 있었다면, **명령어를 그대로 복사**하여 해당 훅에 붙여넣으면 됩니다:

Husky v4

```json
// package.json
{
  "hooks": {
    "pre-commit": "npm test && npm run foo" // [!code hl]
  }
}
```

Husky v9

```shell 
# .husky/pre-commit
# 이제 여러 줄로 명령어를 작성할 수 있습니다
npm test // [!code hl]
npm run foo // [!code hl]
```

만약 로컬에 설치된 바이너리를 직접 호출하고 있었다면,
이제는 **반드시 패키지 매니저를 통해 실행**해야 합니다:

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "pre-commit": "jest"
  }
}
```

```shell [.husky/pre-commit (v9)]
jest
```

:::

또한, 환경 변수 `HUSKY_GIT_PARAMS`는 이제 네이티브 Git 인자 변수인 `$1`, `$2` 등으로 대체되었습니다.

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

```shell [.husky/commit-msg (v9)]
commitlint --edit $1
```

:::

기타 환경 변수 변경 사항:

- `HUSKY_SKIP_HOOKS`는 `HUSKY`로 대체되었습니다.
- `HUSKY_SKIP_INSTALL`은 `HUSKY`로 대체되었습니다.
- `HUSKY_GIT_PARAMS`는 제거되었습니다. 대신 Git 매개변수를 스크립트에서 직접 사용해야 합니다 (예시: `$1`).