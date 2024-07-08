document.addEventListener('DOMContentLoaded', function () {
    const days = document.querySelectorAll('.day');
    const currentDate = new Date();
    const correctPassword = "3110";  

    document.getElementById('submit-password').addEventListener('click', function () {
        const enteredPassword = 
            document.getElementById('digit1').value +
            document.getElementById('digit2').value +
            document.getElementById('digit3').value +
            document.getElementById('digit4').value;
            
        if (enteredPassword === correctPassword) {
            document.querySelector('.container').style.display = 'block';
            document.querySelector('.password-container').style.display = 'none';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mot de passe incorrect',
                text: 'Tu te fou la.',
            });

            document.getElementById('digit1').value = '';
            document.getElementById('digit2').value = '';
            document.getElementById('digit3').value = '';
            document.getElementById('digit4').value = '';

            document.getElementById('digit1').focus();
        }
    });

    const digits = document.querySelectorAll('.password-container input[type="password"]');
    digits.forEach((digit, index) => {
        digit.addEventListener('input', () => {
            if (digit.value.length === digit.maxLength) {
                if (index < digits.length - 1) {
                    digits[index + 1].focus();
                }
            }
        });
    });

    days.forEach(day => {
        const dayDate = new Date(day.dataset.date);
        const image = day.dataset.image;
        let message = day.dataset.message;
        const width = day.dataset.width;
        const height = day.dataset.height;

        message = message.replace(/\n/g, '<br>');

        day.addEventListener('click', () => {
            day.classList.add('no-transition');

            if (currentDate < dayDate) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Trop tôt!',
                    text: `Vous devez attendre jusqu'au ${dayDate.toLocaleString()} pour ouvrir cette case.`,
                });
            } else {
                Swal.fire({
                    title: `Jour ${day.textContent}`,
                    html: message,
                    imageUrl: image,
                    imageWidth: width,
                    imageHeight: height,
                    imageAlt: 'Image du jour',
                });
            }

            setTimeout(() => {
                day.classList.remove('no-transition'); 
            }, 100);
        });
    });
});
