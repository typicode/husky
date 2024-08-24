# Переход с v4

Если вы вызывали скрипты `package.json` с помощью `npm` или `yarn`, **вы можете просто скопировать свои команды** из файла конфигурации в соответствующий хук:

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
# Обратите внимание, что теперь вы можете иметь команды в нескольких строках
npm test // [!code hl]
npm run foo // [!code hl]
```

Если вы вызывали локально установленные двоичные файлы, **теперь вам нужно запустить их через менеджер пакетов**:

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

Переменная окружения `HUSKY_GIT_PARAMS` теперь заменена на собственные параметры `$1`, `$2` и т. д.

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

Другие изменения переменных окружения:

- `HUSKY_SKIP_HOOKS` заменен на `HUSKY`.

- `HUSKY_SKIP_INSTALL` заменен на `HUSKY`.
- `HUSKY_GIT_PARAMS` удален. Вместо этого параметры Git следует использовать непосредственно в скриптах (например, `$1`).