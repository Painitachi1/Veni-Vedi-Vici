document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const department = document.getElementById('department');
            
            let isValid = true;
            
            // Name Validation
            if (name.value.trim() === '') {
                name.classList.add('border-red-500');
                isValid = false;
            } else {
                name.classList.remove('border-red-500');
            }
            
            // Email Validation
            if (!/\S+@\S+\.\S+/.test(email.value)) {
                email.classList.add('border-red-500');
                isValid = false;
            } else {
                email.classList.remove('border-red-500');
            }
            
            // Message Validation
            if (message.value.trim() === '') {
                message.classList.add('border-red-500');
                isValid = false;
            } else {
                message.classList.remove('border-red-500');
            }
            
            if (isValid) {
                // Simulate form submission
                const formData = {
                    name: name.value,
                    email: email.value,
                    department: department.value,
                    message: message.value
                };
                
                console.log('Form submitted:', formData);
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            }
        });
    }

    // Live Chat Simulation
    const liveChatBtn = document.getElementById('live-chat-btn');
    const liveChatWindow = document.getElementById('live-chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    
    if (liveChatBtn && liveChatWindow && chatMessages && chatInput && chatSendBtn) {
        liveChatBtn.addEventListener('click', function() {
            liveChatWindow.classList.toggle('hidden');
        });

        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // User Message
                const userMessageEl = document.createElement('div');
                userMessageEl.className = 'text-right mb-2';
                userMessageEl.innerHTML = `
                    <span class="bg-blue-500 text-white px-3 py-1 rounded-lg inline-block">
                        ${message}
                    </span>
                `;
                chatMessages.appendChild(userMessageEl);

                // Simulated Bot Response
                setTimeout(() => {
                    const botMessageEl = document.createElement('div');
                    botMessageEl.className = 'text-left mb-2';
                    botMessageEl.innerHTML = `
                        <span class="bg-gray-200 px-3 py-1 rounded-lg inline-block">
                            Thank you for your message. A representative will assist you shortly.
                        </span>
                    `;
                    chatMessages.appendChild(botMessageEl);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);

                chatInput.value = '';
            }
        }
    }
});
