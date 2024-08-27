# Migrar desde v4

Si estabas llamando a los scripts `package.json` usando `npm` o `yarn`, **puedes simplemente copiar tus comandos** desde tu archivo de configuración al gancho (hook) correspondiente:

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
# Tenga en cuenta que ahora puede tener comandos en varias líneas.
npm test // [!code hl]
npm run foo // [!code hl]
```

Si estaba llamando a binarios instalados localmente, **ahora necesita ejecutarlos a través de su administrador de paquetes**:

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

La variable de entorno `HUSKY_GIT_PARAMS` ahora se reemplaza por los parámetros nativos `$1`, `$2`, etc.

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

Otros cambios en las variables del entorno:

- `HUSKY_SKIP_HOOKS` se reemplaza por `HUSKY`.
- `HUSKY_SKIP_INSTALL` se reemplaza por `HUSKY`.
- `HUSKY_GIT_PARAMS` se elimina. En su lugar, los parámetros de Git deben usarse directamente en los scripts (por ejemplo, `$1`).
