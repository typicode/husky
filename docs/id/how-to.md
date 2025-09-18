# Cara

## Menambahkan kait baru

Menambahkan kait baru sesederhana membuat file. Ini dapat dilakukan dengan menggunakan editor favorit anda, sebuah skrip atau sebuah perintah echo dasar. Sebagai contoh, di Linux/macOS:
```shell
echo "npm test" > .husky/pre-commit
```

## Startup files

Husky mengizinkan anda untuk mengeksekusi perintah lokal sebelum menjalankan kait. Ini membaca perintah dari berkas berikut:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (usang)

Di Windows: `C:\Users\yourusername\.config\husky\init.sh`

## Melewati kait Git

### Untuk perintah tunggal

Banyak perintah Git memasukkan opsi `-n/--no-verify` untuk lewati kait:

```sh
git commit -m "..." -n # Lewati kait Git
```

Untuk perintah tanpa bendera ini, nonaktifkan kait sementara dengan HUSKY=0:

```shell
HUSKY=0 git ... # Menonaktifkan semua kait Git sementara
git ... # Kait akan berjalan lagi
```

### Untuk beberapa perintah

Untuk nonaktifkan kait untuk periode yang diperpanjang (mis., selama rebase/gabung):

```shell
export HUSKY=0 # Nonaktifkan semua kait Git
git ...
git ...
unset HUSKY # Mengaktifkan kembali kait
```

### Untuk GUI atau secara global

Untuk nonaktifkan kait Git di dalam GUI klien atau secara global, modifikasi konfigurasi husky:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # Husky tidak akan instal dan tidak akan jalankan kait di mesin anda
```

## Server CI dan Docker

Untuk hindari menginstal kait Git di server CI atau di dalam Docker, gunakan `HUSKY=0`. Misalnya, dalam GitHub Actions:

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

Jika menginstal hanya `dependencies` (bukan `devDependencies`), skrip `"prepare": "husky"` mungkin gagal karena Husky tidak terinstal.

Anda memiliki beberapa solusi.

Modifikasi skrip `prepare` untuk tidak pernah gagal:

```json
// package.json
"prepare": "husky || true"
```

Anda akan tetap mendapatkan pesan error `command not found` di keluaran anda yang mungkin membingungkan. Untuk membuatnya diam, buat `.husky/install.mjs`:

<!-- Since husky may not be installed, it must be imported dynamically after prod/CI check  -->
```js
// Lewati instal Husky dalam production dan CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

Kemudian, gunakan ini dalam `prepare`:

```json
"prepare": "node .husky/install.mjs"
```

## Mengetes kait tanpa menkomit

Untuk test kait, tambahkan `exit 1` ke skrip kait untuk membatalkan perintah Git:

```shell
# .husky/pre-commit

# Skrip WIP anda
# ...

exit 1
```

```shell
git commit -m "mengetes kode pra-komit"
# Komit tidak akan dibuat
```

## Proyek Tidak dalam Direktori Akar Git

Husky tidak menginstal di dalam direktori induk (`../`) untuk alasan keamanan. Namun, anda bisa mengganti direktori di dalam skrip `prepare`.

Pertimbangkan struktur proyek ini:

```
.
├── .git/
├── backend/  # Tidak ada package.json
└── frontend/ # Package.json dengan husky
```

Atur skrip `prepare` anda seperti ini:

```json
"prepare": "cd .. && husky frontend/.husky"
```

Dalam skrip kait anda, ganti direktori kembali subdirektori yang relavan:

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## Kait Non-shell

Untuk menjalankan skrip yang membutuhkan penggunaan bahasa skrip, gunakan pola berikut untuk setiap kait yang berlaku:

(Contoh menggunakan kait `pre-commit` dan NodeJS)
1. Buat sebuah titik masuk untuk kait:
    ```shell
    .husky/pre-commit
    ```
2. Di dalam berkas tambah berikut
    ```shell
    node .husky/pre-commit.js
    ```
3. Dalam `.husky/pre-commit.js`
   ```javascript
   // Kode NodeJS anda
   // ...
   ```

## Bash

Skrip kait harus sesuai dengan POSIX untuk memastikan kompabilitas terbaik karena tidak semua orang punya `bash` (mis. pengguna Windows).

Yang telah dibilang, jika tim anda tidak menggunakan Windows, anda bisa gunakan Bash dengan cara ini:

```shell
# .husky/pre-commit

bash << EOF
# Letak skrip bash anda di dalam
# ...
EOF
```

## Pengelola Versi Node and GUI

Jika anda menggunakan kait Git di dalam GUI dengan Node yang terinstal lewat pengelola versi (seperti `nvm`, `n`, `fnm`, `asdf`, `volta`, dll...), anda mungkin berhadapan dengan kesalahan `command not found` karena masalah variabel lingkungan `PATH`.

### Memahami `PATH` dan pengelola versi

`PATH` adalah sebuah variabel lingkungan berisi daftar direktori. Shell anda mencari direktori ini untuk perintah. Jika ini tidak menemukan perintah, anda mendapatkan pesan `command not found`.

Jalankan `echo $PATH` di dalam shell untuk melihat isinya.

Pengelola versi bekerja dengan:
1. Menambahkan kode inisiasi ke berkas persiapan shell anda (`.zshrc`, `.bashrc`, dll.), yang berjalan setiap waktu anda membuka terminal.
2. Mengunduh versi Node di dalam direktori di folder beranda anda.

Sebagai contoh, jika anda memiliki dua versi Node:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

Membuka terminal menginisiasi pengelola paket, yang memilih versi (katakanlah `Node-Y`) dan menambahkn jalurnya ke `PATH`:

```shell
echo $PATH
# Keluaran
~/version-manager/Node-Y/:...
```

Sekarang, Node melihat `Node-Y`. Mengganti ke `Node-X` mengganti `PATH` sesuai dengan itu:

```shell
echo $PATH
# Keluaran
~/version-manager/Node-X/:...
```

Masalah muncul karena GUI, meluncurkannya di luar terminal, tidak menginisiasi pengelola versi, meninggalkan `PATH` tanpa jalur instalisasi Node. Oleh karena itu, Kait Git dari GUI sering gagal.

### Solusi

Husky mensumberkan `~/.config/husky/init.sh` sebelum setiap kait Git. Salin kode inisiasi pengelola versi anda ke sini untuk pastikan ini berjalan di GUI.

Contoh dengan `nvm`:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Ini memuat nvm
```

Sebagai alternatif, jika berkas persiapan shell anda cepat dan ringan, sumberkan secara langsung:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## Persiapan manual

Git butuh dikonfigurasi dan husky butuh untuk persiapan berkas di dalam `.husky/`.

Jalankan perintah `husky` sekali di dalam repositori anda. Idealnya, Sertakan ini dalam skrip `prepare` dalam `package.json` untuk eksekusi otomatis setelah setiap instal (direkomendasi).

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
    // Yarn tidak mendukung skrip prepare
    "postinstall": "husky",
    // Sertakan ini jika mempublikasikanya ke npmjs.com
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

Jalankan `prepare` sekali:

::: code-group

```sh [npm]
npm run prepare
```

```sh [pnpm]
pnpm run prepare
```

```sh [yarn]
# Yarn tidak mendukung `prepare`
yarn run postinstall
```

```sh [bun]
bun run prepare
```

:::

Buat sebuah berkas `pre-commit` di dalam direktori `.husky/`:

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
