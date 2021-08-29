# Diet Si Monki

## Install

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:8080
$ yarn dev
```

## Storyboard

Alkisah di hutan penyihir di kerajaan semanggi, hiduplah seekor monyet bernama Monki, hutan tersebut memiliki banyak pohon yang menghasilkan buah buahan dan makanan terbaik di kerajaan.

Monki mempunyai hobby makan, hobby tersebut didukung dengan sumber daya alam di hutan penyihir menjadikan hidup monki sangat berkecukupan dengan makanan. Akan tetapi dikarenakan hutan penyihir diselimuti oleh sihir special, monki tidak boleh terlalu banyak makan dan harus makan dengan gizi berimbang. Jika monki melanggar peraturan dalam hutan tersebut makanan yang akan dia makan berubah menjadi racun yang berbahaya bagi tubuhnya

## Game Play

Terdapat misi makanan apa yang harus dimakan di bagian pojok kiri atas. Kontrol si Monki kekiri dan kekanan untuk memakan makanan yang sesuai dengan misi, makanan akan jatuh dari langit dan otomatis dimakan oleh monki ketika mengenai nya.

List misi dalam Diet si Monki

- Karbonhidrat : Memakan makanan yang mengandung karbonhidrat. Makanan berkarbonhidrat memiliki ciri ciri mengenyangkan dan mengandung banyak kalori contoh : kentang, roti dan nasi
- Protein : Memakan makanan yang mengandung protein, protein bisa bersumber dari hewan (protein hewani) atau dari tumbuhan (protein nabati). Bahan makanan yang mengandung protein hewani, antara lain daging, ikan, telur. Adapun contoh protein nabati adalah kacang, kedelai, kacang hijau, dan jenis kacang-kacangan lainnya
- Vitamin : Memakan makanan yang mengandung vitamin, vitamin biasanya banyak terdapat di sayur dan buah. Adapun contoh vitamin adalah jeruk, apel, tomat, pisang, wortel dll
- Lemak : Memakan makanan yang mengandung lemak, Lemak terdapat di biji-bijian seperti kelapa sawit, kelapa maupun coklat. Selian itu lemak juga terdapat pada hewan seperti susu, keju, gajih dan jerohan.

Energi / HP monki akan berkurang seiring berjalannya waktu. Maka dari itu selesaikan misi untuk menambah energi / HP pada monki, hindari memakan makanan yang salah terhadap misi agar energi/hp tidak berkurang.

Game akan berakhir jika Energi/HP kurang dari atau sama dengan 0

## Game Mekanik

- Jalankan monki dengan menekan tombol   pada keyboard
- Ganti misi secara berkala dengan menekan tombol SHIFT pada keyboard, dan misi akan berganti setiap monki memakan object baik benar maupun salah
- Setiap detik HP pada monki akan berkurang sebesar 1 point, pengurangan terhadap HP akan bertambah secara simultan sebesar 0,1% setiap monki memakan object
- Kecepatan makanan yang jatuh dari langit adalah sebesar 3 detik sekali, dan akan bertambah cepat secara simultan sebesar 0,5%, setiap monki memakan object dengan benar dengan misinya
- Jika salah satu misi tercapai maka HP akan bertambah sebanyak 4 point, jika salah satu misi gagal/salah dalam memakan maka HP akan berkurang sebanyak 4
- Perhitungan score didapat, ketika misi tercapai sebesar 1 point dan ketika gagal -1 point
- Game akan berakhir jika Energi/HP kurang dari atau sama dengan 0
