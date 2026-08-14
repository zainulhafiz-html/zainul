/* =====================================================
   NAVBAR
===================================================== */

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.3)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =====================================================
   PRODUK
===================================================== */

function sewa(nama, harga) {

    window.location.href =
        `transaksi.html?produk=${encodeURIComponent(nama)}&harga=${harga}`;

}


/* =====================================================
   PENCARIAN PRODUK
===================================================== */

const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        let filter =
            this.value.toUpperCase();

        let produk =
            document.querySelectorAll(".produk");

        produk.forEach(function (card) {

            let nama =
                card.querySelector("h3")
                .textContent
                .toUpperCase();

            if (nama.indexOf(filter) > -1) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =====================================================
   TRANSAKSI
===================================================== */

const params =
    new URLSearchParams(window.location.search);

const produk =
    params.get("produk");

const harga =
    params.get("harga");


const inputProduk =
    document.getElementById("produk");

const inputHarga =
    document.getElementById("harga");


/* Mengisi produk dan harga otomatis */

if (inputProduk && inputHarga) {

    inputProduk.value =
        produk || "";

    inputHarga.value =
        harga
            ? "Rp " +
              Number(harga)
              .toLocaleString("id-ID")
            : "";

}


/* =====================================================
   TANGGAL
===================================================== */

const tanggalSewa =
    document.getElementById("tgl");

const tanggalKembali =
    document.getElementById("tglKembali");


/* Mengatur tanggal minimum */

if (tanggalSewa) {

    const hariIni =
        new Date()
        .toISOString()
        .split("T")[0];

    tanggalSewa.min =
        hariIni;

}


if (tanggalSewa && tanggalKembali) {

    tanggalSewa.addEventListener(
        "change",
        function () {

            tanggalKembali.min =
                tanggalSewa.value;

            /*
             * Jika tanggal kembali
             * lebih kecil dari tanggal sewa,
             * kosongkan tanggal kembali.
             */

            if (
                tanggalKembali.value &&
                tanggalKembali.value <
                tanggalSewa.value
            ) {

                tanggalKembali.value = "";

            }

            hitungHari();

        }
    );


    tanggalKembali.addEventListener(
        "change",
        function () {

            hitungHari();

        }
    );

}


/* =====================================================
   MENGHITUNG LAMA SEWA
===================================================== */

function hitungHari() {

    const hariInput =
        document.getElementById("hari");

    if (
        !tanggalSewa ||
        !tanggalKembali ||
        !hariInput
    ) {

        return;

    }


    if (
        tanggalSewa.value === "" ||
        tanggalKembali.value === ""
    ) {

        hariInput.value =
            "0 hari";

        return;

    }


    const mulai =
        new Date(
            tanggalSewa.value
        );

    const kembali =
        new Date(
            tanggalKembali.value
        );


    const selisih =
        kembali - mulai;


    const jumlahHari =
        selisih /
        (1000 * 60 * 60 * 24);


    if (jumlahHari <= 0) {

        hariInput.value =
            "Tanggal tidak valid";

        return;

    }


    hariInput.value =
        jumlahHari + " hari";

}


/* =====================================================
   HITUNG TOTAL TRANSAKSI
===================================================== */

function hitungTotal() {

    const nama =
        document.getElementById("nama").value.trim();

    const hp =
        document.getElementById("hp").value.trim();

    const hariText =
        document.getElementById("hari").value;


    /* ================= VALIDASI ================= */

    if (nama === "") {

        alert(
            "Silakan masukkan nama penyewa!"
        );

        return;

    }


    if (hp === "") {

        alert(
            "Silakan masukkan nomor HP!"
        );

        return;

    }


    if (!produk || !harga) {

        alert(
            "Silakan pilih mobil terlebih dahulu!"
        );

        return;

    }


    if (
        !tanggalSewa.value ||
        !tanggalKembali.value
    ) {

        alert(
            "Silakan pilih tanggal sewa dan tanggal kembali!"
        );

        return;

    }


    const hari =
        parseInt(
            hariText
        );


    if (
        isNaN(hari) ||
        hari <= 0
    ) {

        alert(
            "Tanggal kembali harus setelah tanggal sewa!"
        );

        return;

    }


    /* ================= TOTAL ================= */

    const total =
        Number(harga) *
        hari;


    /* ================= FORMAT TANGGAL ================= */

    const tanggalMulai =
        formatTanggal(
            tanggalSewa.value
        );


    const tanggalAkhir =
        formatTanggal(
            tanggalKembali.value
        );


    /* ================= STRUK ================= */

    document.getElementById("hasil").innerHTML = `

        <div class="detail">

            <span>
                Nama Penyewa
            </span>

            <span>
                ${nama}
            </span>

        </div>


        <div class="detail">

            <span>
                Nomor HP
            </span>

            <span>
                ${hp}
            </span>

        </div>


        <div class="detail">

            <span>
                Mobil
            </span>

            <span>
                ${produk}
            </span>

        </div>


        <div class="detail">

            <span>
                Harga / Hari
            </span>

            <span>
                Rp ${Number(harga)
                    .toLocaleString("id-ID")}
            </span>

        </div>


        <div class="detail">

            <span>
                Tanggal Sewa
            </span>

            <span>
                ${tanggalMulai}
            </span>

        </div>


        <div class="detail">

            <span>
                Tanggal Kembali
            </span>

            <span>
                ${tanggalAkhir}
            </span>

        </div>


        <div class="detail">

            <span>
                Lama Sewa
            </span>

            <span>
                ${hari} Hari
            </span>

        </div>


        <div class="total-box">

            <p>
                Total Pembayaran
            </p>

            <h1>
                Rp ${total
                    .toLocaleString("id-ID")}
            </h1>

        </div>

    `;


    /* ================= POPUP ================= */

    alert(
        "Transaksi berhasil dihitung!"
    );

}


/* =====================================================
   FORMAT TANGGAL
===================================================== */

function formatTanggal(tanggal) {

    const date =
        new Date(tanggal);


    return date.toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


/* =====================================================
   KEMBALI KE BERANDA
===================================================== */

function kembali() {

    window.location.href =
        "index.html";

}

/* =====================================================
   FORM KONTAK
===================================================== */

function kirimPesan() {

    const nama =
        document.getElementById("namaKontak").value.trim();

    const email =
        document.getElementById("emailKontak").value.trim();

    const pesan =
        document.getElementById("pesanKontak").value.trim();


    /* ================= VALIDASI ================= */

    if (nama === "") {

        alert(
            "Silakan masukkan nama Anda!"
        );

        return;
    }


    if (email === "") {

        alert(
            "Silakan masukkan email Anda!"
        );

        return;
    }


    if (pesan === "") {

        alert(
            "Silakan tulis pesan Anda!"
        );

        return;
    }


    /* ================= POPUP ================= */

    alert(
        "Pesan berhasil dikirim! Terima kasih telah menghubungi Rental Mobil."
    );


    /* ================= RESET FORM ================= */

    document.getElementById("namaKontak").value = "";

    document.getElementById("emailKontak").value = "";

    document.getElementById("pesanKontak").value = "";

}