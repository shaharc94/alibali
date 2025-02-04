document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://script.google.com/macros/s/AKfycbx7roY5h4SxT3Ncah_bmo3k5rQIZDEM3aTbcmk1dc9gjZsCkdZR70TdFbhI9jWhHtillQ/exec";

    const loadingSpinner = document.getElementById("loading-spinner");
    const productsGrid = document.querySelector(".products-grid");

    // משיכת נתונים מגוגל שיטס
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            productsGrid.innerHTML = ""; // נקה מוצרים קיימים

            data.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.className = "product";
                productDiv.innerHTML = `
                    <a href="${product.link}" target="_blank">
                        <img src="${product.image}" alt="${product.name}">
                        <p>${product.name}</p>
                    </a>
                `;

                productDiv.querySelector("a").addEventListener("click", () => {
                    fetch(API_URL, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: product.name })
                    }).catch(error => console.error("Error reporting click:", error));
                });

                productsGrid.appendChild(productDiv);
            });

            loadingSpinner.style.display = "none";
            productsGrid.style.display = "grid";
        })
        .catch(error => console.error("Error loading products:", error));
});
