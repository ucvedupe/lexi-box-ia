LEXIBOX IA — GUÍA RÁPIDA PARA EDITAR EL CÓDIGO
================================================

El código está separado por archivos y organizado por bloques identificados.
Abre la carpeta completa en Visual Studio Code para editarlo.

1. HTML — ESTRUCTURA Y CONTENIDO
   index.html    : página de inicio. Sus bloques están marcados como GRUPO 1, 2, 3...
   producto.html : información y presentación del producto.
   juegos.html   : juegos y actividades.
   equipo.html   : presentación del equipo emprendedor.
   contacto.html : formulario y datos de contacto.
   Busca los comentarios <!-- GRUPO ... --> para saltar a cada sección.

2. CSS — DISEÑO Y APARIENCIA
   css/styles.css : todos los estilos del sitio.
   Está dividido con encabezados /* GRUPO ... */. Cada propiedad CSS va en su
   propia línea para que puedas localizar y cambiar colores, tamaños, espacios,
   tarjetas, juegos, botones, chatbot, WhatsApp y buscador.

3. JAVASCRIPT — FUNCIONES
   js/main.js       : menú y funciones generales.
   js/vocabulary.js : banco de palabras y conceptos.
   js/cards.js      : tarjetas digitales.
   js/games.js      : funcionamiento de los juegos.
   js/site-search.js: buscador interno y búsqueda en Google.
   Cada archivo comienza con su identificación y propósito.

CONSEJO: usa Ctrl+F en Visual Studio Code y busca el nombre del bloque
(por ejemplo: 'GRUPO 7: JUEGOS') para encontrarlo rápidamente.
No cambies los nombres de archivos ni las rutas de los <script> y <link>.


NUEVA ACTUALIZACIÓN VISUAL Y DE CÓDIGO
======================================
- Los archivos HTML están formateados con etiquetas y contenido en líneas separadas.
- El CSS está organizado por reglas, con cada propiedad en su propia línea y grupos identificados.
- cards.js está separado en bloques con nombres explicativos.
- En producto.html se mejoró la presentación de conceptos: título a la izquierda, explicación a la derecha y tarjetas visuales.
- Los cuatro beneficios se muestran en una cuadrícula equilibrada de dos columnas por dos filas.
- Se agregó una galería en la sección Producto con tres espacios visuales para fotografías reales.

CÓMO COLOCAR TUS FOTOGRAFÍAS
----------------------------
1. Crea una carpeta llamada images dentro de lexibox_ia_web.
2. Copia tus fotografías dentro de esa carpeta.
3. En producto.html busca el comentario “GRUPO 7: GALERÍA FOTOGRÁFICA DEL PRODUCTO”.
4. Reemplaza cada bloque <div class="gallery-photo ..."> por una imagen, por ejemplo:
   <img src="images/caja-lexibox.jpg" alt="Caja educativa LexiBox IA">
5. Conserva la clase product-gallery-item para mantener la distribución y el diseño.


============================================================
PRESENTACIÓN VISUAL Y FOTOGRAFÍAS EDITABLES
============================================================

PRODUCTO PRINCIPAL
- Abre producto.html.
- Busca el bloque: GRUPO 2: PRESENTACIÓN DEL PRODUCTO.
- La imagen principal se cambia en el atributo src de:
  class="product-main-image"
- Actualmente usa images/lexibox-producto.svg.
- Puedes guardar tu foto dentro de la carpeta images y cambiar el
  src por ejemplo a images/mi-caja.jpg.

GALERÍA DEL EMPRENDIMIENTO
- En producto.html busca: GRUPO 9: GALERÍA DE FOTOGRAFÍAS.
- Cambia los tres atributos src:
  images/galeria-caja.svg
  images/galeria-tarjetas.svg
  images/galeria-aprendizaje.svg
- Coloca tus fotos en la carpeta images y escribe sus nombres en src.

DISTRIBUCIÓN RESPONSIVE
- En css/styles.css busca: GRUPO 19: PRESENTACIÓN CENTRADA.
- La sección ¿Cómo funciona? usa dos columnas en computadora y tablet,
  por lo que muestra dos tarjetas arriba y dos abajo.
- En celular las tarjetas se apilan y quedan centradas.
- ¿Qué incluye? muestra dos tarjetas equilibradas y centradas.
- La sección Físico + digital mantiene la imagen a la izquierda y el
  texto a la derecha en pantallas grandes; en celular se centra y apila.


FOTOGRAFÍAS REEMPLAZABLES
========================
INICIO: fotografía grupal -> images/equipo-grupal.jpg
INICIO: producto -> images/producto-caja.jpg, images/producto-tarjetas.jpg, images/producto-uso.jpg
PÁGINA EQUIPO: una foto por integrante -> images/integrante-jhanira.jpg, images/integrante-pedro.jpg, images/integrante-ariana.jpg, images/integrante-gisely.jpg, images/integrante-daysi.jpg

Usa tus fotografías con esos nombres y formatos JPG, o cambia el atributo src de cada etiqueta img. Las tarjetas muestran un espacio de reemplazo si la imagen todavía no existe.
