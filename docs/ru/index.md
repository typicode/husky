![npm](https://img.shields.io/npm/dm/husky)

> Сверхбыстрые современные собственные хуки git

Husky улучшает ваши коммиты и многое другое 🐶 _woof!_

Автоматически **линтует ваши сообщения коммитов**, **код** и **запускает тесты** при коммите или отправке.

Начните [здесь](/get-started.md).

## Возможности

- Всего `2 КБ` (📦 _gzipped_) без зависимостей
- Очень быстрый (запускается за `~1 мс`)
- Использует новую функцию Git (`core.hooksPath`)
- Поддерживает:
  - macOS, Linux, Windows
  - Git GUI, менеджеры версий Node, каталог пользовательских хуков, вложенные проекты, монорепозитории
  - [Все 13 клиентских хуков Git](https://git-scm.com/docs/githooks)

И многое другое:
- Хуки, специфичные для веток
- Используйте оболочку POSIX для скриптов сложных случаев
- Соответствует собственной организации хуков Git
- Соответствует лучшим практикам [npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#best-practices) с использованием скрипта `prepare`
- Параметры согласия/отказа
- Может быть глобально отключено
- Удобные сообщения об ошибках

## Спонсоры

Поддержите этот проект, став спонсором [здесь](https://github.com/sponsors/typicode) 💖

### GitHub

<p align="center">
  <a href="http://git-tower.com/?utm_source=husky&utm_medium=referral">
    <img height="100" style="height: 100px; width: auto; max-width: none;" alt="Git Tower" src="https://camo.githubusercontent.com/4b4d0ae4ec27fe8591b575c86fe21c562f34926893272dccc05fbf0447d38694/68747470733a2f2f6a736f6e706c616365686f6c6465722e74797069636f64652e636f6d2f746f7765722d69636f6e2d616e642d6c6f676f2d31343030783236302e706e67" />
  </a>
</p>

<p align="center">
  <a href="https://serpapi.com/?utm_source=typicode">
    <img height="100" style="height: 100px; width: auto; max-width: none;" src="https://github.com/user-attachments/assets/52b3039d-1e4c-4c68-951c-93f0f1e73611" alt="SerpApi" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/typicode/husky/blob/main/docs/sponsorkit/sponsors.svg">
    <img src='../sponsorkit/sponsors.svg'/>
  </a>
</p>

### Открытый коллектив

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>

## Используется

Husky используется в [**более 1,5 млн проектов**](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D) на GitHub, включая:

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

## Статьи

- [Почему husky отказался от обычного JS config](https://blog.typicode.com/posts/husky-git-hooks-javascript-config/)
- [Почему husky больше не устанавливается автоматически](https://blog.typicode.com/posts/husky-git-hooks-autoinstall/)
