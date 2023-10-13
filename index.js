function fillFramesWithPictures() {
    fetch('https://fakestoreapi.com/products') // Replace with the actual API endpoint
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of product objects

            // Select the frame sets
            const frameSets = document.querySelectorAll('.frame-set');

            // Loop through each frame set and fill with pictures
            frameSets.forEach((frameSet, index) => {
                const frames = frameSet.querySelectorAll('.frame');
                data.slice(index * frames.length, (index + 1) * frames.length).forEach((product, i) => {
                    const frame = frames[i];
                    
                    // Create an img element
                    const img = document.createElement('img');
                    img.src = product.image;
                    img.alt = product.title;

                    // Create a p element
                    const p = document.createElement('p');
                    p.textContent = product.title;

                    // Append the img and p elements to the frame
                    frame.innerHTML = ''; // Clear any existing content
                    frame.appendChild(img);
                    frame.appendChild(p);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data from the API:', error);
        });
}

// Call the function to fill frames with pictures
fillFramesWithPictures();







const frameSets = document.querySelectorAll('.frame-set');
const sideMenu = document.getElementById('shoppingCart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let cartData = [];
let total = 0.00;

frameSets.forEach((frameSet, index) => {
    const frames = frameSet.querySelectorAll('.frame');
    frames.forEach((frame, i) => {
        const addToCartButton = frame.querySelector('.add-to-cart-button');
        const productTitle = frame.querySelector('p').textContent;
        
        addToCartButton.addEventListener('click', () => {
            const item = {
                name: productTitle,
                price: 10.00, // Set the price as needed
            };
            
            cartData.push(item);
            total += item.price;
            updateCartDisplay();
        });
    });
});

function updateCartDisplay() {
    cartItems.innerHTML = '';
    cartData.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name}: $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

document.querySelector('.open-cart').addEventListener('click', () => {
    sideMenu.classList.add('open');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    sideMenu.classList.remove('open');
});





// Get references to product frames and the sidebar
const productFrames = document.querySelectorAll('.frame');
const sidebar = document.querySelector('.sidebar');

// Add click event listeners to each product frame
productFrames.forEach((frame, index) => {
    frame.addEventListener('click', () => {
        // Toggle the sidebar's visibility
        if (sidebar.style.width === '13rem') {
            sidebar.style.width = '5rem';
        } else {
            sidebar.style.width = '13rem';
        }
    });
});
