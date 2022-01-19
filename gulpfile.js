const { src, dest, watch, parallel} = require('gulp'); //Llamamos las funcionabilidades de gulp "src" para source que es de donde vamos a leer la informacion, "dest" para destination o destino (de donde vamos a mandar el archivo que creemos) y "watch" para observar un archivo o funcion

const sass = require('gulp-sass')(require('sass'));//Llamamos en la constante a la variable de gulp-sass, y le definimos el motor sass en el segundo require, ya que gulp-sass actualmente no tiene, podriamos elegir dart-sass, etc.

const plumber = require('gulp-plumber');

const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');


//creamos la funcion que va a compilar nuestro scss a css
    function css( done ) {
        src('src/scss/**/*.scss') //aqui estamos diciendole a src, donde tiene que ver el archivo scss, la sintaxis de **/*.scss indica que busque tanto en la raiz de scss como en los archivos que se encuentren dentro las carpetas que tengamos dentro y nos compile los archivos que finalicen en .scss
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass())//compilar con la funcion sass el archivo
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write('.'))
            .pipe(dest('build/css')) //almacenarlo en el dest o destino que elijamos, recordemos que el nombre que lleve el scss principal que compilemos, es el mismo nombre que recibiar en la carpeta css nuestro archivo, osea que si lo llamamos estilos.scss, en la carpeta css tendremos estilos.css.
        done();//callback
    };

    function imagenes( done){

        const opciones = {
            optimizationLevel: 3
        }

        src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
        done();
    }

    function versionWebp(done){
        const opciones = {
            quality: 50
        }
        src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
        done();
    }
    function javascript(done){
        src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('build/js'));
        done();
    }

    function compilacion( done) {
        watch( 'src/scss/**/*.scss', css);//ahora usamos el watch que habiamos llamado en gulp, que lo que hace es "observar" los cambios sobre los archivos en raiz y carpetas dentro del directorio scss, siempre y cuando los archivos que modifiquemos finalicen con la extension scss.
        watch( 'src/js/**/*.js', javascript);
        done();
    };

    function versionAvif(done){
        const opciones = {
            quality: 50
        }
        src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
        done();
    }

exports.css = css; 
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.compilacion = parallel(imagenes,versionWebp,versionAvif,compilacion, javascript) ;