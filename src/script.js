class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch('https://6d20-2001-448a-5080-3f98-3c9d-c717-4ed8-33f8.ngrok-free.app/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Sam", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = '';

            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox);
                textField.value = '';
            });
    }

    typeEffect(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = ''; // Clear any existing content
        let interval = setInterval(function () {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback(); // Call callback when typing is done
            }
        }, speed);
    }

    updateChatText(chatbox) {
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = ''; // Clear existing messages

        this.messages.slice().reverse().forEach((item, index) => {
            let messageElement = document.createElement('div');
            if (item.name === "Sam") {
                messageElement.className = 'messages__item messages__item--visitor';
                chatmessage.appendChild(messageElement);
                if (index === 0 || this.messages.length === 1) { // Only apply typing effect to the most recent message
                    this.typeEffect(messageElement, item.message, 20);
                } else {
                    messageElement.textContent = item.message; // For previous messages, display immediately
                }
            } else {
                messageElement.className = 'messages__item messages__item--operator';
                messageElement.textContent = item.message;
                chatmessage.appendChild(messageElement);
            }
        });
    }
}

const chatbox = new Chatbox();
chatbox.display();
