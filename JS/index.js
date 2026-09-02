// Declaração de variaveis
let indice = 0
let imagens = [
    "img/shark_cake.jpg",
    "img/chocolate_cake.jpg",
    "img/cat_cake.jpg"
]


// FUnção para trocar a imagem
function trocar() {
    let img = document.getElementById("img")
    img.src = imagens[indice]
}

// Logica para trocar de imagem
setInterval(function() {
    trocar()
    indice++

    if (indice >= imagens.length) {
        indice = 0
    }

}, 5000)

// trocar()