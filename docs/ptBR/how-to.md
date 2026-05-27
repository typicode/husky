# Como Fazer

## Adicionando um Novo Hook

Adicionar um hook é tão simples quanto criar um arquivo. Isso pode ser feito usando seu editor favorito, um script ou um simples comando echo. Por exemplo, no Linux/macOS:
```shell
echo "npm test" > .husky/pre-commit
```

## Arquivos de inicialização

O Husky permite que você execute comandos locais antes de executar os hooks. Ele lê comandos destes arquivos:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (obsoleto)

No Windows: `C:\Users\seunomeusuario\.config\husky\init.sh`

## Ignorando Git Hooks

### Para um único comando

A maioria dos comandos Git inclui uma opção `-n/--no-verify` para ignorar hooks:

```sh
git commit -m "..." -n # Ignora os Git hooks
```

Para comandos sem esta opção, desabilite os hooks temporariamente com HUSKY=0:

```shell
HUSKY=0 git ... # Desabilita todos os Git hooks temporariamente
git ... # Os hooks voltarão a ser executados
```

### Para múltiplos comandos

Para desabilitar hooks por um período prolongado (ex: durante rebase/merge):

```shell
export HUSKY=0 # Desabilita todos os Git hooks
git ...
git ...
unset HUSKY # Reabilita os hooks
```

### Para uma GUI ou globalmente

Para desabilitar os Git hooks em um cliente GUI ou globalmente, modifique a configuração do husky:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # O Husky não instalará nem executará hooks na sua máquina
```

## Servidor de CI e Docker

Para evitar a instalação de Git Hooks em servidores de CI ou no Docker, use `HUSKY=0`. Por exemplo, no GitHub Actions:

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

Se instalar apenas `dependencies` (não `devDependencies`), o script `"prepare": "husky"` pode falhar porque o Husky não estará instalado.

Você tem múltiplas soluções.

Modifique o script `prepare` para nunca falhar:

```json
// package.json
"prepare": "husky || true"
```

Você ainda verá uma mensagem de erro `command not found` na saída, o que pode ser confuso. Para silenciá-la, crie `.husky/install.mjs`:

<!-- Como o husky pode não estar instalado, ele deve ser importado dinamicamente após a verificação de prod/CI  -->
```js
// Ignora a instalação do Husky em produção e CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

Então use no `prepare`:

```json
"prepare": "node .husky/install.mjs"
```

## Testando Hooks Sem Fazer Commit

Para testar um hook, adicione `exit 1` ao script do hook para abortar o comando Git:

```shell
# .husky/pre-commit

# Seu script em desenvolvimento
# ...

exit 1
```

```shell
git commit -m "testando código do pre-commit"
# O commit não será criado
```

## Projeto Fora do Diretório Raiz do Git

O Husky não instala em diretórios pai (`../`) por razões de segurança. No entanto, você pode alterar o diretório no script `prepare`.

Considere esta estrutura de projeto:

```
.
├── .git/
├── backend/  # Sem package.json
└── frontend/ # package.json com husky
```

Configure seu script prepare assim:

```json
"prepare": "cd .. && husky frontend/.husky"
```

No script do hook, volte ao subdiretório relevante:

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## Hooks sem shell

Para executar scripts que requerem uma linguagem de script, use o seguinte padrão para cada hook aplicável:

(Exemplo usando o hook `pre-commit` e NodeJS)
1. Crie um ponto de entrada para o hook:
    ```shell
    .husky/pre-commit
    ```
2. No arquivo adicione o seguinte:
    ```shell
    node .husky/pre-commit.js
    ```
3. Em `.husky/pre-commit.js`:
   ```javascript
   // Seu código NodeJS
   // ...
   ```

## Bash

Os scripts de hook precisam ser compatíveis com POSIX para garantir a melhor compatibilidade, já que nem todos têm `bash` (ex: usuários Windows).

Dito isso, se sua equipe não usa Windows, você pode usar Bash desta forma:

```shell
# .husky/pre-commit

bash << EOF
# Coloque seu script bash aqui
# ...
EOF
```

## Gerenciadores de Versão do Node e GUIs

Se você usa Git hooks em GUIs com o Node instalado via gerenciador de versão (como `nvm`, `n`, `fnm`, `asdf`, `volta`, etc.), pode encontrar um erro `command not found` devido a problemas com a variável de ambiente `PATH`.

### Entendendo `PATH` e Gerenciadores de Versão

`PATH` é uma variável de ambiente contendo uma lista de diretórios. Seu shell pesquisa esses diretórios em busca de comandos. Se não encontrar um comando, você recebe a mensagem `command not found`.

Execute `echo $PATH` em um shell para ver seu conteúdo.

Os gerenciadores de versão funcionam:
1. Adicionando código de inicialização ao arquivo de inicialização do seu shell (`.zshrc`, `.bashrc`, etc.), que é executado toda vez que você abre um terminal.
2. Baixando versões do Node para um diretório na sua pasta home.

Por exemplo, se você tiver duas versões do Node:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

Ao abrir um terminal, o gerenciador de versão é inicializado, escolhe uma versão (digamos `Node-Y`) e adiciona seu caminho ao início do `PATH`:

```shell
echo $PATH
# Saída
~/version-manager/Node-Y/:...
```

Agora, node se refere ao `Node-Y`. Mudar para `Node-X` altera o `PATH` de acordo:

```shell
echo $PATH
# Saída
~/version-manager/Node-X/:...
```

O problema surge porque GUIs, iniciadas fora de um terminal, não inicializam o gerenciador de versão, deixando o `PATH` sem o caminho de instalação do Node. Portanto, Git hooks de GUIs frequentemente falham.

### Solução

O Husky carrega `~/.config/husky/init.sh` antes de cada Git hook. Copie o código de inicialização do seu gerenciador de versão para cá para garantir que seja executado nas GUIs.

Exemplo com `nvm`:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Carrega o nvm
```

Alternativamente, se o arquivo de inicialização do seu shell for rápido e leve, carregue-o diretamente:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## Configuração manual

O Git precisa ser configurado e o husky precisa configurar os arquivos em `.husky/`.

Execute o comando `husky` uma vez no seu repositório. Idealmente, inclua-o no script `prepare` no `package.json` para execução automática após cada instalação (recomendado).

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
    // O Yarn não suporta o script prepare
    "postinstall": "husky",
    // Inclua isso se for publicar no npmjs.com
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
# O Yarn não suporta `prepare`
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
