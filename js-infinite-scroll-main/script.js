const container = document.getElementById('container')
const loading = document.getElementById('loading')

let isLoading = false

async function fetchAnimeImg() {
    try {
        const response = await fetch('https://api.waifu.pics/sfw/waifu')
        const data = await response.json()
        return data.url
    } catch(error) {
        console.error('Error fetching image:', error)
        return null
    }
}

async function loadItems(count) {
    for(let i=0; i < count; i++) {
        const imgUrl = await fetchAnimeImg()
        const item = document.createElement('div')
        item.classList.add('item')
        if(imgUrl) {
            const img = document.createElement('img')
            img.src = imgUrl
            item.appendChild(img)
        } else {
            item.textContent = "Failed to load image"
        }
        container.appendChild(item)
    }   
}

function loadMoreItems() {
    if(isLoading) return
    isLoading = true
    loading.style.display = 'block'

    setTimeout(async()=> {
        await loadItems(10)
        loading.style.display = 'none'
        isLoading = false
    }, 1000)
}

window.onscroll = ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        loadMoreItems()
    }
}

loadItems(10)