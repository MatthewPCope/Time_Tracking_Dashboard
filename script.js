// Get references to the buttons and time elements
const yesterday = document.querySelector("#daily");
const week = document.querySelector('#weekly');
const month = document.querySelector('#monthly');

const current = document.querySelectorAll(".current-time");
const prev = document.querySelectorAll(".prev");
const prevTime = document.querySelectorAll(".prev-time");

// Function to fetch data from the JSON file
const fetchData = async () => {
    try {
        const response = await fetch('data.json');
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
            prev[index].innerText = timeframe === 'daily' ? 'Yesterday -' : `Last ${mapTimeframeLabel(timeframe)} -`; // Conditional to remove "Last" for yesterday
            prevTime[index].innerText = `${item.timeframes[timeframe].previous}hrs`;
        });

        // Update the active button's color
        yesterday.style.color = timeframe === 'daily' ? "white" : "hsl(236, 100%, 87%)";
        week.style.color = timeframe === 'weekly' ? "white" : "hsl(236, 100%, 87%)";
        month.style.color = timeframe === 'monthly' ? "white" : "hsl(236, 100%, 87%)";
    }
};
const mapTimeframeLabel = (timeframe) => {
    switch (timeframe) {
        case 'daily':
            return 'Yesterday';
        case 'weekly':
            return 'Week';
        case 'monthly':
            return 'Month';
        default:
            return capitalize(timeframe);
    }
};
// Helper function to capitalize the first letter of the timeframe
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);



// Set the default view to daily
updateDisplay('daily');

// Add event listeners to the buttons
yesterday.addEventListener("click", () => updateDisplay('daily'));
week.addEventListener("click", () => updateDisplay('weekly'));
month.addEventListener("click", () => updateDisplay('monthly'));