# Comenzar

## Instalar

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# Agregue pinst SÓLO si su paquete no es privado
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

## `husky init` (recomendado)

El comando `init` simplifica la configuración de husky en un proyecto. Crea un script `pre-commit` en `.husky/` y actualiza el script `prepare` en `package.json`. Luego se pueden realizar modificaciones para que se adapten a su flujo de trabajo.

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# Debido a advertencias específicas y diferencias con otros administradores de paquetes,
# consulte la sección Cómo hacerlo.
```

```shell [bun]
bunx husky init
```

:::

## Pruébalo

¡Felicitaciones! Has configurado exitosamente tu primer gancho de Git (Git hook) con solo un comando 🎉. Probémoslo:

```shell
git commit -m "Keep calm and commit"
# El script de prueba se ejecutará cada vez que realices un commit
```

## Unas pocas palabras...

### Scripting

Si bien la mayoría de las veces, solo ejecutarás algunos comandos `npm run` o `npx` en tus ganchos (hooks), también puedes crear scripts con el shell POSIX para flujos de trabajo personalizados (custom workflows).

Por ejemplo, aquí se muestra cómo puedes analizar (lint) tus archivos preparados (staged files) en cada confirmación (commit) con solo dos líneas de código de shell y sin dependencia externa:

```shell
# .husky/pre-commit
prettier $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g') --write --ignore-unknown
git update-index --again
```

_Este es un ejemplo básico pero funcional, si necesita saber más verifique [lint-staged](https://github.com/lint-staged/lint-staged)._

### Deshabilitar ganchos (hooks)

Husky no fuerza los ganchos de Git (Git hooks). Se pueden deshabilitar globalmente (`HUSKY=0`) o se pueden habilitar si se desea. Consulta la sección [Cómo hacerlo](how-to) para obtener más información y realizar una configuración manual.
