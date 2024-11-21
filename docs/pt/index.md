![npm](https://img.shields.io/npm/dm/husky)

> Git Hooks  nativos ultra-rápidos e modernos

O Husky aprimora seus commits e muito mais 🐶 woof!

Automaticamente **verifique as suas mensagens de commits**, **código** e **execute testes** ao realizar commits ou pushes.

Começe [aqui](/get-started.md).

## Funcionalidades

- Apenas `2 kB` (📦 _comprimido_) sem dependências
- Extremamente rápido (executa em `~1ms`)
- Usa a nova funcionalidade do Git (`core.hooksPath`)
- Suporta:
  - macOS, Linux, Windows
  - Git GUIs, gerenciadores de versão do Node, diretório de hooks personalizados, projetos aninhados, monorepos
  - [Todos os 13 hooks client-side do Git](https://git-scm.com/docs/githooks)

E mais:
- Hooks específicos para branches
- Use POSIX shell para scriptar casos avançados
- Adere à organização nativa de hooks do Git
- Alinha-se com as [melhores práticas do npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#best-practices)  usando o script `prepare`
- Opções de inclusão/exclusão
- Pode ser desabilitado globalmente
- Mensagens de erro amigáveis

## Patrocinadores

Apoie este projeto tornando-se um patrocinador [aqui](https://github.com/sponsors/typicode) 💖

### Patrocinador Especial

<p align="center">
  <a href="https://app.tea.xyz/sign-up?r=8L2HWfJB6hs">
    <img src="https://github.com/typicode/husky/assets/5502029/1b95c571-0157-48bc-a147-0d8d2fbc1d8a" /><br/>
    Ganhe recompensas por suas contribuições de código aberto
  </a>
</p>

### GitHub

<p align="center">
  <a href="./sponsorkit/sponsors.svg">
    <img src='./sponsorkit/sponsors.svg'/>
  </a>
</p>

### Open Collective

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>

## Usado por

Husky é usado em [**mais de 1.5 milhões de projetos**](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D) no Github, incluindo:

- [vercel/next.js](https://github.com/vercel/next.js)
- [vercel/hyper](https://github.com/vercel/hyper)
- [webpack/webpack](https://github.com/webpack/webpack)
- [angular/angular](https://github.com/angular/angular)
- [facebook/docusaurus](https://github.com/facebook/docusaurus)
- [microsoft/vscode](https://github.com/microsoft/vscode)
- [11ty/eleventy](https://github.com/11ty/eleventy)
- [stylelint/stylelint](https://github.com/stylelint/stylelint)
- [colinhacks/zod](https://github.com/colinhacks/zod)
- [rollup/rollup](https://github.com/rollup/rollup)
- [tinyhttp/tinyhttp](https://github.com/tinyhttp/tinyhttp)
- ...

## Articles

- [Por que o Husky abandonou a configuração JS convencional](https://blog.typicode.com/posts/husky-git-hooks-javascript-config/)
- [Por que o Husky não instala mais automaticamente](https://blog.typicode.com/posts/husky-git-hooks-autoinstall/)