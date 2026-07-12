/*==================================================
        BETTA FISH SALES
        SCRIPT.JS
==================================================*/

/*=========================================
    VARIABEL
=========================================*/

let dataPenjualan = [];

let editIndex = -1;


/*=========================================
    MENAMPILKAN SECTION
=========================================*/

function tampilSection(id){

    const semuaSection = document.querySelectorAll("section");

    semuaSection.forEach(function(section){

        section.style.display = "none";

    });

    document.getElementById(id).style.display = "block";

}


/*=========================================
    SAAT WEBSITE DIBUKA
=========================================*/

window.onload = function(){

    tampilSection("beranda");

    loadData();

}
/*=========================================
    SIMPAN DATA KE LOCAL STORAGE
=========================================*/

function simpanLocalStorage(){

    localStorage.setItem(

        "penjualanCupang",

        JSON.stringify(dataPenjualan)

    );

}


/*=========================================
    LOAD DATA
=========================================*/

function loadData(){

    let data = localStorage.getItem("penjualanCupang");

    if(data){

        dataPenjualan = JSON.parse(data);

    }

    tampilkanData();

    updateStatistik();

}
/*=========================================
        UPDATE STATISTIK
=========================================*/

function updateStatistik(){

    document.getElementById("totalIkan").innerHTML = dataPenjualan.length;

    let terjual = dataPenjualan.filter(function(item){

        return item.status === "Sudah Terjual";

    }).length;

    document.getElementById("ikanTerjual").innerHTML = terjual;

    document.getElementById("belumTerjual").innerHTML = dataPenjualan.length - terjual;

}
/*=========================================
        SIMPAN DATA PENJUALAN
=========================================*/

const form = document.getElementById("formPenjualan");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const namaIkan = document.getElementById("namaIkan").value.trim();

    const jenis = document.getElementById("jenis").value;

    const harga = document.getElementById("harga").value;

    const pembeli = document.getElementById("pembeli").value.trim();

    const status = document.querySelector('input[name="status"]:checked').value;

    const catatan = document.getElementById("catatan").value.trim();

    if(namaIkan === ""){

        alert("Nama ikan tidak boleh kosong!");

        return;

    }

    if(harga === ""){

        alert("Harga harus diisi!");

        return;

    }

    const data = {

        namaIkan,

        jenis,

        harga,

        pembeli,

        status,

        catatan

    };

    if(editIndex === -1){

        dataPenjualan.push(data);

        alert("Data berhasil ditambahkan.");

    }else{

        dataPenjualan[editIndex] = data;

        editIndex = -1;

        document.getElementById("btnSimpan").innerHTML =
        '<i class="fa-solid fa-floppy-disk"></i> Simpan';

        alert("Data berhasil diperbarui.");

    }

    simpanLocalStorage();

    tampilkanData();

    updateStatistik();

    form.reset();

});
/*=========================================
        MENAMPILKAN DATA
=========================================*/

