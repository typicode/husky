# Migrasi dari v4

Jika anda memanggil skrip `package.json` menggunakan `npm` atau `yarn`, **anda dapat dengan mudah salin perintah anda** dari berkas konfigurasi anda ke kait yang sesuai:

Husky v4

```json
// package.json
{
  "hooks": {
    "pre-commit": "npm test && npm run foo" // [!code hl]
  }
}
```

Husky v9

```shell 
# .husky/pre-commit
# Perhatikan bahwa anda sekarang dapat memiliki perintah pada beberapa baris
npm test // [!code hl]
npm run foo // [!code hl]
```

Jika anda memanggil biner yang terinstal secara lokal, **anda perlu menjalankannya lewat pengelola paket anda sekarang**:

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "pre-commit": "jest"
  }
}
```

```shell [.husky/pre-commit (v9)]
jest
```

:::

Variabel lingkungan `HUSKY_GIT_PARAMS` diganti sekarang oleh parameter asli `$1`, `$2`, dll.

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

```shell [.husky/commit-msg (v9)]
commitlint --edit $1
```

:::

Perubahan variabel lingkungan lainnya:

- `HUSKY_SKIP_HOOKS` diganti `HUSKY`.
- `HUSKY_SKIP_INSTALL` diganti `HUSKY`.
- `HUSKY_GIT_PARAMS` dihapus. Sebagai gantinya parameter Git harus digunakan secara langsung di dalam skrip (mis. `$1`).