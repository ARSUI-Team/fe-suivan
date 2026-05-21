# 📁 Public Folder - Logo Upload Instructions

## Upload Logo Di Sini

Untuk mengganti icon/favicon website Archa, upload file **archa-hitam.png** ke folder ini.

### ✅ Struktur File:
```
/public/
  ├── archa-hitam.png    ← UPLOAD FILE LOGO DI SINI
  ├── logo Archa.png     (logo existing)
  ├── file.svg
  ├── globe.svg
  ├── next.svg
  ├── vercel.svg
  └── window.svg
```

### 📋 Spesifikasi Logo:
- **Nama File**: `archa-hitam.png` (huruf kecil semua)
- **Format**: PNG dengan transparent background
- **Ukuran**: 512x512px atau lebih besar
- **Aspect Ratio**: 1:1 (square/persegi)

### 🚀 Cara Upload:

#### Option 1: Via Finder/File Explorer
1. Buka folder ini di Finder:
   ```
   /Users/macbookpro/Documents/Archa/public/
   ```
2. Copy-paste atau drag-drop file `archa-hitam.png` ke sini

#### Option 2: Via Terminal
```bash
# Dari folder manapun
cp /path/to/your/archa-hitam.png /Users/macbookpro/Documents/Archa/public/

# Verify file
ls -la /Users/macbookpro/Documents/Archa/public/archa-hitam.png
```

#### Option 3: Via VS Code
1. Buka VS Code
2. Klik folder `public` di sidebar
3. Drag & drop file `archa-hitam.png` ke folder public

### ✨ Setelah Upload:

1. **Restart development server**:
   ```bash
   # Tekan Ctrl+C untuk stop server
   npm run dev  # atau pnpm run dev
   ```

2. **Refresh browser** (Cmd+R atau Ctrl+R)

3. **Check hasil**:
   - Tab browser akan menampilkan logo baru
   - Bookmark akan menggunakan logo baru
   - Mobile home screen icon akan update

### 🔍 Troubleshooting:

**Logo tidak muncul?**
- Pastikan nama file **persis**: `archa-hitam.png` (lowercase)
- Clear browser cache (Cmd+Shift+R atau Ctrl+Shift+R)
- Cek file ada di path yang benar
- Restart server development

**Format file salah?**
- Convert ke PNG jika file format lain
- Pastikan background transparent (optional tapi recommended)

### 📝 Notes:
- File logo existing `logo Archa.png` bisa tetap di-keep (tidak perlu dihapus)
- `archa-hitam.png` akan digunakan sebagai favicon/icon utama
- File akan otomatis ter-serve di URL: `http://localhost:3000/archa-hitam.png`

---

**Ready untuk upload! 🎨**
