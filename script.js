const pressMeBtn = document.getElementById('pressMeBtn');
const openMeBtn = document.getElementById('openMeBtn');
const view1 = document.getElementById('view1');
const view2 = document.getElementById('view2');
const envelopeContainer = document.getElementById('envelopeContainer');

// -- VIEW 1: Press Me --
pressMeBtn.addEventListener('click', () => {
    // Burst confetti immediately on first interaction
    confetti({
        particleCount: 150,
        spread: 100,
        colors: ['#E05D77', '#FFB6C1', '#FFD700', '#FF69B4', '#FFF2F5']
    });

    // Fade out view 1 smoothly
    view1.classList.remove('active');

    // Fade in view 2 securely after view 1 starts fading out
    setTimeout(() => {
        view1.style.display = 'none'; // Absolutely gut it from the layout physically
        view2.classList.add('active');
    }, 800);
});

// -- VIEW 2: Open Envelope --
openMeBtn.addEventListener('click', () => {
    // Hide the 'Open Me' interaction button gracefully
    openMeBtn.classList.add('fade-out');

    // Trigger Flap smoothly with slightly staggered timing
    setTimeout(() => {
        envelopeContainer.classList.add('open');
        
        // As the letter extracts elegantly out of the folded envelope
        setTimeout(() => {
            envelopeContainer.classList.add('expand');
            
            // Send a shower of soft secondary visual noise right at the extraction point
            confetti({
                particleCount: 80,
                spread: 120,
                colors: ['#E05D77', '#C94A61', '#FFD700', '#FFB6C1', '#8B1C31'],
                zIndex: 100
            });
            
        }, 800); // Wait for flap visually unfolding 
    }, 200);
});

// -- VIEW 3: Forgiveness Integration --
const forgiveBtn = document.getElementById('forgiveBtn');
const forgiveMsg = document.getElementById('forgiveMsg');

if (forgiveBtn) {
    forgiveBtn.addEventListener('click', async () => {
        // Visual UX change
        forgiveBtn.innerText = 'Sending...';
        forgiveBtn.disabled = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '0cb471ba-3bfc-410d-8276-4de0decdd676',
                    subject: '💖 UGO FORGIVES YOU! 💖',
                    message: 'Ugo just clicked the "I Forgive You" button on your beautiful interactive apology card!',
                    from_name: 'Apology Card Web App'
                })
            });

            if (response.status === 200) {
                // Success Handling
                forgiveBtn.innerText = 'Thank You! ✨';
                forgiveMsg.innerText = 'Your forgiveness has been delivered.';
                forgiveMsg.classList.add('show');
                
                // Very warm gold and pink celebratory mini-burst
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.65 },
                    colors: ['#FFD700', '#FF69B4', '#FFF2F5', '#E05D77']
                });
            } else {
                forgiveBtn.innerText = 'Oops! Try again?';
                forgiveBtn.disabled = false;
            }
        } catch(e) {
            forgiveBtn.innerText = 'Network error! Try again.';
            forgiveBtn.disabled = false;
        }
    });
}
