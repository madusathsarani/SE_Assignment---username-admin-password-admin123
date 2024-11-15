let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const addBookForm = document.getElementById('addBookForm');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            if (cartModal) cartModal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (cartModal) cartModal.style.display = 'none';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'admin123') {
                window.location.href = 'admin.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(addBookForm);
            alert('Book added successfully!');
            addBookForm.reset();
        });
    }

    if (tabBtns) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.getElementById(tabId).classList.add('active');
                this.classList.add('active');
            });
        });
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Payment processed successfully!');
            cart = [];
            updateCart();
            window.location.href = 'index.html';
        });
    }

    loadBooks();
    updateCart();
});

function loadBooks() {
    const bookGrid = document.getElementById('bookGrid');
    if (!bookGrid) return;

    const sampleBooks = [
        {
            id: 1,
            title: 'Sample Book 1',
            author: 'Author 1',
            price: 29.99,
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="250" viewBox="0 0 300 250"%3E%3Crect width="300" height="250" fill="%23ddd"/%3E%3Ctext x="150" y="125" font-family="Arial" font-size="20" fill="%23666" text-anchor="middle"%3EBook Cover%3C/text%3E%3C/svg%3E'
        },
        {
            id: 2,
            title: 'Sample Book 2',
            author: 'Author 2',
            price: 34.99,
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="250" viewBox="0 0 300 250"%3E%3Crect width="300" height="250" fill="%23ddd"/%3E%3Ctext x="150" y="125" font-family="Arial" font-size="20" fill="%23666" text-anchor="middle"%3EBook Cover%3C/text%3E%3C/svg%3E'
        }
    ];

    bookGrid.innerHTML = sampleBooks.map(book => `
        <div class="book-card">
            <img src="${book.image}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="price">$${book.price}</p>
                <button class="add-to-cart" onclick="addToCart(${book.id}, '${book.title}', ${book.price})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(id, title, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const paymentCartItems = document.getElementById('payment-cart-items');
    const paymentTotal = document.getElementById('payment-total');

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <h4>${item.title}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (paymentTotal) paymentTotal.textContent = total.toFixed(2);
    
    if (paymentCartItems) {
        paymentCartItems.innerHTML = cart.map(item => `
            <div class="payment-item">
                <h4>${item.title}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `).join('');
    }
}

function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        alert('Search functionality would filter books containing: ' + searchTerm);
    }
}