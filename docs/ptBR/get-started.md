# Primeiros Passos

## Instalação

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# Adicione o pinst SOMENTE se o seu pacote não for privado
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

## `husky init` (recomendado)

O comando `init` simplifica a configuração do husky em um projeto. Ele cria um script `pre-commit` em `.husky/` e atualiza o script `prepare` no `package.json`. Modificações podem ser feitas posteriormente para se adequar ao seu fluxo de trabalho.

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# Devido a ressalvas específicas e diferenças em relação a outros gerenciadores de pacotes,
# consulte a seção Como Fazer.
```

```shell [bun]
bunx husky init
```

:::


## Experimente

Parabéns! Você configurou seu primeiro Git hook com apenas um comando 🎉. Vamos testá-lo:

```shell
git commit -m "Mantenha a calma e faça o commit"
# O script de teste será executado toda vez que você fizer um commit
```

## Algumas palavras...

### Scripts

Na maioria das vezes, você executará apenas alguns comandos `npm run` ou `npx` nos seus hooks, mas também pode criar scripts usando shell POSIX para fluxos de trabalho personalizados.

Por exemplo, veja como você pode fazer o lint dos seus arquivos em stage a cada commit com apenas duas linhas de código shell e nenhuma dependência externa:

```shell
# .husky/pre-commit
prettier $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g') --write --ignore-unknown
git update-index --again
```

_Este é um exemplo básico mas funcional, veja o [lint-staged](https://github.com/lint-staged/lint-staged) se precisar de mais recursos._

### Desabilitando hooks

O Husky não força os Git hooks. Ele pode ser desabilitado globalmente (`HUSKY=0`) ou configurado como opt-in se preferir. Veja a seção [Como Fazer](how-to) para configuração manual e mais informações.
