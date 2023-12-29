function addToCart(productId, productName, productPrice) {
    fetch('/add_to_cart/' + productId + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), 
        },
        body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Update the UI to reflect the added item
            updateCartUI(productName, productPrice);
        } else {
            console.error('Error adding item to cart:', data.message);
        }
    })
    .catch(error => console.error('Error adding item to cart:', error));
}

function updateCartUI(productName, productPrice) {
    // Update the cart items UI
    var cartItemsList = document.querySelector('#cd-cart .cd-cart-items');
    var cartTotalElement = document.querySelector('#cart-total');

    // Create a new list item for the added item
    var newItem = document.createElement('li');
    newItem.innerHTML = '<span class="cd-qty">1x</span> ' + productName + '<div class="cd-price">$' + productPrice + '</div> <a href="#" class="cd-item-remove cd-img-replace" onclick="removeFromCart(this)">Remove</a>';

    // Append the new item to the cart items list
    cartItemsList.appendChild(newItem);

    // Update the total cart price
    var totalCartPrice = parseFloat(cartTotalElement.textContent.replace('$', '')) + parseFloat(productPrice);
    cartTotalElement.textContent = '$' + totalCartPrice.toFixed(2); // Display with two decimal places
}


function removeFromCart(removeLink) {
    var itemElement = removeLink.parentNode;
    var itemId = itemElement.dataset.itemId;

    fetch('/remove_from_cart/' + itemId + '/', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            itemElement.remove();
        } else {
            console.error('Error removing item from cart:', data.message);
        }
    })
    .catch(error => console.error('Error removing item from cart:', error));
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}