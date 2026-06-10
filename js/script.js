function renderContent(data){

    const container = document.getElementById("content");

    Object.keys(data).forEach(category => {

        let html = `
            <div class="category">
                <div class="category-title">${category}</div>
        `;

        data[category].forEach(item => {

            html += `
                <button class="accordion">
                    ${item.question}
                </button>

                <div class="panel">
                    <p>${item.answer}</p>
                </div>
            `;
        });

        html += `</div>`;

        container.innerHTML += html;
    });

    bindAccordions();
    bindSearch();
}

function bindAccordions(){

    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(btn => {

        btn.addEventListener("click", () => {

            document.querySelectorAll(".panel").forEach(panel => {
                if(panel !== btn.nextElementSibling){
                    panel.classList.remove("show");
                }
            });

            btn.nextElementSibling.classList.toggle("show");
        });

    });
}

function bindSearch(){

    const search = document.getElementById("searchInput");

    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        document.querySelectorAll(".accordion").forEach(item => {

            const text = item.textContent.toLowerCase();

            item.style.display =
                text.includes(value)
                ? "block"
                : "none";

        });

    });
}
