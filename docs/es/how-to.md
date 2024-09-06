# Cómo hacerlo

## Agregar un nuevo gancho (Hook)

Agregar un gancho (hook) es tan simple como crear un archivo. Esto se puede lograr usando su editor favorito, un script o un comando echo básico. Por ejemplo, en Linux/macOS:

```shell
echo "npm test" > .husky/pre-commit
```

## Archivos de inicio

Husky le permite ejecutar comandos locales antes de ejecutar ganchos (hooks). Husky lee comandos de estos archivos:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (obsoleto (deprecated))

En Windows: `C:\Users\yourusername\.config\husky\init.sh`

## Omitir ganchos de Git (Git Hooks)

### Para un solo comando

La mayoría de los comandos de Git incluyen una opción `-n/--no-verify` para omitir ganchos (hooks):

```sh
git commit -m "..." -n # Skips Git hooks
```

Para los comandos sin esta bandera, deshabilite los ganchos (hooks) temporalmente con HUSKY=0:

```shell
HUSKY=0 git ... # Desactiva temporalmente todos los ganchos de Git (Git hooks)
git ... # Los ganchos (Hooks) se ejecutarán nuevamente
```

### Para varios comandos

Para deshabilitar los ganchos (hooks) durante un período prolongado (por ejemplo, durante la rebase/fusión (rebase/merge)):

```shell
export HUSKY=0 # Deshabilita todos los ganchos (hooks) de Git
git ...
git ...
unset HUSKY # Vuelve a habilitar los ganchos (hooks)
```

### Para una GUI o globalmente

Para deshabilitar los ganchos (hooks) de Git en un cliente GUI o globalmente, modifica la configuración de husky:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # Husky no instalará ni ejecutará ganchos (hooks) en tu máquina
```

## Servidor CI y Docker

Para evitar instalar ganchos de Git (Git Hooks) en servidores de CI o en Docker, use `HUSKY=0`. Por ejemplo, en acciones de GitHub (GitHub Actions):

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

Si instala solo `dependencies` (no `devDependencies`), el script `"prepare": "husky"` puede fallar porque Husky no se instalará.

Tiene varias soluciones.

Modifique el script `prepare` para que nunca falle:

```json
// package.json
"prepare": "husky || true"
```

Aún recibirá un mensaje de error `command not found` en su salida que puede ser confuso. Para que sea silencioso, cree `.husky/install.mjs`:

<!-- Dado que es posible que husky no esté instalado, se debe importar dinámicamente después de la verificación de producción/CI (prod/CI)  -->

```js
// Omitir la instalación de Husky en producción y CI
if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0);
}
const husky = (await import("husky")).default;
console.log(husky());
```

Luego, úsalo en `prepare`:

```json
"prepare": "node .husky/install.mjs"
```

## Probar (testear) Ganchos (Hooks) sin confirmar (Committing)

Para probar/testear un gancho (hook), agregue `exit 1` al script del gancho (hook) para cancelar el comando Git:

```shell
# .husky/pre-commit

# Your WIP script
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# No se creará una confirmación (commit)
```

## El proyecto no está en el directorio raíz de Git

Por razones de seguridad, Husky no se instala en los directorios padres (`../`). Sin embargo, puedes cambiar el directorio en el script `prepare`.

Considera esta estructura de proyecto:

```
.
├── .git/
├── backend/  # No package.json
└── frontend/ # Package.json con husky
```

Configure su script de preparación de la siguiente manera:

```json
"prepare": "cd .. && husky frontend/.husky"
```

En el script de gancho (hook script), cambie el directorio nuevamente al subdirectorio correspondiente:

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## Ganchos (hooks) que no son de shell

Para ejecutar scripts que requieren el uso de un lenguaje de script, use el siguiente patrón para cada gancho (hook) en el que aplique:

(Ejemplo usando el gancho (hook) `pre-commit` y NodeJS)

1. Cree un punto de entrada para el gancho (hook):

```shell
.husky/pre-commit
```

2. En el archivo agregue lo siguiente

```shell
node .husky/pre-commit.js
```

3. en `.husky/pre-commit.js`

```javascript
// Su código NodeJS
// ...
```

## Bash

Los scripts de gancho (hook) deben ser compatibles con POSIX para garantizar la mejor compatibilidad, ya que no todos tienen "bash" (por ejemplo, los usuarios de Windows).

Dicho esto, si su equipo no usa Windows, puede usar Bash de esta manera:

```shell
# .husky/pre-commit

bash << EOF
# Coloque dentro su script de bash
# ...
EOF
```

## Administradores de versiones de Node y GUI

Si usas ganchos de Git (Git hooks) en GUI con Node instalado a través de un administrador de versiones (como `nvm`, `n`, `fnm`, `asdf`, `volta`, etc.), es posible que te aparezca un error de `comando no encontrado` debido a problemas con la variable de entorno `PATH`.

### Entender `PATH` y los administradores de versiones

`PATH` es una variable de entorno que contiene una lista de directorios. Su shell busca comandos en estos directorios. Si no encuentra un comando, recibirá un mensaje de `comando no encontrado`.

Ejecute `echo $PATH` en un shell para ver su contenido.

Los administradores de versiones funcionan de la siguiente manera:

1. Agregando el código de inicialización al archivo de inicio de su shell (`.zshrc`, `.bashrc`, etc.), que se ejecuta cada vez que abre una terminal.
2. Descargando versiones de Node a un directorio en su carpeta de inicio (home folder).

Por ejemplo, si tiene dos versiones de Node:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

Al abrir una terminal se inicializa el administrador de versiones, que selecciona una versión (por ejemplo, `Node-Y`) y antepone su ruta a `PATH`:

```shell
echo $PATH
# Salida
~/version-manager/Node-Y/:...
```

Ahora, el node hace referencia a `Nodo-Y`. Al cambiar a `Nodo-X`, `PATH` cambia en concordancia:

```shell
echo $PATH
# Salida
~/version-manager/Node-X/:...
```

El problema surge porque las GUI, lanzadas fuera de una terminal, no inicializan el administrador de versiones, lo que deja a `PATH` sin la ruta de instalación de Node. Por lo tanto, los ganchos de Git (Git hooks) desde las GUI suelen fallar.

### Solución

Husky obtiene `~/.config/husky/init.sh` antes de cada gancho de Git (Git hooks). Copie aquí el código de inicialización del administrador de versiones para asegurarse de que se ejecute en las GUI.

Ejemplo con `nvm`:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Como alternativa, si su archivo de inicio de shell es rápido y liviano, consígalo directamente:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## Configuración manual

Git necesita ser configurado y husky debe configurar los archivos en `.husky/`.

Ejecute el comando `husky` una vez en su repositorio. Lo ideal es incluirlo en el script `prepare` en `package.json` para su ejecución automática después de cada instalación (recomendado).

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

Ejecute `prepare` una vez

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

Cree un archivo `pre-commit` en el directorio `.husky/`:

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
