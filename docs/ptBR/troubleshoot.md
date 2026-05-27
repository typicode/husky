# Solução de Problemas

## Comando não encontrado

Veja [Como Fazer](how-to) para soluções.

## Hooks não estão sendo executados

1. Verifique se o nome do arquivo está correto. Por exemplo, `precommit` ou `pre-commit.sh` são nomes inválidos. Consulte a [documentação](https://git-scm.com/docs/githooks) de Git hooks para nomes válidos.
2. Execute `git config core.hooksPath` e verifique se aponta para `.husky/_` (ou seu diretório de hooks personalizado).
3. Confirme se a versão do Git é superior a `2.9`.

## `.git/hooks/` Não Funciona Após Desinstalar

Se os hooks em `.git/hooks/` não funcionam após desinstalar o `husky`, execute `git config --unset core.hooksPath`.

## Yarn no Windows

Os Git hooks podem falhar com o Yarn no Windows usando o Git Bash (`stdin is not a tty`). Para usuários Windows, implemente esta solução alternativa:

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

2. Carregue-o onde os comandos Yarn são executados:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```
