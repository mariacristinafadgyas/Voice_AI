# Voice AI Chatbot
This project is a voice-enabled AI chatbot that allows users to ask questions either by typing or speaking. The chatbot processes the input, fetches a humorous response from an AI model, and then reads the answer aloud.

## Features
- **Text and Voice Input**: Users can either type a question or ask it verbally.
- **Humorous Responses**: The chatbot provides short, funny answers using an AI model.
- **Interactive Voice Feedback**: The response is read aloud with animated visual effects.
- **Dynamic UI**: The app features engaging UI elements such as animated bubbles and a colorful "Listening..." message.

## Prerequisites

### Clone the Repository:
```
git clone https://github.com/mariacristinafadgyas/Voice_AI
```
```
cd Voice_AI
```
### Install Dependencies:
```
pip install -r requirements.txt
```
### Set Up the API Key:
- Create a `.env` file in the root directory of the project.
- Add your RapidAPI key to the `.env` file
```
key=your_rapidapi_key_here
```
### Run the Application:
```
python3 app.py
```
The application will be available at http://localhost:5001.

## Technologies Used
- **Flask**: Web framework used for creating the server and handling requests.
- **gTTS**: Google Text-to-Speech for converting text responses to audio.
- **SpeechRecognition**: Library used for capturing and converting spoken language to text.
- **PyAudio**: Library used for capturing microphone input.
- **RapidAPI**: Platform used to access the AI model for generating responses.

## How It Works
### 1. Text Input Mode:
- Users type their question in the input field.
- The chatbot sends the text to the AI model via `RapidAPI` and returns a *humorous* response.

### 2. Voice Input Mode:

- Users select the *"Voice"* option and click the button to start speaking.
- The app captures the user's speech, converts it to text, and sends it to the AI model.
- The response is then read aloud.

#### 2.1 Voice Recognition
For speech recognition, this project uses the `SpeechRecognition` library in conjunction with `PyAudio` for capturing audio input. If you're having trouble installing `PyAudio`, refer to the [PyAudio installation guide](https://pypi.org/project/PyAudio/) for detailed instructions based on your operating system.

### 3. Response Delivery:

- The AI model returns a short, funny answer which is converted to speech using the `gTTS` library.
- The response is played back to the user with an accompanying animated bubble effect.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.



