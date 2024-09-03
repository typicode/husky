# Solución de problemas

## Comando no encontrado

Consulte [Cómo hacerlo](how-to) para obtener soluciones.

## Los ganchos (hooks) no se están ejecutando

1. Verifique que el nombre del archivo sea correcto. Por ejemplo, `precommit` o `pre-commit.sh` son nombres inválidos. Consulte la [documentación](https://git-scm.com/docs/githooks) de los Ganchos de Git (Git hooks ) para conocer los nombres válidos.
2. Ejecute `git config core.hooksPath` y asegúrase de que apunte a `.husky/_` (o a su directorio de ganchos personalizado (custom hooks directory)).
3. Confirme que su versión de Git sea superior a `2.9`.

## `.git/hooks/` no funciona después de la desinstalación

Si los ganchos (hooks) en `.git/hooks/` no funcionan después de desinstalar `husky`, ejecuta `git config --unset core.hooksPath`.

## Yarn en Windows

Los ganchos de Git (Git hooks) pueden fallar con Yarn en Windows usando Git Bash (`stdin no es un tty`). Para los usuarios de Windows, implemente esta solución alternativa (workaround):

1. Cree `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Solución alternativa (Workaround) para Windows 10, Git Bash, and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Obtenga la fuente donde se ejecutan los comandos Yarn:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```
