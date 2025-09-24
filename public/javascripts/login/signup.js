import { $ } from "../common.js";

const signupFn = () => {
    const btn = $('#SignupBtn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        const payload = {
            firstname: $('#firstname')?.value || '',
            lastname: $('#lastname')?.value || '',
            email: $('#email')?.value || '',
            birthdate: $('#birthdate')?.value || '',
            password: $('#password')?.value || '',
            repassword: $('#repassword')?.value || ''
        };

        try {
            const res = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            alert(data.message || (data.success ? 'Signup successful' : 'Signup failed'));
        } catch (err) {
            console.error(err);
            alert('Network error');
        }
    });
};

export default signupFn;

