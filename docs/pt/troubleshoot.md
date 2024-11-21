# Solucionar problemas

## Comando não encontrado

Consulte [Como fazer](how-to) para obter soluções.

## Hooks não estão iniciando

1. Verifique se o nome do arquivo está correto. Por exemplo, `precommit` ou `pre-commit.sh` são nomes inválidos. Consulte a [documentação](https://git-scm.com/docs/githooks) dos ganchos do Git para obter nomes válidos.
2. Execute `git config core.hooksPath` e certifique-se de que ele aponta para `.husky/_` (ou seu diretório de ganchos personalizado).
1. Confirme se sua versão do Git está acima de `2.9`.

## `.git/hooks/` não funciona após a desinstalação

Se as hooks em `.git/hooks/` não funcionarem após a desinstalação do `husky`, execute `git config --unset core.hooksPath`.

## Yarn no Windows

As Git hooks podem falhar com o Yarn no Windows usando Git Bash (`stdin não é um tty`). Para usuários do Windows, implemente esta solução alternativa:

1. Crie `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Solução alternativa para Windows 10, Git Bash e Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Obtenha-o onde os comandos do Yarn são executados:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```
