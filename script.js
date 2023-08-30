//      CREATE FETCH FUNCTION + RETURNS RESPONSE IN JSON
const fetchCountry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await response.json();
    displayCountries(jsonData);
}

document.querySelector("#country-button").addEventListener("click", fetchCountry);

//      SETUP FUNTION TO LOAD WEBPAGE
const allCountries = [];

const loadCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await response.json();

    jsonData.forEach(country => allCountries.push(country));
}

//      DISPLAY COUNTRIES
function displayCountries(countries) {
    const countriesList = document.querySelector("#countriesList");

    countriesList.innerHTML = '';

    countries.forEach(country => {
        const li = document.createElement("li");

        const countryName = document.createElement("div");
        countryName.textContent = country.name.common;
        countryName.style.fontWeight = "bold";
        countryName.style.fontSize = "1.5em"

        const population = document.createElement("div");
        population.textContent = `Population: ${country.population}`;
        
        li.appendChild(countryName);
        li.appendChild(population);

        countriesList.appendChild(li);
    });
}


//      SUBMIT FORM
function submitForm(event) {
    event.preventDefault();
    const inputValue = document.querySelectorAll("#country-input").value;
    console.log(inputValue);

//      FILTER COUNTRIES
    const filteredCountries = allCountries.filter(country => {
        return country.name.common.toLowerCase().includes(inputValue);
    });

    displayCountries(filteredCountries);

}

document.querySelector("#country-form").addEventListener("submit", submitForm);

function setUp() {
    loadCountries()
    .then(() => {
        displayCountries(allCountries);
    });
}

document.addEventListener('DOMContentLoaded', setUp);