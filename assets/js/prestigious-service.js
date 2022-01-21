const reputationHeader = document.querySelectorAll('.reputation-item__header')
// Function
function showReputationBody(e) {
    const reputationBody = e.currentTarget.nextElementSibling
    reputationBody.style.height = `${reputationBody.scrollHeight}px`
    reputationBody.classList.toggle('active')
    if(!reputationBody.classList.contains('active')) {
        reputationBody.style.height = `0px`

    }
    
}

// Event
reputationHeader.forEach(item => item.addEventListener('click', showReputationBody))