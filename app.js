const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const productModal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalQuantity = document.getElementById('modalQuantity');
const closeModalBtn = document.getElementById('closeModalBtn');

// Fetch products from the Fake Store API
const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Display products in cards
const displayProducts = (products) => {
    productGrid.innerHTML = ''; // Clear existing content
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white p-4 rounded-lg shadow-md';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-contain mb-4">
            <h3 class="font-bold text-lg">${product.title}</h3>
            <p class="text-gray-700">$${product.price}</p>
            <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded viewProductBtn" data-id="${product.id}">View Details</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to "View Details" buttons
    document.querySelectorAll('.viewProductBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            openProductModal(productId);
        });
    });
};

// Open the modal with product details
const openProductModal = async (productId) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        modalTitle.innerText = product.title;
        modalDescription.innerText = product.description;
        modalQuantity.innerText = product.rating.count; // Assuming quantity as rating count
        productModal.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

// Close the modal
closeModalBtn.addEventListener('click', () => {
    productModal.classList.add('hidden');
});

// Search functionality
searchInput.addEventListener('input', async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    } catch (error) {
        console.error('Error searching products:', error);
    }
});

// Initialize product fetch
fetchProducts();
