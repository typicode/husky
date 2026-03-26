# Mulai

## Instal

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# Tambah pinst HANYA jika paket anda tidak pribadi
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

## `husky init` (disarankan)

Perintah `init` dengan mudah mempersiapkan husky di dalam proyek. Membuat sebuah skrip `pre-commit` di dalam `.husky/` dan perbarui skrip `prepare` di dalam `package.json`. Modifikasi dapat dibuat nanti untuk menyesuaikan alur kerja anda.

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# Karena peringatan dan perbedaan spesifik dengan pengelola paket lainnya,
# lihat ke bagian "Cara".
```

```shell [bun]
bunx husky init
```

:::


## Cobalah

Selamat! Anda telah berhasil persiapkan kait Git pertama anda dengan hanya satu perintah 🎉. Mari tes:

```shell
git commit -m "Tetap tenang dan komit"
# skrip tes akan jalan setiap kali anda komit
```

## Beberapa kata...

### Membuat Skrip

Sementara sebagian besar waktu, anda hanya akan menjalankan beberapa perintah `npm run` atau `npx` dalam kait anda, anda bisa juga menuliskan menggunakan shell POSIX untuk alur kerja kostum.

Untuk contoh, berikut cara anda bisa periksa berkas yang di-_stage_ dalam setiap komit dengan hanya dua baris kode shell dan tanpa ketergantungan:

```shell
# .husky/pre-commit
prettier $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g') --write --ignore-unknown
git update-index --again
```

_Ini adalah contoh sederhana tapi bekerja, periksa [lint-staged](https://github.com/lint-staged/lint-staged) jika anda ingin lebih._

### Menonaktifkan kait

Husky tidak paksa kait Git. Ini bisa dinonaktifkan secara global (`HUSKY=0`) atau ikut serta jika diinginkan. Lihat bagian [Cara](how-to) untuk persiapan manual dan informasi lainnya.
