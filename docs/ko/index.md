![npm](https://img.shields.io/npm/dm/husky)

> 초고속으로 모던한 네이티브 Git 훅 도구

Husky는 커밋을 더 스마트하게 만들어줍니다. 🐶 _멍!_

자동으로 커밋하거나 푸시할 때 **커밋 메시지 린트**, **코드 린트**, 그리고 **테스트 실행**을 수행합니다.

[여기서](/get-started.md) 시작해보세요.

## 주요 기능

- 의존성 없이 단 `2 kB` (📦 _gzipped 압축 기준_)
- 매우 가벼워서 빠르게 실행됨 (거의 `~1ms` 안에 실행)
- Git의 최신 기능을 사용 (`core.hooksPath`)
- 다양한 플랫폼과 환경 지원:
  - macOS, Linux, Windows
  - Git GUIs, Node 버전 관리자, 커스텀 훅 디렉터리, 중첩된 프로젝트, 모노레포
  - [13가지 모든 클라이언트 사이트 Git 훅](https://git-scm.com/docs/githooks)

추가적으로 다음과 같은 기능도 있습니다:

- 브랜치별 훅 설정
- 고급 스크립팅을 위한 POSIX 셸 사용 가능
- Git의 기본 훅 구조에 맞춤
- `prepare` 스크립트를 통한 [npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#best-practices) 권장 방식에 부합
- 옵트인/옵트아웃 옵션 사용 가능
- 전체 비활성화 기능 제공
- 사용자 친화적인 에러 메시지

## 후원사

이 프로젝트를 후원하고 싶다면 [여기에서](https://github.com/sponsors/typicode) 후원자가 되어주세요💖

### 특별 후원사

<p align="center">
  <a href="https://app.tea.xyz/sign-up?r=8L2HWfJB6hs">
    <img src="https://github.com/typicode/husky/assets/5502029/1b95c571-0157-48bc-a147-0d8d2fbc1d8a" /><br/>
    오픈소스 기여에 대한 보상을 받으세요
  </a>
</p>

### GitHub

<p align="center">
  <a href="../sponsorkit/sponsors.svg">
    <img src='../sponsorkit/sponsors.svg'/>
  </a>
</p>

### Open Collective

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>
[![image](https://github.com/user-attachments/assets/b9c5a918-70fc-4615-ae7d-e7e5bc3c66e8)](https://www.sanity.io/)

## 사용하는 곳

Husky는 GitHub에서 [**150만 개 이상의 프로젝트**](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D) 에서 사용되고 있습니다. 그 중 일부는 다음과 같습니다:

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

## 관련 글

- [왜 Husky는 기존 JavaScript 설정 방식을 제거했는가](https://blog.typicode.com/posts/husky-git-hooks-javascript-config/)
- [왜 Husky는 더 이상 자동 설치되지 않는가](https://blog.typicode.com/posts/husky-git-hooks-autoinstall/)
