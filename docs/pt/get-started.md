# Começe

## Instalação

::: code-group

```shell [npm]
npm install --save-dev husky


```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# Adicione pinst SOMENTE se o seu pacote não for privado
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

## `husky init` (recomendado)

O comando `init` simplifica a configuração do husky em um projeto. Ele cria um script `pre-commit` em `.huskyz` e atualiza o script `prepare` em `package.json`. Modificações podem ser feitas posteriormente para se adequar ao seu fluxo de trabalho.

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# Devido a advertências específicas e diferenças com outros gerenciadores de pacotes,
# consulte a seção Como fazer.
```

```shell [bun]
bunx husky init
```

:::


## Experimente

Parabéns! Você configurou com sucesso seu primeiro gancho Git com apenas um comando 🎉. Vamos testar:

```shell
git commit -m "Keep calm and commit"
# O script de teste será executado toda vez que você confirmar
```

## Algumas palavras...

### Scripting

Embora na maioria das vezes você apenas execute alguns comandos `npm run` ou `npx` em suas hooks, você também pode criar scripts deles usando o shell POSIX para fluxos de trabalho personalizados.

Por exemplo, veja como você pode limpar seus arquivos preparados em cada commit com apenas duas linhas de código shell e sem dependência externa:

```shell
# .husky/pre-commit
prettier $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g') --write --ignore-unknown
git update-index --again
```

_Este é um exemplo básico, mas funcional, verifique [lint-staged](https://github.com/lint-staged/lint-staged) se precisar de mais._

### Desativando hooks

Husky não força Git hooks. Ele pode ser desativado globalmente (`HUSKY = 0`) ou opcional, se desejado. Consulte a seção [Como fazer](how-to) para configuração manual e mais informações.
