const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

searchButton.addEventListener("click", searchNationality);

async function searchNationality() {
  try {
    resultsContainer.innerHTML = "";

    const name = searchInput.value.trim();

    if (name === "") {
      throw new Error("Please enter a name");
    }
    const response = await fetch(`https://api.nationalize.io?name=${name}`);
    const data = await response.json();
    if (data.country && data.country.length > 0) {
      displayResults(data.country);
    } else {
      displayErrorMessage("No results found");
    }
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

function displayResults(countries) {
  const topTwoCountries = countries.slice(0, 2);
  const resultsList = document.createElement("ul");
  topTwoCountries.forEach((country) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${country.country_id}    (${(
      country.probability * 100
    ).toFixed(2)}%)`;
    resultsList.appendChild(listItem);
  });
  resultsContainer.innerHTML = "";
  resultsContainer.appendChild(resultsList);
}

function displayErrorMessage(message) {
  resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}
