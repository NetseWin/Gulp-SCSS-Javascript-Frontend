document.addEventListener('DOMContentLoaded', function(){
	iniciarApp();
});

function iniciarApp(){
	navegacionFija();
	crearGaleria();
	scrollNav();
}
function navegacionFija(){
	const barra = document.querySelector('.header');
	const sobreFestival = document.querySelector('.sobre-festival');

	window.addEventListener('scroll', function(){
		if(sobreFestival.getBoundingClientRect().top < 0){
			barra.classList.add('fijo');
		}else{
			barra.classList.remove('fijo');
		}
	})
	
}

function scrollNav(){
	const enlaces = document.querySelectorAll('.navegacion-principal a');
	
	enlaces.forEach(enlace => {
		enlace.addEventListener('click', function(e){
			e.preventDefault();
			const seccionScroll = (enlace.attributes.href.value);
			const seccion = document.querySelector(seccionScroll);
			seccion.scrollIntoView({behavior: "smooth"});
		})
	})
}

function crearGaleria(){
	const galeria = document.querySelector('.galeria-imagenes');
	for(let i = 1; i <= 12; i++){
		const imagen = document.createElement('picture');
		imagen.innerHTML = `
			<source srcset="build/img/thumb/${i}.avif" type="image/avif">
			<source srcset="build/img/thumb/${i}.webp" type="image/avif">
			<img src="build/img/thumb/${i}.jpg" alt="vocalista invitado">
		`
		imagen.onclick = function(){
			mostrarImagen(i);
		}

		galeria.appendChild(imagen);
	}
}



function mostrarImagen(i){
	const imagen = document.createElement('picture');
		imagen.innerHTML = `
			<source srcset="build/img/grande/${i}.avif" type="image/avif">
			<source srcset="build/img/grande/${i}.webp" type="image/avif">
			<img src="build/img/grande/${i}.jpg" alt="vocalista invitado">
		`
	const overlay = document.createElement('DIV');	
	overlay.appendChild(imagen);
	overlay.classList.add('overlay');
	overlay.onclick = function(){
		const body = document.querySelector('body');
		body.classList.remove('fijar-body');
		overlay.remove();
	}
	
	const body = document.querySelector('body');
	body.appendChild(overlay);
	body.classList.add('fijar-body');
	
	const cerrarModal = document.createElement('P');
	cerrarModal.textContent = 'X';
	cerrarModal.classList.add('btn-cerrar');
	cerrarModal.onclick = function(){
		const body = document.querySelector('body');
		body.classList.remove('fijar-body');
		overlay.remove();
	}
	overlay.appendChild(cerrarModal);
}