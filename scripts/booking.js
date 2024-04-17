/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

const COST_FULL_DAY = 35;  // Example cost for a full day
const COST_HALF_DAY = 20;  // Example cost for a half day

const weekDayElements = document.querySelectorAll('.day-selector li');  // Selects all weekday list items
const fullDayButton = document.getElementById('full');
const halfDayButton = document.getElementById('half');
const calculatedCostElement = document.getElementById('calculated-cost');
const clearButton = document.getElementById('clear-button');

let selectedDays = []; 
let isFullDay = true;  
let totalCost = 0;     

document.addEventListener('DOMContentLoaded', function() {
    calculatedCostElement.innerText = totalCost.toString(); 
    fullDayButton.classList.add('clicked'); 
});

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!


weekDayElements.forEach(day => {
    day.addEventListener('click', function() {
        
        if (day.classList.contains('clicked')) {
            day.classList.remove('clicked');
            selectedDays = selectedDays.filter(selectedDay => selectedDay !== day.id);
        } else {
            day.classList.add('clicked');
            selectedDays.push(day.id);
        }
        // Recalculate the total cost
        updateCost();
    });
});





/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.


clearButton.addEventListener('click', function() {
    
    weekDayElements.forEach(day => day.classList.remove('clicked'));
    
    selectedDays = [];
    totalCost = 0;
   
    calculatedCostElement.innerHTML = '0';
});





/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.


halfDayButton.addEventListener('click', function() {
    
    isFullDay = false;
    
    halfDayButton.classList.add('clicked');
    fullDayButton.classList.remove('clicked');
   
    updateCost();
});


// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.


fullDayButton.addEventListener('click', function() {
   
    isFullDay = true;
    
    fullDayButton.classList.add('clicked');
    halfDayButton.classList.remove('clicked');
    
    updateCost();
});




/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function updateCost() {
    totalCost = selectedDays.length * (isFullDay ? COST_FULL_DAY : COST_HALF_DAY);
    calculatedCostElement.innerHTML = totalCost.toString();
}

