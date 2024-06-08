
# Text Translator Webpage

This is a simple webpage for translating text using the Google Cloud Translation API. You can input text, select a target language, and translate the text using your API key.

## Features

- Input text to translate
- Select target language from a dropdown menu
- Translate text using Google Cloud Translation API
- Display translated text on the webpage
- Simple and user-friendly UI

## Prerequisites

- A valid Google Cloud Translation API key

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/RomanTsisyk/text-translator-webpage.git
cd text-translator-webpage
```

### Usage

1. Open `index.html` in your web browser.

2. Enter your Google Cloud Translation API key in the provided input field.

3. Enter the text you want to translate in the "Text to Translate" textarea.

4. Select the target language from the dropdown menu.

5. Click the "Translate" button to translate the text.

### Files

- `index.html`: The main HTML file containing the structure of the webpage.
- `script.js`: The JavaScript file containing the logic for calling the Google Cloud Translation API and updating the webpage with the translated text.

### Error Handling

- If the API key is missing or incorrect, an error message will be displayed.
- If there's an issue with the API request, an error message will be displayed.

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Translator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }
        .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
        }
        h1 {
            margin-bottom: 20px;
        }
        textarea, select, input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #0056b3;
        }
        #translatedText {
            margin-top: 20px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Text Translator</h1>
        <form id="translationForm">
            <label for="apiKey">API Key:</label><br>
            <input type="text" id="apiKey" placeholder="Enter your API key"><br>
            <label for="textToTranslate">Text to Translate:</label><br>
            <textarea id="textToTranslate" rows="4" cols="50" placeholder="Enter text here..."></textarea><br>
            <label for="targetLanguage">Target Language:</label><br>
            <select id="targetLanguage">
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="zh">Chinese (Simplified)</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <!-- Add more options as needed -->
            </select><br><br>
            <button type="button" onclick="translateText()">Translate</button>
        </form>
        <h2>Translated Text:</h2>
        <p id="translatedText"></p>
        <div class="footer">
            Text Translator by Roman Tsisyk
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

```javascript
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
```

## Author

- Roman Tsisyk

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
