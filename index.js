function fillFramesWithPictures() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of product objects

            // Select the frame sets
            const frameSets = document.querySelectorAll('.frame-set');

            // Loop through each frame set and fill with product data
            frameSets.forEach((frameSet, index) => {
                const frames = frameSet.querySelectorAll('.frame');
                data.slice(index * frames.length, (index + 1) * frames.length).forEach((product, i) => {
                    const frame = frames[i];

                    // Create an img element
                    const img = document.createElement('img');
                    img.src = product.image;
                    img.alt = product.title;

                    // Create a p element for title
                    const title = document.createElement('p');
                    title.textContent = 'Title: ' + product.title;

                    // Create a p element for description
                    const description = document.createElement('p');
                    description.textContent = 'Description: ' + product.description;

                    // Create a p element for price
                    const price = document.createElement('p');
                    price.textContent = 'Price: $' + product.price;

                    // Create a p element for rating
                    const rating = document.createElement('p');
                    rating.textContent = 'Rating: ' + product.rating.rate + ' (Rated by ' + product.rating.count + ' users)';

                    // Append the elements to the frame
                    frame.innerHTML = ''; // Clear any existing content
                    frame.appendChild(img);
                    frame.appendChild(title);
                    frame.appendChild(description);
                    frame.appendChild(price);
                    frame.appendChild(rating);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data from the API:', error);
        });
}

// Call the function to fill frames with product data
fillFramesWithPictures();


function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Get references to the product frames and the sidebar element
const productFrames = document.querySelectorAll('.frame');
const sidebar = document.querySelector('.sidebar');
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');

// Cart data
let cartData = [];
let total = 0.00;

// Function to update the cart display
function updateCartDisplay() {
    cartItems.innerHTML = ''; // Clear the current cart items
    cartData.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            ${item.title}: $${item.price.toFixed(2)}
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to add a product to the cart
function addProductToCart(product) {
    cartData.push(product);
    total += product.price;
    updateCartDisplay();
}

// Add click event listeners to each product frame
productFrames.forEach(frame => {
    frame.addEventListener('click', () => {
        // Get the product data from the frame
        const title = frame.querySelector('p').textContent;
        const price = parseFloat(frame.getAttribute('data-price'));
        const image = frame.querySelector('img').src;

        // Create a product object
        const product = { title, price, image };

        // Add the product to the cart
        addProductToCart(product);

        // Open the sidebar
        sidebar.style.width = '250px';
    });
});

function toggleSidebar() {
    sidebar.classList.toggle('open');
}


function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar-button');

    sidebar.classList.toggle('open');

    // Check if the sidebar is open and the button says "Stäng" (close)
    if (sidebar.classList.contains('open')) {
        toggleButton.textContent = 'Stäng'; // Change the button text to "Stäng"
    } else {
        toggleButton.textContent = 'Varukorg'; // Change the button text back to "Varukorg"
    }
}



function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear the cart items
    cartItems.innerHTML = '';

    // Iterate through the cart data and create a list item for each item
    cartData.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        const itemTitle = document.createElement('span');
        itemTitle.classList.add('item-title');
        itemTitle.textContent = item.title;

        const itemPrice = document.createElement('span');
        itemPrice.classList.add('item-price');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeItemFromCart(index);
        });

        cartItem.appendChild(itemTitle);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
    });

    // Update the cart total
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

removeButton.addEventListener('click', () => {
    const itemId = item.id;
    removeItemFromCart(itemId);
});

function removeItemFromCart(itemId) {
    const itemIndex = cartData.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
        total -= cartData[itemIndex].price;
        cartData.splice(itemIndex, 1);
        updateCartDisplay();
    }
}

// Function to remove an item from the cart
function removeItemFromCart(index) {
    if (index >= 0 && index < cartData.length) {
        const removedItem = cartData.splice(index, 1)[0]; // Remove the item from the cartData array
        total -= removedItem.price; // Update the total
        updateCartDisplay(); // Update the cart display
    }
}

// Add a click event listener to each cart item for removal
const cartItemsList = document.querySelectorAll('.cart-item');
cartItemsList.forEach((cartItem, index) => {
    const removeButton = cartItem.querySelector('.remove-button');
    removeButton.addEventListener('click', () => {
        removeItemFromCart(index);
    });
});

// Function to update the cart display with images
function updateCartDisplayWithImages() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cartData.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.title;
        itemImage.classList.add('cart-item-image');

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('cart-item-info');

        const itemTitle = document.createElement('span');
        itemTitle.classList.add('item-title');
        itemTitle.textContent = item.title;

        const itemPrice = document.createElement('span');
        itemPrice.classList.add('item-price');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeItemFromCart(index);
        });

        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemPrice);

        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Replace the previous updateCartDisplay function with updateCartDisplayWithImages
function updateCartDisplay() {
    updateCartDisplayWithImages();
}

// JavaScript code remains the same as in the previous response

// Function to close the sidebar
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
}

// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar-button');

    sidebar.classList.toggle('open');

    // Check if the sidebar is open and set the button text accordingly
    if (sidebar.classList.contains('open')) {
        toggleButton.textContent = 'Stäng'; // Change the button text to "Stäng"
    } else {
        toggleButton.textContent = 'Varukorg'; // Change the button text back to "Varukorg"
    }
}

// Function to show product details in a popup
function showProductDetails(product) {
    // Create a popup element
    const popup = document.createElement('div');
    popup.classList.add('product-popup');

    // Create elements for product details
    const title = document.createElement('h2');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = 'Price: $' + product.price;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => {
        popup.remove();
    });

    // Append elements to the popup
    popup.appendChild(title);
    popup.appendChild(description);
    popup.appendChild(price);
    popup.appendChild(closeBtn);

    // Append the popup to the body
    document.body.appendChild(popup);
}

// Function to add a product to the cart
function addProductToCart(product) {
    cartData.push(product);
    total += product.price;

    // Call the updateCartDisplay function here to update the cart display
    updateCartDisplay();
}


// Add click event listener to the product frame's title
const titleElement = frame.querySelector('p');
titleElement.addEventListener('click', () => {
    const title = titleElement.textContent;
    const price = parseFloat(frame.getAttribute('data-price'));
    const image = frame.querySelector('img').src;

    const product = { title, price, image };

    addProductToCart(product);
});

// Add click event listener to the product frame's image
const imageElement = frame.querySelector('img');
imageElement.addEventListener('click', () => {
    // Assuming you have a "data" element for the product details in your API data
    const productDetails = data[index];
    showProductDetails(productDetails);
});




// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Function to fetch products from the API
async function fetchProducts() {
    // ... (Fetch products from API)
}

// Function to add a product to the shopping cart
function addProductToCart(product) {
    // ... (Add product to cart)
}

// Initialize the page
async function init() {
    // ... (Initialize the page)
}

// ... (Other JavaScript functions)

// Call the init function when the page loads
init();
