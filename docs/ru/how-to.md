# Как использовать

## Добавление нового хука

Добавление хука так же просто, как создание файла. Это можно сделать с помощью вашего любимого редактора, скрипта или базовой команды echo. Например, в Linux/macOS:
```shell
echo "npm test" > .husky/pre-commit
```

## Файлы запуска

Husky позволяет выполнять локальные команды перед запуском хуков. Он считывает команды из следующих файлов:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (устарело)

В Windows: `C:\Users\yourusername\.config\husky\init.sh`

## Пропуск хуков Git

### Для одной команды

Большинство команд Git включают опцию `-n/--no-verify` для пропуска хуков:

```sh
git commit -m "..." -n # Пропускает хуки Git
```

Для команд без этого флага временно отключите хуки с помощью HUSKY=0:

```shell
HUSKY=0 git ... # Временно отключает все хуки Git
git ... # Хуки снова запустятся
```

### Для нескольких команд

Чтобы отключить хуки для длительный период (например, во время rebase/merge):

```shell
export HUSKY=0 # Отключает все хуки Git
git ...
git ...
unset HUSKY # Повторно включает хуки
```

### Для GUI или глобально

Чтобы отключить хуки Git в клиенте GUI или глобально, измените конфигурацию husky:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # Husky не установит и не запустит хуки на вашей машине
```

## CI-сервер и Docker

Чтобы избежать установки хуков Git на CI-серверах или в Docker, используйте `HUSKY=0`. Например, в GitHub Actions:

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
HUSKY: 0
```

Если устанавливается только `dependencies` (не `devDependencies`), скрипт `"prepare": "husky"` может завершиться ошибкой, поскольку Husky не будет установлен.

У вас есть несколько решений.

Измените скрипт `prepare`, чтобы он никогда не завершался ошибкой:

```json
// package.json
"prepare": "husky || true"
```

Вы все равно получите сообщение об ошибке `command not found` в выводе, что может сбивать с толку. Чтобы сделать его тихим, создайте `.husky/install.mjs`:

<!-- Поскольку husky может быть не установлен, его необходимо импортировать динамически после проверки prod/CI -->
```js
// Пропустить установку Husky в production и CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

Затем используйте его в `prepare`:

```json
"prepare": "node .husky/install.mjs"
```

## Тестирование хуков без коммита

Чтобы протестировать хук, добавьте `exit 1` в скрипт хука, чтобы прервать Git команду:

```shell
# .husky/pre-commit

# Ваш скрипт WIP
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# Коммит не будет создан
```

## Проект не в корневом каталоге Git

Husky не устанавливается в родительские каталоги (`../`) по соображениям безопасности. Однако вы можете изменить каталог в скрипте `prepare`.

Рассмотрим следующую структуру проекта:

```
.
├── .git/
├── backend/ # Нет package.json
└── frontend/ # Package.json с husky
```

Настройте скрипт подготовки следующим образом:

```json
"prepare": "cd .. && husky frontend/.husky"
```

В скрипте хука измените каталог обратно на соответствующий подкаталог:

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## Хуки, не относящиеся к оболочке

Чтобы запустить скрипты, требующие использования языка сценариев, используйте следующий шаблон для каждого применимого хука:

(Пример использования хука `pre-commit` и NodeJS)
1. Создайте точку входа для хука:
    ```shell
    .husky/pre-commit
    ```
2. В файл добавьте следующее
    ```shell
    node .husky/pre-commit.js
    ```
3. в `.husky/pre-commit.js`
    ```javascript
    // Ваш код NodeJS
    // ...
    ```

## Bash

Скрипты хуков должны быть совместимы с POSIX, чтобы обеспечить лучшую совместимость, так как не у всех есть `bash` (например, у пользователей Windows).

При этом, если ваша команда не использует Windows, вы можете использовать Bash следующим образом:

```shell
# .husky/pre-commit

bash << EOF
# Поместите свой скрипт bash внутрь
# ...
EOF
```

## Менеджеры версий Node и графические интерфейсы

Если вы используете хуки Git в графических интерфейсах с Node, установленным через менеджер версий (например, `nvm`, `n`, `fnm`, `asdf`, `volta` и т. д.), вы можете столкнуться с ошибкой `command not found` из-за проблем с переменной среды `PATH`.

### Понимание `PATH` и менеджеров версий

`PATH` — это переменная среды, содержащая список каталогов. Ваша оболочка ищет команды в этих каталогах. Если она не находит команду, вы получаете сообщение `command not found`.

Запустите `echo $PATH` в оболочке, чтобы просмотреть ее содержимое.

Менеджеры версий работают следующим образом:
1. Добавляют код инициализации в файл запуска оболочки (`.zshrc`, `.bashrc` и т. д.), который запускается каждый раз при открытии терминала.
2. Загружают версии Node в каталог в вашей домашней папке.

Например, если у вас две версии Node:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

Открытие терминала инициализирует менеджер версий, который выбирает версию (например, `Node-Y`) и добавляет ее путь к `PATH`:

```shell
echo $PATH
# Вывод
~/version-manager/Node-Y/:...
```

Теперь node ссылается на `Node-Y`. Переключение на `Node-X` соответственно изменяет `PATH`:

```shell
echo $PATH
# Вывод
/version-manager/Node-X/:...
```

Проблема возникает из-за того, что GUI, запущенные вне терминала, не инициализируют менеджер версий, оставляя `PATH` без пути установки Node. Таким образом, хуки Git из GUI часто терпят неудачу.

### Решение

Husky создает `~/.config/husky/init.sh` перед каждым хуком Git. Скопируйте сюда код инициализации вашего менеджера версий, чтобы он работал в GUI.

Пример с `nvm`:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Это загружает nvm
```

В качестве альтернативы, если ваш файл запуска оболочки быстрый и легкий, используйте его напрямую:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## Ручная настройка

Git необходимо настроить, а husky необходимо настроить файлы в `.husky/`.

Запустите команду `husky` один раз в вашем репозитории. В идеале включите ее в скрипт `prepare` в `package.json` для автоматического выполнения после каждой установки (рекомендуется).

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
  // Yarn не поддерживает скрипт подготовки
  "postinstall": "husky",
  // Включить это при публикации на npmjs.com
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

Запустить `prepare` once:

::: code-group

```sh [npm]
npm run prepare
```

```sh [pnpm]
pnpm run preparation
```

```sh [yarn]
# Yarn не поддерживает `prepare`
yarn run postinstall
```

```sh [bun]
bun run preparation
```

:::

Создайте файл `pre-commit` в каталоге `.husky/`:

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
тест булочки
```

:::