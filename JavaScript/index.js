
          
            let cart = [];
            let totalPrice = 0;
            const applyButton = document.getElementById('apply-button');
            const makePurchaseButton = document.getElementById('make-purchase');
            const couponCodeInput = document.getElementById('coupon-code');
            const cartCount = document.getElementById('cart-count');
            const addName = document.getElementById('add-name');
            const totalPriceElement = document.getElementById('total-price');
            const discountPriceElement = document.getElementById('discount-price');
            const inTotalPriceElement = document.getElementById('intotal-price');
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            const goHomeButton = document.getElementById('go-home');

       
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    const productName = document.getElementById(`card-name${productId}`).textContent;
                    const productPrice = parseFloat(document.getElementById(`card-money${productId}`).textContent);
                    
              
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice
                    });
                    
               
                    totalPrice += productPrice;
                    updateCart();
                    
               
                    this.textContent = 'Added!';
                    this.classList.remove('btn-outline-danger');
                    this.classList.add('btn-success');
                    
                    setTimeout(() => {
                        this.textContent = 'Add to Cart';
                        this.classList.remove('btn-success');
                        this.classList.add('btn-outline-danger');
                    }, 1000);
                });
            });

        
            function updateCart() {
             
                cartCount.textContent = cart.length;
                
        
                addName.textContent = `Your Cart (${cart.length} ${cart.length === 1 ? 'item' : 'items'})`;
                totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
                
           
                if (totalPrice >= 200) {
                    applyButton.disabled = false;
                    inTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
                } else {
                    applyButton.disabled = true;
                    couponCodeInput.value = '';
                    discountPriceElement.textContent = '-$0.00';
                    inTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
                }
                
 
                makePurchaseButton.disabled = cart.length === 0;
            }

 
            applyButton.addEventListener('click', function() {
                if (couponCodeInput.value.trim().toUpperCase() === 'SELL200' && totalPrice >= 200) {
                    const discount = totalPrice * 0.2;
                    const finalPrice = totalPrice - discount;
                    
                    discountPriceElement.textContent = `-$${discount.toFixed(2)}`;
                    inTotalPriceElement.textContent = `$${finalPrice.toFixed(2)}`;
                    
             
                    couponCodeInput.classList.add('is-valid');
                    setTimeout(() => {
                        couponCodeInput.classList.remove('is-valid');
                    }, 2000);
                } else {
                    discountPriceElement.textContent = '-$0.00';
                    inTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
                    
                 
                    couponCodeInput.classList.add('is-invalid');
                    setTimeout(() => {
                        couponCodeInput.classList.remove('is-invalid');
                    }, 2000);
                }
            });


            makePurchaseButton.addEventListener('click', function() {
                successModal.show();
            });

       
            goHomeButton.addEventListener('click', function() {
              
                cart = [];
                totalPrice = 0;
                updateCart();
                couponCodeInput.value = '';
                discountPriceElement.textContent = '-$0.00';
                successModal.hide();
            });

    
            couponCodeInput.addEventListener('input', function() {
                if (this.value.trim().toUpperCase() === 'SELL200') {
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                }
            });

