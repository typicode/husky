# Como fazer

## Adicioando uma nova Hook


Adicionar uma hook é tão simples quanto criar um arquivo. Isso pode ser feito usando seu editor favorito, um script ou um comando echo básico. Por exemplo, no Linux/macOS:

```shell
echo "npm test" > .husky/pre-commit
```

## Arquivos de inicialização

Husky permite que você execute comandos locais antes de executar as hooks. Ele lê comandos destes arquivos:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (Deprecado)

No Windows: `C:\Users\yourusername\.config\husky\init.sh`

## Ignorando Git Hooks

### Para um único comando

A maioria dos comandos do Git inclui uma opção `-n/--no-verify` para ignorar as hooks:

```sh
git commit -m "..." -n # Ignora Git hooks
```

Para comandos sem este sinalizador, desative as hooks temporariamente com HUSKY=0:

```shell
HUSKY=0 git ... # Desativa temporariamente todas as Git hooks
git ... # As hooks serão executados novamente
```

### Para vários comandos

Para desativar as hooks por um período prolongado (por exemplo, durante rebase/mesclagem):

```shell
export HUSKY=0 # Desativa todas as Git hooks
git ...
git ...
unset HUSKY # Volta a ativas as hooks
```

### Para uma GUI ou globalmente

Para desabilitar as hooks do Git em um cliente GUI ou globalmente, modifique a configuração do husky:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # Husky não instala e não executa hooks em sua máquina
```

## Servidor CI e Docker

Para evitar a instalação de Git Hooks em servidores CI ou no Docker, use `HUSKY=0`. Por exemplo, em GitHub Actions:

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

Se instalar apenas `dependencies` (não `devDependencies`), o script `"prepare": "husky"` pode falhar porque o Husky não será instalado.

Você tem várias soluções.

Modifique o script `prepare` para nunca falhar:

```json
// package.json
"prepare": "husky || true"
```

Você ainda receberá uma mensagem de erro `comando não encontrado` em sua saída, o que pode ser confuso. Para silenciá-lo, crie `.husky/install.mjs`:

<!-- Como o husky pode não estar instalado, ele deve ser importado dinamicamente após a verificação prod/CI -->
```js
// Ignora a instalação do Husky em produção e CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

Então, use-o em `prepare`:

```json
"prepare": "node .husky/install.mjs"
```

## Testando hooks sem comprometer

Para testar uma hook, adicione `exit 1` ao script da hook para abortar o comando Git:

```shell
# .husky/pre-commit

# Seu script WIP
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# Um commit não será criado
```

## Projeto não está no diretório raiz do Git

O Husky não é instalado em diretórios pais (`../`) por motivos de segurança. No entanto, você pode alterar o diretório no script `prepare`.

Considere esta estrutura de projeto:

```
.
├── .git/
├── backend/  # No package.json
└── frontend/ # Package.json with husky
```

Defina seu script de preparação assim:

```json
"prepare": "cd .. && husky frontend/.husky"
```

No seu script da hook, altere o diretório de volta para o subdiretório relevante:

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## Non-shell hooks

Para executar scripts que exigem o uso de uma linguagem de script, use o seguinte padrão para cada hook aplicável:

(Exemplo usando hook `pre-commit` e NodeJS)
1. Crie um ponto de entrada para a hook:
    ```shell
    .husky/pré-commit
    ```
2. No arquivo adicione o seguinte
    ```shell
    node .husky/pre-commit.js
    ```
3. em `.husky/pre-commit.js`
   ```javascript
   //Seu código NodeJS
   // ...
   ```
## Bash

Os scripts de hook precisam ser compatíveis com POSIX para garantir a melhor compatibilidade, pois nem todos possuem `bash` (por exemplo, usuários do Windows).

Dito isto, se sua equipe não usa Windows, você pode usar o Bash desta forma:

```shell
# .husky/pre-commit

bash << EOF
# Coloque seu script bash dentro
# ...
EOF
```

## Gerenciadores de versões do Node e GUIs

Se você estiver usando Git hooks em GUIs com Node instalado através de um gerenciador de versões (como `nvm`, `n`, `fnm`, `asdf`, `volta`, etc...), você pode enfrentar um `comando não encontrado` devido a problemas de variável de ambiente `PATH`.

### Noções básicas sobre `PATH` e gerenciadores de versão

`PATH` é uma variável de ambiente que contém uma lista de diretórios. Seu shell procura comandos nesses diretórios. Se não encontrar um comando, você receberá uma mensagem `comando não encontrado`.

Execute `echo $PATH` em um shell para visualizar seu conteúdo.

Os gerenciadores de versão funcionam por:
1. Adicionando código de inicialização ao arquivo de inicialização do shell (`.zshrc`, `.bashrc`, etc.), que é executado sempre que você abre um terminal.
2. Baixar versões do Node para um diretório em sua pasta pessoal.

Por exemplo, se você tiver duas versões do Node:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

Abrir um terminal inicializa o gerenciador de versões, que escolhe uma versão (digamos `Node-Y`) e acrescenta seu caminho a `PATH`:

```shell
echo $PATH
# Saida
~/version-manager/Node-Y/:...
```

Agora, Node refere-se a `Node-Y`. Mudar para `Node-X` altera `PATH` de acordo:

```shell
echo $PATH
# Saida
~/version-manager/Node-X/:...
```

O problema surge porque as GUIs, iniciadas fora de um terminal, não inicializam o gerenciador de versões, deixando `PATH` sem o caminho de instalação do Node. Assim, os ganchos Git das GUIs geralmente falham.

### Solução

Fontes Husky `~/.config/husky/init.sh` antes de cada Git hook. Copie o código de inicialização do seu gerenciador de versão aqui para garantir que ele seja executado em GUIs.

Exemplo com `nvm`:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Isso carrega nvm
```

Alternativamente, se o seu arquivo de inicialização do shell for rápido e leve, obtenha-o diretamente:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## Configuração manual

O Git precisa ser configurado e o husky precisa configurar os arquivos em `.husky/`.

Execute o comando `husky` uma vez em seu repositório. Idealmente, inclua-o no script `prepare` em `package.json` para execução automática após cada instalação (recomendado).

::: code-group

```json [npm]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

```json [pnpm]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

```json [yarn]
{
  "scripts": {
    // Yarn doesn't support prepare script
    "postinstall": "husky",
    // Include this if publishing to npmjs.com
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

```json [bun]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

:::

Execute `prepare` uma vez:

::: code-group

```sh [npm]
npm run prepare
```

```sh [pnpm]
pnpm run prepare
```

```sh [yarn]
# Yarn doesn't support `prepare`
yarn run postinstall
```

```sh [bun]
bun run prepare
```

:::

Crie um arquivo `pre-commit` no diretório `.husky/`:

::: code-group

```shell [npm]
# .husky/pre-commit
npm test
```

```shell [pnpm]
# .husky/pre-commit
pnpm test
```

```shell [yarn]
# .husky/pre-commit
yarn test
```

```sh [bun]
# .husky/pre-commit
bun test
```

:::
