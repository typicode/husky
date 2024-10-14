# Migrar da v4

Se você estava chamando scripts `package.json` usando `npm` ou `yarn`, **você pode simplesmente copiar seus comandos** do seu arquivo de configuração para a hook correspondente:

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
# Observe que agora você pode ter comandos em múltiplas linhas
npm test // [!code hl]
npm run foo // [!code hl]
```

Se você estava chamando binários instalados localmente, **você precisa executá-los através do seu gerenciador de pacotes agora**:

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

A variável de ambiente `HUSKY_GIT_PARAMS` foi substituída agora pelos parâmetros nativos `$1`, `$2`, etc.

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

Outras alterações nas variáveis ​​de ambiente:

- `HUSKY_SKIP_HOOKS` é substituído por `HUSKY`.
- `HUSKY_SKIP_INSTALL` é substituído por `HUSKY`.
- `HUSKY_GIT_PARAMS` foi removido. Em vez disso, os parâmetros do Git devem ser usados ​​diretamente em scripts (por exemplo, `$1`).