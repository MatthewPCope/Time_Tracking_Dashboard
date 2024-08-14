// Get references to the buttons and time elements
const daily = document.querySelector("#daily");
const weekly = document.querySelector('#weekly');
const monthly = document.querySelector('#monthly');

const current = document.querySelectorAll(".current-time");
const prev = document.querySelectorAll(".prev");
const prevTime = document.querySelectorAll(".prev-time");

// Function to fetch data from the JSON file
const fetchData = async () => {
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Function to update the display based on the selected timeframe
const updateDisplay = async (timeframe) => {
    const data = await fetchData();
    if (data) {
        data.forEach((item, index) => {
            current[index].innerText = `${item.timeframes[timeframe].current}hrs`;
            prev[index].innerText = `Last ${capitalize(timeframe)}`;
            prevTime[index].innerText = `${item.timeframes[timeframe].previous}hrs`;
        });

        // Update the active button's color
        daily.style.color = timeframe === 'daily' ? "white" : "hsl(236, 100%, 87%)";
        weekly.style.color = timeframe === 'weekly' ? "white" : "hsl(236, 100%, 87%)";
        monthly.style.color = timeframe === 'monthly' ? "white" : "hsl(236, 100%, 87%)";
    }
};

// Helper function to capitalize the first letter of the timeframe
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Set the default view to daily
updateDisplay('daily');

// Add event listeners to the buttons
daily.addEventListener("click", () => updateDisplay('daily'));
weekly.addEventListener("click", () => updateDisplay('weekly'));
monthly.addEventListener("click", () => updateDisplay('monthly'));