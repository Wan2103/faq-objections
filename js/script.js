function renderContent(data) {

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

function bindAccordions() {

    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(btn => {

        btn.addEventListener("click", () => {

            const panel = btn.nextElementSibling;

            document.querySelectorAll(".panel").forEach(item => {

                if (item !== panel) {
                    item.classList.remove("show");
                }

            });

            panel.classList.toggle("show");

        });

    });

}

function bindSearch() {

    const search = document.getElementById("searchInput");

    search.addEventListener("input", () => {

        const value = search.value.toLowerCase().trim();

        document.querySelectorAll(".category").forEach(category => {

            let hasVisibleItems = false;

            const accordions = category.querySelectorAll(".accordion");

            accordions.forEach(accordion => {

                const panel = accordion.nextElementSibling;

                const question = accordion.textContent.toLowerCase();
                const answer = panel.textContent.toLowerCase();

                const match =
                    question.includes(value) ||
                    answer.includes(value);

                accordion.style.display =
                    match ? "block" : "none";

                if (!match) {
                    panel.classList.remove("show");
                }

                if (match) {
                    hasVisibleItems = true;
                }

            });

            category.style.display =
                hasVisibleItems ? "block" : "none";

        });

    });

}
