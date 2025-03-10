document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '6ea79a1ae6d6323e52ed478d4909a7a4';
  let currentLanguage = 'en';
  
  // Initial weather load for Dhaka
  fetchWeather('Dhaka');
  document.getElementById('weatherDisplay').classList.remove('d-none');

  // Translation texts for UI elements
  const translations = {
    en: {
      divisionTitle: "Select a Division (BD)",
      districtTitle: "Select a District",
      currentWeather: "Current Weather",
      forecast: "3 Hours Forecast",
      searchPlaceholder: "Search location",
      brand: "Weather Forecast",
      languageToggle: "🇧🇩 বাংলা",
      feelsLike: "Feels like",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      description: "Description"
    },
    bn: {
      divisionTitle: "বিভাগ নির্বাচন করুন (বাংলাদেশ)",
      districtTitle: "জেলা নির্বাচন করুন",
      currentWeather: "বর্তমান আবহাওয়া",
      forecast: "৩ ঘণ্টার পূর্বাভাস",
      searchPlaceholder: "স্থান অনুসন্ধান করুন",
      brand: "আবহাওয়ার পূর্বাভাস",
      languageToggle: "🇺🇸 English",
      feelsLike: "অনুভূত",
      humidity: "আর্দ্রতা",
      windSpeed: "বাতাসের গতি",
      description: "বিবরণ"
    }
  };

  // District translations (English to Bangla)
  const districtTranslations = {
    "Dhaka": "ঢাকা",
    "Faridpur": "ফরিদপুর",
    "Gazipur": "গাজীপুর",
    "Gopalganj": "গোপালগঞ্জ",
    "Kishoreganj": "কিশোরগঞ্জ",
    "Madaripur": "মাদারীপুর",
    "Manikganj": "মানিকগঞ্জ",
    "Munshiganj": "মুন্সিগঞ্জ",
    "Narayanganj": "নারায়ণগঞ্জ",
    "Narsingdi": "নরসিংদী",
    "Rajbari": "রাজবাড়ী",
    "Shariatpur": "শরীয়তপুর",
    "Tangail": "টাঙ্গাইল",
    "Chattogram": "চট্টগ্রাম",
    "Bandarban": "বান্দরবান",
    "Cox's Bazar": "কক্সবাজার",
    "Rangamati": "রাঙ্গামাটি",
    "Khagrachari": "খাগড়াছড়ি",
    "Feni": "ফেনী",
    "Noakhali": "নোয়াখালী",
    "Lakshmipur": "লক্ষ্মীপুর",
    "Brahmanbaria": "ব্রাহ্মণবাড়িয়া",
    "Chandpur": "চাঁদপুর",
    "Comilla": "কুমিল্লা",
    "Khulna": "খুলনা",
    "Bagerhat": "বাগেরহাট",
    "Chuadanga": "চুয়াডাঙ্গা",
    "Jessore": "যশোর",
    "Jhinaidah": "ঝিনাইদহ",
    "Kushtia": "কুষ্টিয়া",
    "Magura": "মাগুরা",
    "Meherpur": "মেহেরপুর",
    "Narail": "নড়াইল",
    "Satkhira": "সাতক্ষীরা",
    "Rajshahi": "রাজশাহী",
    "Bogra": "বগুড়া",
    "Chapainawabganj": "চাঁপাইনবাবগঞ্জ",
    "Joypurhat": "জয়পুরহাট",
    "Naogaon": "নওগাঁ",
    "Natore": "নাটোর",
    "Pabna": "পাবনা",
    "Sirajganj": "সিরাজগঞ্জ",
    "Sylhet": "সিলেট",
    "Moulvibazar": "মৌলভীবাজার",
    "Habiganj": "হবিগঞ্জ",
    "Sunamganj": "সুনামগঞ্জ",
    "Barisal": "বরিশাল",
    "Bhola": "ভোলা",
    "Jhalokati": "ঝালকাঠি",
    "Patuakhali": "পটুয়াখালী",
    "Pirojpur": "পিরোজপুর",
    "Barguna": "বরগুনা",
    "Rangpur": "রংপুর",
    "Dinajpur": "দিনাজপুর",
    "Kurigram": "কুড়িগ্রাম",
    "Gaibandha": "গাইবান্ধা",
    "Lalmonirhat": "লালমনিরহাট",
    "Nilphamari": "নীলফামারী",
    "Panchagarh": "পঞ্চগড়",
    "Thakurgaon": "ঠাকুরগাঁও",
    "Mymensingh": "ময়মনসিংহ",
    "Jamalpur": "জামালপুর",
    "Sherpur": "শেরপুর",
    "Netrokona": "নেত্রকোণা"
  };

  // Weather condition translations
  const weatherTranslations = {
    en: {
      'clear sky': 'Clear sky',
      'few clouds': 'Few clouds',
      'scattered clouds': 'Scattered clouds',
      'broken clouds': 'Broken clouds',
      'overcast clouds': 'Overcast clouds',
      'light rain': 'Light rain',
      'moderate rain': 'Moderate rain',
      'heavy intensity rain': 'Heavy rain',
      'thunderstorm': 'Thunderstorm',
      'mist': 'Mist',
      'haze': 'Haze',
      'fog': 'Fog'
    },
    bn: {
      'clear sky': 'পরিষ্কার আকাশ',
      'few clouds': 'কিছু মেঘ',
      'scattered clouds': 'বিক্ষিপ্ত মেঘ',
      'broken clouds': 'ভাঙ্গা মেঘ',
      'overcast clouds': 'ঘন মেঘ',
      'light rain': 'হালকা বৃষ্টি',
      'moderate rain': 'মাঝারি বৃষ্টি',
      'heavy intensity rain': 'তীব্র বৃষ্টি',
      'thunderstorm': 'বজ্রবৃষ্টি',
      'mist': 'কুয়াশা',
      'haze': 'ধোঁয়াশা',
      'fog': 'কুয়াশা'
    }
  };

  // Function to update division button texts
  function updateDivisionButtons() {
    const divisionButtons = document.querySelectorAll('.division-btn');
    divisionButtons.forEach(button => {
      button.textContent = button.getAttribute(`data-${currentLanguage}`);
    });
  }

  // Update UI texts based on current language
  function updateLanguage() {
    document.getElementById('divisionTitle').textContent = translations[currentLanguage].divisionTitle;
    document.getElementById('districtTitle').textContent = translations[currentLanguage].districtTitle;
    document.getElementById('currentWeatherHeading').textContent = translations[currentLanguage].currentWeather;
    document.getElementById('forecastHeading').textContent = translations[currentLanguage].forecast;
    document.getElementById('searchInput').placeholder = translations[currentLanguage].searchPlaceholder;
    document.getElementById('navbarBrand').textContent = translations[currentLanguage].brand;
    document.getElementById('languageToggle').textContent = translations[currentLanguage].languageToggle;
    
    // Update the division buttons
    updateDivisionButtons();
  }
  updateLanguage();

  // Dark Mode Toggle
  const modeToggle = document.getElementById('modeToggle');
  modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = modeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });

  // Language Toggle
  const languageToggle = document.getElementById('languageToggle');
  languageToggle.addEventListener('click', function() {
    currentLanguage = (currentLanguage === 'en') ? 'bn' : 'en';
    updateLanguage();
  });

  // Search Form Functionality
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
      document.getElementById('bdDistricts').classList.add('d-none');
      fetchWeather(query);
    }
  });

  // Division and District Handling
  const divisionButtons = document.querySelectorAll('.division-btn');
  const districtSection = document.getElementById('bdDistricts');
  const districtButtonsContainer = document.getElementById('districtButtons');

  // Mapping of districts for each division (using English keys)
  const districtsByDivision = {
    "Dhaka": ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
    "Chattogram": ["Chattogram", "Bandarban", "Cox's Bazar", "Rangamati", "Khagrachari", "Feni", "Noakhali", "Lakshmipur", "Brahmanbaria", "Chandpur", "Comilla"],
    "Khulna": ["Khulna", "Bagerhat", "Chuadanga", "Jessore", "Jhinaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
    "Rajshahi": ["Rajshahi", "Bogra", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Sirajganj"],
    "Sylhet": ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    "Barisal": ["Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Barguna"],
    "Rangpur": ["Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
    "Mymensingh": ["Mymensingh", "Jamalpur", "Sherpur", "Netrokona"]
  };

  divisionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const division = this.getAttribute('data-city');
      document.getElementById('weatherDisplay').classList.add('d-none');
      if (districtsByDivision[division]) {
        districtButtonsContainer.innerHTML = '';
        districtsByDivision[division].forEach(district => {
          const btn = document.createElement('button');
          btn.className = 'btn btn-secondary btn-block mb-2';
          btn.textContent = (currentLanguage === 'bn' ? (districtTranslations[district] || district) : district);
          btn.addEventListener('click', function() {
            fetchWeather(district);
          });
          const colDiv = document.createElement('div');
          colDiv.className = 'col-6 col-md-3';
          colDiv.appendChild(btn);
          districtButtonsContainer.appendChild(colDiv);
        });
        districtSection.classList.remove('d-none');
      } else {
        districtSection.classList.add('d-none');
        fetchWeather(division);
      }
    });
  });

  // Weather Display Section
  const weatherDisplaySection = document.getElementById('weatherDisplay');

  // Fetch weather by location name
  async function fetchWeather(location) {
    try {
      const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
      if (!currentResponse.ok) throw new Error('Current weather fetch error');
      const currentData = await currentResponse.json();
      displayCurrentWeather(currentData);

      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`);
      if (!forecastResponse.ok) throw new Error('Forecast fetch error');
      const forecastData = await forecastResponse.json();
      const forecastList = forecastData.list.slice(0, 4);
      displayForecast(forecastList);

      weatherDisplaySection.classList.remove('d-none');
    } catch (error) {
      console.error(error);
      alert("Error fetching weather data. Please check the location or API key.");
    }
  }

  // Returns a Font Awesome icon class based on weather conditions
  function getFontAwesomeIcon(weather) {
    const condition = weather.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear':
        return 'fas fa-sun';
      case 'clouds':
        return 'fas fa-cloud';
      case 'rain':
        return 'fas fa-cloud-showers-heavy';
      case 'drizzle':
        return 'fas fa-cloud-rain';
      case 'thunderstorm':
        return 'fas fa-bolt';
      case 'snow':
        return 'fas fa-snowflake';
      case 'mist':
      case 'haze':
      case 'fog':
        return 'fas fa-smog';
      default:
        return 'fas fa-sun';
    }
  }

  // Display current weather information
  function displayCurrentWeather(current) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    currentWeatherDiv.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card p-3 mb-3';

    // Location Name
    const locationEl = document.createElement('h3');
    let locationName = current.name;
    if (currentLanguage === 'bn') {
      locationName = districtTranslations[current.name] || current.name;
    }
    locationEl.textContent = locationName;
    locationEl.className = 'text-center font-weight-bold';

    // Weather Icon
    const iconContainer = document.createElement('div');
    iconContainer.className = 'weather-icon text-center';
    const iconClass = getFontAwesomeIcon(current);
    const iconElement = document.createElement('i');
    iconElement.className = iconClass + ' weather-fa-icon';
    iconElement.style.fontSize = '80px';
    iconElement.setAttribute('aria-label', current.weather[0].description);
    iconContainer.appendChild(iconElement);

    // Weather Details
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'weather-details text-center';

    const tempEl = document.createElement('p');
    tempEl.textContent = `🌡️ ${Math.round(current.main.temp)}°C`;

    const feelsLikeEl = document.createElement('p');
    feelsLikeEl.textContent = `${translations[currentLanguage].feelsLike}: ${Math.round(current.main.feels_like)}°C`;

    const humidityEl = document.createElement('p');
    humidityEl.textContent = `💧 ${translations[currentLanguage].humidity}: ${current.main.humidity}%`;

    const windEl = document.createElement('p');
    windEl.textContent = `💨 ${translations[currentLanguage].windSpeed}: ${current.wind.speed} m/s`;

    const descEl = document.createElement('p');
    descEl.textContent = `📌 ${translations[currentLanguage].description}: ${weatherTranslations[currentLanguage][current.weather[0].description.toLowerCase()] || current.weather[0].description}`;

    detailsContainer.appendChild(tempEl);
    detailsContainer.appendChild(feelsLikeEl);
    detailsContainer.appendChild(humidityEl);
    detailsContainer.appendChild(windEl);
    detailsContainer.appendChild(descEl);

    card.appendChild(locationEl);
    card.appendChild(iconContainer);
    card.appendChild(detailsContainer);
    currentWeatherDiv.appendChild(card);
  }

  // Display forecast information
  function displayForecast(forecast) {
    const forecastDiv = document.getElementById('threeHoursForecast');
    forecastDiv.innerHTML = '';

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row scrollable-row';

    forecast.forEach(entry => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-6 col-md-3';

      const card = document.createElement('div');
      card.className = 'card p-2';

      const time = new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const timeEl = document.createElement('p');
      timeEl.textContent = time;

      const forecastIconClass = getFontAwesomeIcon(entry);
      const iconElement = document.createElement('i');
      iconElement.className = forecastIconClass + ' weather-fa-icon';
      iconElement.style.fontSize = '50px';
      iconElement.setAttribute('aria-label', entry.weather[0].description);

      const tempEl = document.createElement('p');
      tempEl.textContent = `${Math.round(entry.main.temp)}°C`;

      const desc = document.createElement('p');
      desc.textContent = weatherTranslations[currentLanguage][entry.weather[0].description.toLowerCase()] || entry.weather[0].description;

      card.appendChild(timeEl);
      card.appendChild(iconElement);
      card.appendChild(tempEl);
      card.appendChild(desc);
      colDiv.appendChild(card);
      rowDiv.appendChild(colDiv);
    });

    forecastDiv.appendChild(rowDiv);
  }

  // New: Location Button Feature
  const locationButton = document.getElementById('locationButton');
  if (locationButton) {
    locationButton.addEventListener('click', function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
          },
          function(error) {
            console.error(error);
            alert("Unable to retrieve your location.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });
  }

  // Fetch weather data using geographic coordinates
  async function fetchWeatherByCoords(lat, lon) {
    try {
      const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      if (!currentResponse.ok) throw new Error('Current weather fetch error');
      const currentData = await currentResponse.json();
      displayCurrentWeather(currentData);

      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      if (!forecastResponse.ok) throw new Error('Forecast fetch error');
      const forecastData = await forecastResponse.json();
      const forecastList = forecastData.list.slice(0, 4);
      displayForecast(forecastList);

      weatherDisplaySection.classList.remove('d-none');
    } catch (error) {
      console.error(error);
      alert("Error fetching weather data for your location.");
    }
  }
});