function tampilkanData(){

    const tbody = document.querySelector("#tabelPenjualan tbody");

    tbody.innerHTML = "";

    dataPenjualan.forEach(function(item,index){

        tbody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${item.namaIkan}</td>

            <td>${item.jenis}</td>

            <td>Rp ${Number(item.harga).toLocaleString("id-ID")}</td>

            <td>${item.pembeli}</td>

            <td>${item.status}</td>

            <td>${item.catatan}</td>

            <td>

                <button
                class="editBtn"
                onclick="editData(${index})">

                Edit

                </button>

                <button
                class="deleteBtn"
                onclick="hapusData(${index})">

                Hapus

                </button>

            </td>

        </tr>

        `;

    });

}
/*=========================================
        EDIT DATA
=========================================*/

function editData(index){

    const item = dataPenjualan[index];

    document.getElementById("namaIkan").value = item.namaIkan;

    document.getElementById("jenis").value = item.jenis;

    document.getElementById("harga").value = item.harga;

    document.getElementById("pembeli").value = item.pembeli;

    document.getElementById("catatan").value = item.catatan;

    const radio = document.querySelector(
        `input[name="status"][value="${item.status}"]`
    );

    if(radio){

        radio.checked = true;

    }

    editIndex = index;

    document.getElementById("btnSimpan").innerHTML =
    '<i class="fa-solid fa-pen"></i> Update Data';

    tampilSection("form");

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
/*=========================================
        HAPUS DATA
=========================================*/

function hapusData(index){

    const yakin = confirm(

        "Apakah Anda yakin ingin menghapus data ini?"

    );

    if(!yakin){

        return;

    }

    dataPenjualan.splice(index,1);

    simpanLocalStorage();

    tampilkanData();

    updateStatistik();

    alert("Data berhasil dihapus.");

}
/*=========================================
        DESKRIPSI IKAN
=========================================*/

const deskripsiIkan = {

    "Halfmoon":
    "Halfmoon memiliki ekor yang dapat membuka hingga 180°. Jenis ini terkenal karena bentuk siripnya yang indah dan sering dijadikan ikan kontes.",

    "Plakat":
    "Plakat memiliki sirip pendek, tubuh kekar, aktif berenang, dan terkenal memiliki daya tahan yang baik.",

    "Avatar":
    "Cupang Avatar memiliki warna hijau metalik yang sangat mencolok sehingga banyak diminati kolektor.",

    "Galaxy":
    "Cupang Galaxy mempunyai corak bintik-bintik seperti galaksi dengan perpaduan warna biru, hitam, dan putih.",

    "Koi":
    "Cupang Koi mempunyai motif menyerupai ikan koi Jepang dengan kombinasi warna merah, putih, dan hitam.",

    "Hellboy":
    "Hellboy dikenal dengan warna merah menyala yang dipadukan hitam sehingga tampil sangat elegan.",

    "Dumbo Ear":
    "Cupang Dumbo Ear mempunyai sirip dada yang lebar menyerupai telinga gajah sehingga terlihat unik.",

    "Crowntail":
    "Crowntail memiliki ujung sirip bergerigi menyerupai mahkota dan merupakan salah satu jenis cupang paling populer."

};
/*=========================================
        MODAL DESKRIPSI
=========================================*/

function tampilkanDeskripsi(nama){

    document.getElementById("modalDeskripsi").style.display="block";

    document.getElementById("judulDeskripsi").innerHTML=nama;

    document.getElementById("isiDeskripsi").innerHTML=

    deskripsiIkan[nama];

}

function tutupDeskripsi(){

    document.getElementById("modalDeskripsi").style.display="none";

}

window.onclick=function(event){

    const modal=document.getElementById("modalDeskripsi");

    if(event.target==modal){

        modal.style.display="none";

    }

}
/*=========================================
    FORMAT HARGA
=========================================*/

const inputHarga = document.getElementById("harga");

if(inputHarga){

    inputHarga.addEventListener("input", function(){

        let angka = this.value.replace(/[^0-9]/g,"");

        this.value = angka;

    });

}
/*=========================================
    HAPUS SEMUA DATA
=========================================*/

function hapusSemuaData(){

    if(dataPenjualan.length===0){

        alert("Belum ada data.");

        return;

    }

    let yakin=confirm("Hapus seluruh data penjualan?");

    if(!yakin){

        return;

    }

    dataPenjualan=[];

    simpanLocalStorage();

    tampilkanData();

    updateStatistik();

    alert("Semua data berhasil dihapus.");

}
/*=========================================
    CETAK DATA
=========================================*/

function cetakData(){

    window.print();

}
/*=========================================
    EXPORT CSV
=========================================*/

function exportCSV(){

    if(dataPenjualan.length===0){

        alert("Belum ada data.");

        return;

    }

    let csv="No,Nama Ikan,Jenis,Harga,Pembeli,Status,Catatan\n";

    dataPenjualan.forEach(function(item,index){

        csv+=

        `${index+1},"${item.namaIkan}","${item.jenis}",${item.harga},"${item.pembeli}","${item.status}","${item.catatan}"\n`;

    });

    let blob=new Blob([csv],{

        type:"text/csv;charset=utf-8;"

    });

    let url=URL.createObjectURL(blob);

    let a=document.createElement("a");

    a.href=url;

    a.download="Data_Penjualan_Ikan_Cupang.csv";

    a.click();

}/*=========================================
    EXPORT CSV
=========================================*/

function exportCSV(){

    if(dataPenjualan.length===0){

        alert("Belum ada data.");

        return;

    }

    let csv="No,Nama Ikan,Jenis,Harga,Pembeli,Status,Catatan\n";

    dataPenjualan.forEach(function(item,index){

        csv+=

        `${index+1},"${item.namaIkan}","${item.jenis}",${item.harga},"${item.pembeli}","${item.status}","${item.catatan}"\n`;

    });

    let blob=new Blob([csv],{

        type:"text/csv;charset=utf-8;"

    });

    let url=URL.createObjectURL(blob);

    let a=document.createElement("a");

    a.href=url;

    a.download="Data_Penjualan_Ikan_Cupang.csv";

    a.click();

}
/*=========================================
    NOTIFIKASI
=========================================*/

function tampilNotifikasi(pesan){

    let notif=document.createElement("div");

    notif.innerHTML=pesan;

    notif.style.position="fixed";

    notif.style.top="20px";

    notif.style.right="20px";

    notif.style.background="#0096c7";

    notif.style.color="white";

    notif.style.padding="15px 25px";

    notif.style.borderRadius="10px";

    notif.style.boxShadow="0 5px 15px rgba(0,0,0,.3)";

    notif.style.zIndex="9999";

    notif.style.fontWeight="bold";

    document.body.appendChild(notif);

    setTimeout(function(){

        notif.remove();

    },2500);

}
/*=========================================
    ESC CLOSE MODAL
=========================================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        tutupDeskripsi();

    }

});