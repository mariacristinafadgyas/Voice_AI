from flask import Flask, request, send_file, render_template
from gtts import gTTS
from io import BytesIO
import requests
import os
from dotenv import load_dotenv
from transform_voice import transform_voice_to_text

load_dotenv()
key = os.getenv('key')

app = Flask(__name__)


def text_to_audio_file(text):
    tts = gTTS(text)
    audio_file = BytesIO()
    tts.write_to_fp(audio_file)
    audio_file.seek(0)
    return audio_file


def ask_question(content):
    url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2"

    question_content = f"{content}" + ('? Please answer back to me in a silly way.'
                                       ' And please be as short as possible and as'
                                       ' funny as possible')
    payload = {
        "messages": [
            {
                "role": "user",
                "content": question_content,
            }
        ],
        "system_prompt": "",
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256,
        "web_access": False
    }
    headers = {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/speak', methods=['POST'])
def speak():
    sentence = request.form.get('sentence')
    print(sentence)
    input_mode = request.form.get('inputMode')
    print(input_mode)

    if input_mode == 'voice':
        oral_sentence = transform_voice_to_text()
        answer = ask_question(oral_sentence)
        print(answer)
    else:
        if not sentence:
            return {"error": "Please provide a sentence"}, 400
        answer = ask_question(sentence)
        print(answer)

    audio_file = text_to_audio_file(answer['result'])
    return send_file(audio_file, mimetype='audio/mpeg')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
