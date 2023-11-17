
document.addEventListener("DOMContentLoaded", function() {
    const listItems = document.querySelectorAll(".message.li");

    listItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const itemId = event.currentTarget.id;
            window.location.href = '/message/' + itemId;
        })
    })
})
