import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Directorios
const inputFolder = './src/assets/original'; // Carpeta con imágenes originales
const outputFolder = './src/assets/optimized'; // Carpeta para guardar imágenes optimizadas

// Tamaños deseados
const sizes = [300, 600, 1200]; // Anchos en píxeles

// Verifica que la carpeta de salida exista
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Procesar imágenes
fs.readdirSync(inputFolder).forEach(file => {
  if (file.endsWith('.webp')) { // Solo procesa imágenes WebP
    sizes.forEach(size => {
      sharp(path.join(inputFolder, file))
        .resize(size)
        .toFile(path.join(outputFolder, file.replace('.webp', `-${size}.webp`)))
        .then(() => console.log(`Imagen ${file} redimensionada a ${size}px`))
        .catch(err => console.error('Error procesando imagen:', err));
    });
  }
});
