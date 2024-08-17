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

### Специальный спонсор

<p align="center">
  <a href="https://app.tea.xyz/sign-up?r=8L2HWfJB6hs">
    <img src="https://github.com/typicode/husky/assets/5502029/1b95c571-0157-48bc-a147-0d8d2fbc1d8a" /><br/>
    Получите награды за свой вклад в открытый исходный код
  </a>
</p>

### GitHub

<p align="center">
  <a href="../sponsorkit/sponsors.svg">
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