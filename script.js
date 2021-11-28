const contenedorImagen = document.getElementById("contenedor_imagen");
const loader = document.getElementById("loader");

let ready = false;
let imagenesCargadas=0;
let imagenesTotales=0;
let photosArray=[];

const count = 30;
const apiKey='8XNgiwcU6v_c90mJMom3wK_KeeV3djenEJwvYFKXu7E';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function imageLoaded(){
    loader.hidden=false;
    imagenesCargadas++;
    loader.hidden=true;
    if(imagenesCargadas===imagenesTotales){
        ready=true;
    }
}

function displayPhoto(){
    imagenesCargadas=0;
    imagenesTotales=photosArray.length;

    photosArray.forEach(photo=>{
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt', photo.description);
        img.setAttribute('title',photo.description);

        img.addEventListener('load',imageLoaded);

        item.appendChild(img);
        contenedorImagen.appendChild(item);

    });
}


async function getPhotos(){
    try {
        loader.hidden=false;
        const respuesta = await fetch(apiUrl);
        photosArray = await respuesta.json();
        loader.hidden=true;
        displayPhoto();
    } catch (error) {
        
    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready=false;
        getPhotos();
    }
})

getPhotos();