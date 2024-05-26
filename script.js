async function translateText() {
    const apiKey = document.getElementById('apiKey').value;
    const textToTranslate = document.getElementById('textToTranslate').value;
    const targetLanguage = document.getElementById('targetLanguage').value;
    const translatedTextElement = document.getElementById('translatedText');

    // Clear previous translated text
    translatedTextElement.innerText = '';

    if (!apiKey) {
        translatedTextElement.innerText = 'API Key is required';
        return;
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: textToTranslate,
                target: targetLanguage,
                format: 'text'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(`API error! message: ${data.error.message}`);
        }

        const translatedText = data.data.translations[0].translatedText;
        translatedTextElement.innerText = translatedText;

    } catch (error) {
        console.error('Error:', error);
        translatedTextElement.innerText = 'An error occurred: ' + error.message;
    }
}
