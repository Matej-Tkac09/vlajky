let container = document.getElementById("countries");
let countriesData = [];
let search = document.getElementById("search");
let darkModeBtn = document.querySelector(".dark-mode-btn");

async function loadCountries() {
    const url = "countries.json";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        countriesData = await response.json();
        renderCountries(countriesData);

    } catch (error) {
        console.error(error.message);
    }
}

function renderCountries(countries) {
    let html = "";

    countries.forEach(country => {
        html += `
            <div class="country-card">
                <img src="${country.flags.png}" alt="Vlajka">
                <div class="card-text">
                    <h2>${country.name.common}</h2>

                    <p><i class="fa-solid fa-map"></i> <strong>Region:</strong> ${country.region}</p>
                    <p><i class="fa-solid fa-city"></i> <strong>Hlavní město:</strong> ${country.capital}</p>
                    <p><i class="fa-solid fa-chart-area"></i> <strong>Rozloha:</strong> ${country.area} km²</p>
                    <p><i class="fa-solid fa-users"></i> <strong>Počet obyvatel:</strong> ${country.population}</p>
                    <p><i class="fa-solid fa-money-bill-wave"></i> <strong>Měna:</strong> ${Object.keys(country.currencies || {}).join(", ")}</p>
                    <p><i class="fa-solid fa-language"></i> <strong>Jazyk:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
                    <p><i class="fa-solid fa-clock"></i> <strong>Časová pásma:</strong> ${country.timezones}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    document.getElementById("country-count").textContent =
        `Počet zemí: ${countries.length}`;
}

search.addEventListener("input", () => {
    const text = search.value.toLowerCase();

    const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(text)
    );

    renderCountries(filteredCountries);
});



loadCountries();