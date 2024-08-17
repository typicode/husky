# Устранение неполадок

## Команда не найдена （Command not found）

См. [Как сделать](how-to) для решений.

## Хуки не работают

1. Проверьте правильность имени файла. Например, `precommit` или `pre-commit.sh` — недопустимые имена. Обратитесь к [документации] Git hooks (https://git-scm.com/docs/githooks) для допустимых имен.
2. Запустите `git config core.hooksPath` и убедитесь, что он указывает на `.husky/_` (или на ваш пользовательский каталог hooks).
1. Убедитесь, что версия Git выше `2.9`.

## `.git/hooks/` не работает после удаления

Если хуки в `.git/hooks/` не работают после удаления `husky`, выполните `git config --unset core.hooksPath`.

## Yarn в Windows

Git-хуки могут не работать с Yarn в Windows с использованием Git Bash (`stdin не является tty`). Для пользователей Windows реализуйте этот обходной путь:

1. Создайте `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Обходной путь для Windows 10, Git Bash и Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Укажите его там, где выполняются команды Yarn:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```