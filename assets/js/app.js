const headerSearch = document.querySelector('.header__search');
const headerSearchInput = document.querySelector('.header__search-input');
const loader = document.querySelector('.scammer-list__loader')
const overlay = document.querySelector('.overlay')
const overlayImage = document.querySelector('.overlay img')
headerSearchInput.addEventListener('click', (e) => {
    e.stopPropagation()
    headerSearch.classList.add('active')
})

window.addEventListener('click', (e) => {
    const active = document.querySelector('.active')
    if(active) {
        headerSearch.classList.remove('active')
    }
})

const scammerApi = 'https://61e8b8af7ced4a00172ff662.mockapi.io/api/listscammer'
const scammerList = document.querySelector('.scammer-list')



/* Function */
function start() {
    getScammerList()
}start()

function renderItem(item) {
    const template = `
    <div class="scammer-item">
        <div class="scammer-header">
            <div class="scammer-header__number">
                #${item.id < 10? '0' : ''}${item.id}
            </div>
            <span class="scammer-header__name">
                ${item.accountHolder}
            </span>
            <span class="scammer-header__more">
                Xem Chi Tiết
            </span> 
        </div>
        <div class="scammer-info">
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="fas fa-user"></i>
                    Họ Tên:
                </div>
                <div class="scammer-info__name">
                    ${item.accountHolder}
                </div>
            </div>
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="fas fa-phone"></i>
                    SĐT:
                </div>
                <div class="scammer-info__name">
                    ${item.phoneNumber}
                </div>
            </div>
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="far fa-address-card"></i>
                    STK:
                </div>
                <div class="scammer-info__name">
                    ${item.accountNumber}
                </div>
            </div>
            <div class="scammer-info__item">
                <div class="scammer-info__title">
                    <i class="fas fa-university"></i>
                    Ngân Hàng:
                </div>
                <div class="scammer-info__name">
                    ${item.bank}
                </div>
            </div>
            <div class="scammer-info__item scammer-info__item-img">
                <div class="scammer-info__title">
                    <i class="fas fa-image"></i>
                    Ảnh Chụp Bằng Chứng:
                </div>
                ${item.image? `<img src="${item.image}" alt="" class="scammer-info__img">`: 'Không có ảnh'}
            </div>
            <div class="scammer-info__item scammer-info__item-desc">
                <div class="scammer-info__title">
                    <i class="fas fa-edit"></i>
                    Hình Thức Lừa Đảo:
                </div>
                <div class="scammer-info__name">
                    ${item.content}
                </div>
            </div>
            <div class="scammer-author">
                <div class="scammer-author__heading">Người Tố Cáo:</div>
                <div class="scammer-author__info">
                    <div class="scammer-author__info-item">
                        <div class="scammer-info__title">Họ Và Tên:</div>
                        <div class="scammer-info__name">${item.authorName}</div>
                    </div>
                    <div class="scammer-author__info-item">
                        <div class="scammer-info__title">Liên Hệ:</div>
                        <div class="scammer-info__name">${item.authorPhone}</div>
                    </div>
                    <div class="scammer-author__info-item">
                        <div class="scammer-info__title">Trạng thái:</div>
                        <div class="scammer-info__name">${item.option}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
scammerList.insertAdjacentHTML('afterbegin', template)
}

async function getScammerList() {
    loader.classList.add('active')
    const res = await fetch(scammerApi)
    const data = await res.json()
    if(data.length > 0 && Array.isArray(data)) {
        data.forEach(item => {
            renderItem(item)
        })
    }
    loader.classList.remove('active')

}

function getUrlImage(urlImage) {
    const template = `
    <div class="overlay">
        <img src="${urlImage}" alt="">
    </div>
    `
    document.body.insertAdjacentHTML('beforeend', template)
}

// Event
scammerList.addEventListener('click', (e) => {
    if(e.target.matches('.scammer-header')) {
        const scammerInfo = e.target.nextElementSibling
        scammerInfo.style.height = `${scammerInfo.scrollHeight}px`
        scammerInfo.classList.toggle('active')
        if(!scammerInfo.classList.contains('active')) {
            scammerInfo.style.height = `0px`
        }
    }else if(e.target.matches('.scammer-info__img')) {
        const urlImage = e.target.getAttribute('src')
        getUrlImage(urlImage)
    }
})

document.body.addEventListener('click', (e) => {
    if(e.target.matches('.overlay')){
        e.target.parentNode.removeChild(e.target)
    }
})
