function iniciarApp(){navegacionFija(),crearGaleria(),scrollNav()}function navegacionFija(){const e=document.querySelector(".header"),t=document.querySelector(".sobre-festival");window.addEventListener("scroll",(function(){t.getBoundingClientRect().top<0?e.classList.add("fijo"):e.classList.remove("fijo")}))}function scrollNav(){document.querySelectorAll(".navegacion-principal a").forEach((e=>{e.addEventListener("click",(function(t){t.preventDefault();const n=e.attributes.href.value;document.querySelector(n).scrollIntoView({behavior:"smooth"})}))}))}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let t=1;t<=12;t++){const n=document.createElement("picture");n.innerHTML=`\n\t\t\t<source srcset="build/img/thumb/${t}.avif" type="image/avif">\n\t\t\t<source srcset="build/img/thumb/${t}.webp" type="image/avif">\n\t\t\t<img src="build/img/thumb/${t}.jpg" alt="vocalista invitado">\n\t\t`,n.onclick=function(){mostrarImagen(t)},e.appendChild(n)}}function mostrarImagen(e){const t=document.createElement("picture");t.innerHTML=`\n\t\t\t<source srcset="build/img/grande/${e}.avif" type="image/avif">\n\t\t\t<source srcset="build/img/grande/${e}.webp" type="image/avif">\n\t\t\t<img src="build/img/grande/${e}.jpg" alt="vocalista invitado">\n\t\t`;const n=document.createElement("DIV");n.appendChild(t),n.classList.add("overlay"),n.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),n.remove()};const i=document.querySelector("body");i.appendChild(n),i.classList.add("fijar-body");const c=document.createElement("P");c.textContent="X",c.classList.add("btn-cerrar"),c.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),n.remove()},n.appendChild(c)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));