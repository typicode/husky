![npm](https://img.shields.io/npm/dm/husky)

> Hooks nativos de Git ultrarrápidos y modernos

Husky mejora tus commits y más 🐶 _¡guau!_

Automáticamente hace un **análisis (lint) de tus mensages de commit**, **código**, y **ejecuta pruebas (test)** al confirmarse (committing ) o al enviar (pushing).

Comienza [aquí](/es/get-started.md).

## Características

- Solo `2 kB` (📦 _gzipped_) sin dependencias
- Más rápido por ser ligero (se ejecuta en `~1ms`)
- Utiliza la nueva característica de Git (`core.hooksPath`)
- Soporta:
  - macOS, Linux, Windows
  - GUI de Git (Git GUIs), administradores de versiones de Node, directorio de ganchos personalizados (custom hooks directory), proyectos anidados, monorepositorios (monorepos)
  - [Todos los 13 ganchos de Git (Git hooks) del lado del cliente](https://git-scm.com/docs/githooks)

Y más:

- Ganchos específicos de la rama
- Uso de shell POSIX para crear scripts de casos avanzados
- Se adhiere a la organización de ganchos (hooks) nativa de Git (Git's native hook organization)
- Se alinea con las mejores prácticas de [npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#best-practices) usando el script `prepare`
- Opciones de inclusión/exclusión (Opt-in/opt-out)
- Se puede deshabilitar globalmente
- Mensajes de error amigables con el usuario

## Patrocinadores (Sponsors)

Apoya este proyecto convirtiéndote en patrocinador (sponsor) [aquí](https://github.com/sponsors/typicode) 💖

### Patrocinador especial (Special Sponsor)

<p align="center">
  <a href="https://app.tea.xyz/sign-up?r=8L2HWfJB6hs">
    <img src="https://github.com/typicode/husky/assets/5502029/1b95c571-0157-48bc-a147-0d8d2fbc1d8a" /><br/>
    Obtenga recompensas por sus contribuciones de código abierto
  </a>
</p>

### GitHub

<p align="center">
  <a href="../sponsorkit/sponsors.svg">
    <img src='../sponsorkit/sponsors.svg'/>
  </a>
</p>

### Colectivo Abierto (Open Collective)

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>
[![image](https://github.com/user-attachments/assets/b9c5a918-70fc-4615-ae7d-e7e5bc3c66e8)](https://www.sanity.io/)

## Usado por

Husky se utiliza en [**más de 1,5 millones de proyectos**](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D) en GitHub, incluidos:

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

## Artículos

- [Por qué Husky ha abandonado la configuración JS convencional](https://blog.typicode.com/posts/husky-git-hooks-javascript-config/)
- [Por qué Husky ya no se instala automáticamente](https://blog.typicode.com/posts/husky-git-hooks-autoinstall/)
