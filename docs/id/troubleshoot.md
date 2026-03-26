# Pemecahan Masalah

## Perintah tidak ditemukan

Lihat [Cara](how-to) untuk solusi.

## Kait tidak berjalan

1. Verifikasi nama berkasnya valid. Untuk contoh, `precommit` atau `pre-commit.sh` adalah nama yang tidak valid. Lihat ke [dokumentasi](https://git-scm.com/docs/githooks) kait Git untuk nama-nama yang valid.
2. Jalankan `git config core.hooksPath` dan pastikan mengarah ke `.husky/_` (atau direktori kait kostum anda).
1. Konfirmasi versi Git anda di atas `2.9`.

## `.git/hooks/` Tidak bekerja setelah uninstal

Jika kait di dalam `.git/hooks/` tidak bekerja pasca meng-uninstal `husky`, eksekusi `git config --unset core.hooksPath`.

## Yarn di Windows

Kait Git mungkin gagal dengan Yarn di Windows menggunakan Bash Git (`stdin is not a tty`). Untuk pengguna Windows, terapkan solusi ini:

1. Buat `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Solusi untuk Windows 10, Bash Git, dan Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Sumberkan dimana perintah Yarn dijalankan:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```
