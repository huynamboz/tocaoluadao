const scammerApi = 'https://61e8b8af7ced4a00172ff662.mockapi.io/api/listscammer'
const formPost = document.querySelector('.form-post')
const btnSubmit = document.querySelector('.btn-submit')
const loader = document.querySelector('.loader')

// Function
async function postScammer({accountHolder, phoneNumber, accountNumber, bank, image, content, option, authorName, authorPhone}) {
    btnSubmit.classList.add("is-loading");
    await fetch(scammerApi, {
        method: 'POST',
        body: JSON.stringify({
            accountHolder,
            phoneNumber,
            accountNumber,
            bank,
            image,
            content,
            option,
            authorName,
            authorPhone,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}

// Toast
function showSuccessToast() {
    toast({
        title: "Thành công!",
        message: "Dữ liệu đã được post lên. Vui lòng về lại trang chủ để xem",
        type: "success",
        duration: 3000
    });
}

formPost.addEventListener('submit', async function(e) {
    e.preventDefault()
    const scammerList = {
        accountHolder: this.elements['accountHolder'].value,
        phoneNumber: +this.elements['phoneNumber'].value,
        accountNumber: +this.elements['accountNumber'].value,
        bank: this.elements['bank'].value,
        image: this.elements['image'].value,
        content: this.elements['content'].value,
        option: this.elements['option'].value,
        authorName: this.elements['authorName'].value,
        authorPhone: this.elements['authorPhone'].value,
    }
    await postScammer(scammerList)
    this.reset()
    showSuccessToast()
    btnSubmit.classList.remove("is-loading");
})
