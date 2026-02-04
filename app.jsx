// App.jsx
import { useState } from 'react';
import './App.css'; // Jangan lupa import CSS-nya

function App() {
  // State untuk data tabel
  const [dataPoints, setDataPoints] = useState([
    { x: '', y: '' },
    { x: '', y: '' }
  ]);

  // State untuk hasil perhitungan (null artinya belum dihitung)
  const [result, setResult] = useState(null);

  // Handle perubahan input
  const handleChange = (index, field, value) => {
    const newData = [...dataPoints];
    newData[index][field] = value;
    setDataPoints(newData);
  };

  // Tambah baris baru
  const addRow = () => {
    setDataPoints([...dataPoints, { x: '', y: '' }]);
  };

  // Hapus baris
  const deleteRow = (index) => {
    if (dataPoints.length > 2) {
      const newData = dataPoints.filter((_, i) => i !== index);
      setDataPoints(newData);
    } else {
      alert("Minimal sisakan 2 data biar bisa dihitung, Bang!");
    }
  };

  // Load Data Contoh
  const loadSample = () => {
    setDataPoints([
      { x: 10, y: 45 },
      { x: 20, y: 75 },
      { x: 30, y: 105 },
      { x: 40, y: 135 }
    ]);
    setResult(null); // Reset hasil kalau ganti data
  };

  // Reset Semua
  const resetData = () => {
    setDataPoints([{ x: '', y: '' }, { x: '', y: '' }]);
    setResult(null);
  };

  // LOGIKA HITUNG REGRESI
  const calculateRegression = () => {
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

    // Rumus Slope (b)
    const slope = ((n * sumXY) - (sumX * sumY)) / ((n * sumX2) - (sumX * sumX));
    
    // Rumus Intercept (a)
    const avgX = sumX / n;
    const avgY = sumY / n;
    const intercept = avgY - (slope * avgX);

    setResult({
      slope: slope,
      intercept: intercept,
      avgX: avgX,
      avgY: avgY
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Analisis Regresi Linier</h1>
        <p className="subtitle">Concurrent Users (X) vs Response Time (Y)</p>
      </header>

      {/* Header Kolom */}
      <div className="input-header">
        <span>No</span>
        <span>User (X)</span>
        <span>Time (Y)</span>
        <span>Aksi</span>
      </div>

      {/* Input Rows Loop */}
      <div className="data-rows">
        {dataPoints.map((point, index) => (
          <div key={index} className="input-row">
            <div className="row-num">{index + 1}</div>
            <input 
              type="number" 
              placeholder="0" 
              value={point.x} 
              onChange={(e) => handleChange(index, 'x', e.target.value)} 
            />
            <input 
              type="number" 
              placeholder="0" 
              value={point.y} 
              onChange={(e) => handleChange(index, 'y', e.target.value)} 
            />
            <button className="btn-del" onClick={() => deleteRow(index)} title="Hapus">
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Tombol Action */}
      <div className="actions">
        <button className="action-btn btn-add" onClick={addRow}>+ Tambah</button>
        <button className="action-btn btn-sample" onClick={loadSample}>Isi Contoh</button>
        <button className="action-btn btn-reset" onClick={resetData}>Reset</button>
        <button className="action-btn btn-calc" onClick={calculateRegression}>Hitung Regresi 🚀</button>
      </div>

      {/* Hasil Perhitungan (Conditional Rendering) */}
      {result && (
        <div className="result-box">
          <div className="result-title">Persamaan Regresi (Model)</div>
          <div className="equation">
            Y = {result.slope.toFixed(3)}X {result.intercept >= 0 ? '+' : '-'} {Math.abs(result.intercept).toFixed(2)}
          </div>
          
          <div className="detail-grid">
            <div className="detail-item">
              <span>Konstanta (a)</span>
              <strong>{result.intercept.toFixed(3)}</strong>
            </div>
            <div className="detail-item">
              <span>Koefisien (b)</span>
              <strong>{result.slope.toFixed(3)}</strong>
            </div>
            <div className="detail-item">
              <span>Rata-rata X</span>
              <strong>{result.avgX.toFixed(2)}</strong>
            </div>
            <div className="detail-item">
              <span>Rata-rata Y</span>
              <strong>{result.avgY.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
