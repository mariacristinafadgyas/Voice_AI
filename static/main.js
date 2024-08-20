document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('speakForm');
    const audio = document.getElementById('audio');
    const bubbleAnimation = document.getElementById('bubbleAnimation');
    const listeningMessage = document.getElementById('listeningMessage');
    const sentenceInput = document.getElementById('sentence');
    const inputModeRadios = document.querySelectorAll('input[name="inputMode"]');
    const stopButton = document.createElement('button');

    stopButton.innerText = 'Stop Listening';
    stopButton.style.display = 'none';
    stopButton.style.position = 'fixed';
    stopButton.style.top = '10px';
    stopButton.style.right = '10px';
    document.body.appendChild(stopButton);

    let listeningInterval;

    function moveListeningMessage() {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 50);
        listeningMessage.style.left = `${x}px`;
        listeningMessage.style.top = `${y}px`;
    }

    inputModeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'voice') {
                sentenceInput.removeAttribute('required');
                sentenceInput.disabled = true; // Optionally disable the input field for clarity
            } else {
                sentenceInput.setAttribute('required', true);
                sentenceInput.disabled = false;
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sentence = sentenceInput.value;
        const inputMode = document.querySelector('input[name="inputMode"]:checked').value;
        const formData = new FormData();

        if (inputMode === 'text') {
            formData.append('sentence', sentence);
            sentenceInput.value = '';
            listeningMessage.style.display = 'none'; // Hide message if text is selected
            stopButton.style.display = 'none';
            clearInterval(listeningInterval);
        } else if (inputMode === 'voice') {
            listeningMessage.style.display = 'block'; // Show message if voice is selected
            stopButton.style.display = 'block';

            listeningInterval = setInterval(moveListeningMessage, 500); // Move the listening message every 500ms

            formData.append('inputMode', 'voice'); // Indicate that this is a voice request
        }

        const response = await fetch('/speak', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            audio.src = audioUrl;

            // Start animation and play audio
            bubbleAnimation.classList.add('active');
            audio.play();

            // Stop animation and reset everything when the audio ends
            audio.onended = () => {
                bubbleAnimation.classList.remove('active');
                listeningMessage.style.display = 'none'; // Hide message after audio ends
                stopButton.style.display = 'none';
                clearInterval(listeningInterval);
            };
        } else {
            alert('Something went wrong. Please try again.');
            listeningMessage.style.display = 'none'; // Hide message in case of error
            stopButton.style.display = 'none';
            clearInterval(listeningInterval);
        }
    });

    stopButton.addEventListener('click', () => {
        listeningMessage.style.display = 'none'; // Hide message when stop is clicked
        stopButton.style.display = 'none';
        clearInterval(listeningInterval);
    });
});
