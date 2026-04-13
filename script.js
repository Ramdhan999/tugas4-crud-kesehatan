let dataPasien = JSON.parse(localStorage.getItem('pasien')) || [];

function renderTable() {
    const tbody = document.getElementById('tabelPasien');
    tbody.innerHTML = '';
    
    dataPasien.forEach((pasien, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${pasien.nama}</td>
                <td>${pasien.umur}</td>
                <td>${pasien.diagnosa}</td>
                <td>
                    <button class="btn-edit" onclick="editData(${index})">Edit</button>
                    <button class="btn-delete" onclick="hapusData(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

document.getElementById('formPasien').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const umur = document.getElementById('umur').value;
    const diagnosa = document.getElementById('diagnosa').value;
    const index = document.getElementById('indexPasien').value;

    if (index === '') {
        // Create Data Baru
        dataPasien.push({ nama, umur, diagnosa });
    } else {
        // Update Data Lama
        dataPasien[index] = { nama, umur, diagnosa };
        document.getElementById('indexPasien').value = '';
    }

    localStorage.setItem('pasien', JSON.stringify(dataPasien));
    this.reset();
    renderTable();
});

function hapusData(index) {
    if(confirm('Yakin mau hapus data ini?')) {
        dataPasien.splice(index, 1);
        localStorage.setItem('pasien', JSON.stringify(dataPasien));
        renderTable();
    }
}

function editData(index) {
    document.getElementById('nama').value = dataPasien[index].nama;
    document.getElementById('umur').value = dataPasien[index].umur;
    document.getElementById('diagnosa').value = dataPasien[index].diagnosa;
    document.getElementById('indexPasien').value = index;
}

// Render tabel saat pertama kali web dibuka
renderTable();