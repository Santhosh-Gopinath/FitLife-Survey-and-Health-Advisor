function loadPredictionResults() {
    console.log('Initializing results page');
    const requiredElements = {
        container: document.querySelector('.max-w-md'),
        predictedDisease: document.getElementById('predicted-disease'),
        symptomsContainer: document.getElementById('analyzed-symptoms'),
        symptomsDiv: document.getElementById('analyzed-symptoms-container'),
        diseaseDescription: document.getElementById('disease-description'),
        precautionsList: document.getElementById('disease-precautions'),
        medicationsList: document.getElementById('disease-medications'),
        dietsList: document.getElementById('disease-diets'),
        diseaseWorkout: document.getElementById('disease-workout')
    };
    const missingElements = Object.entries(requiredElements).filter(([k, v]) => !v).map(([k]) => k);
    if (missingElements.length > 0) {
        console.error('Missing elements:', missingElements);
        document.querySelector('.main-content').innerHTML = `
            <div class="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">Error</h1>
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            Missing elements: ${missingElements.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    const { container, predictedDisease, symptomsContainer, symptomsDiv, diseaseDescription, precautionsList, medicationsList, dietsList, diseaseWorkout } = requiredElements;
    const predictionData = JSON.parse(localStorage.getItem('latestPrediction') || '{}');
    if (!predictionData.predictedDisease) {
        container.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                No prediction data available. Please take the survey first.
            </div>
        `;
        return;
    }
    predictedDisease.textContent = predictionData.predictedDisease;
    if (predictionData.symptoms && predictionData.symptoms.length > 0) {
        symptomsDiv.classList.remove('hidden');
        symptomsContainer.innerHTML = predictionData.symptoms.map(symptom => `
            <span class="symptom-tag bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                ${symptom.replace(/_/g, ' ')}
            </span>
        `).join('');
    } else {
        symptomsDiv.classList.add('hidden');
    }
    diseaseDescription.textContent = predictionData.description;
    precautionsList.innerHTML = predictionData.precautions.map(p => `<li>${p}</li>`).join('');
    medicationsList.innerHTML = predictionData.medications.map(m => `<li>${m}</li>`).join('');
    dietsList.innerHTML = predictionData.diet.map(d => `<li>${d}</li>`).join('');
    diseaseWorkout.textContent = predictionData.workout;
}

function loadPredictionHistory() {
    console.log('Initializing history page');
    const historyList = document.getElementById('history-list');
    if (!historyList) {
        console.error('History list not found');
        document.querySelector('.main-content').innerHTML = `
            <div class="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">Error</h1>
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            Failed to load history.
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
    if (history.length === 0) {
        historyList.innerHTML = `<div class="text-center text-gray-600">No prediction history available.</div>`;
        return;
    }
    historyList.innerHTML = history.map((prediction, index) => `
        <div class="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-lg font-medium text-gray-900">${prediction.predictedDisease}</h3>
                <span class="text-sm text-gray-500">${new Date(prediction.timestamp).toLocaleString()}</span>
            </div>
            <p class="text-sm text-gray-600 mb-2"><strong>Symptoms:</strong> ${prediction.symptoms.join(', ')}</p>
            <p class="text-sm text-gray-600"><strong>Description:</strong> ${prediction.description}</p>
        </div>
    `).join('');
}

window.loadPredictionResults = loadPredictionResults;
window.loadPredictionHistory = loadPredictionHistory;
console.log('script3.js loaded');