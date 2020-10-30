const options = {   /*desabilita o usuário a mexer no mapa, ele fica estático*/
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false, /*rodinha do mouse*/
    zoomControl: false /*é o controle de zoom fixo no mapa*/
}

//get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng


/* create map */
const map = L.map('mapid', options/*variável no argumento com a config que o deixa estático*/).setView([lat,lng], 15)//localização que o mapa abre


/* create and add tileLayer */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)


/* create icon */
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
})

/*create and add marker*/
L
.marker([lat, lng], { icon })//localização, pop-up mostra no mapa
.addTo(map)


/* image gallery */

function selectImage(event) {
    const button = event.currentTarget

    //remover todas as classes .active
    const buttons = document.querySelectorAll(".images button")
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button) {
        button.classList.remove("active")  
    }
    //selecionar a image clicada e coloca-lá como principal
    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")

    //atualizar o container de image
    imageContainer.src = image.src

    //adicionar a classe .active para este button
    button.classList.add("active")
} 