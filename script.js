// Data Awal (Kosong)
let dataPoints = [
    { x: '', y: '' },
    { x: '', y: '' }
];

const container = document.getElementById('dataRows');
const resultBox = document.getElementById('resultBox');

// Fungsi Render Ulang Tampilan Input
function renderRows() {
    container.innerHTML = '';
    dataPoints.forEach((point, index) => {
        const row = document.createElement('div');
        row.className = 'row-item';
        row.innerHTML = `
            <div class="row-number">${index + 1}</div>
            <input type="number" placeholder="0" value="${point.x}" onchange="updateData(${index}, 'x', this.value)">
            <input type="number" placeholder="0" value="${point.y}" onchange="updateData(${index}, 'y', this.value)">
            <button class="btn-delete" onclick="deleteRow(${index})" title="Hapus Baris">✕</button>
        `;
        container.appendChild(row);
    });
}

// Update Data saat mengetik
function updateData(index, key, value) {
    dataPoints[index][key] = value;
}

// Tambah Baris Baru
function addRow() {
    dataPoints.push({ x: '', y: '' });
    renderRows();
    container.scrollTop = container.scrollHeight;
}

// Hapus Baris
function deleteRow(index) {
    if (dataPoints.length > 2) {
        dataPoints.splice(index, 1);
        renderRows();
    } else {
        alert("Minimal sisakan 2 data biar bisa dihitung, Bang!");
    }
}

// Reset Semua
function resetData() {
    dataPoints = [{ x: '', y: '' }, { x: '', y: '' }];
    renderRows();
    resultBox.classList.remove('active');
}

// Load Data Contoh
function loadSample() {
    dataPoints = [
        { x: 10, y: 45 },
        { x: 20, y: 75 },
        { x: 30, y: 105 },
        { x: 40, y: 135 }
    ];
    renderRows();
}

// HITUNG REGRESI
function calculateRegression() {
    // Filter data kosong
    const validData = dataPoints.filter(p => p.x !== '' && p.y !== '');
    
    if (validData.length < 2) {
        alert("Isi minimal 2 data lengkap dulu ya, Si Tampan!");
        return;
    }

    const n = validData.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    validData.forEach(p => {
        const x = parseFloat(p.x);
        const y = parseFloat(p.y);
        sumX += x;
        sumY += y;
        sumXY += (x * y);
        sumX2 += (x * x);
    });

    // Rumus Statistika: b (slope)
    const slope = ((n * sumXY) - (sumX * sumY)) / ((n * sumX2) - (sumX * sumX));
    
    // Rumus Statistika: a (intercept)
    const avgX = sumX / n;
    const avgY = sumY / n;
    const intercept = avgY - (slope * avgX);

    // Tampilkan Hasil
    const operator = intercept >= 0 ? '+' : '-';
    const displayIntercept = Math.abs(intercept).toFixed(2);
    
    document.getElementById('equationOutput').innerHTML = 
        `Y = ${slope.toFixed(3)}X ${operator} ${displayIntercept}`;
    
    document.getElementById('valA').innerText = intercept.toFixed(3);
    document.getElementById('valB').innerText = slope.toFixed(3);
    document.getElementById('meanX').innerText = avgX.toFixed(2);
    document.getElementById('meanY').innerText = avgY.toFixed(2);

    resultBox.classList.add('active');
}

// Jalankan render pertama kali saat file dimuat
renderRows();
