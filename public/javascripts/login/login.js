import { $ } from "../common.js"

const loginFn = () => {
        const btn = $('#LoginBtn');
        if (!btn) return;
        btn.addEventListener('click', async () => {
            const payload = {
                email: $('#login_email')?.value || '',
                password: $('#login_password')?.value || ''
            };
            try {
                const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (data.success && data.user) {
                    const container = $('#contentContainer');
                    if (container) {
                        const u = data.user;
                        container.innerHTML = `
                        <div class="row justify-content-center mt-4">
                          <div class="col-12 col-lg-8">
                            <div class="card shadow-sm border-0">
                              <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                  <div>
                                    <h4 class="mb-1">Welcome, ${u.firstname} ${u.lastname}</h4>
                                    <div class="text-secondary small">Email: ${u.email}</div>
                                    <div class="text-secondary small">Birthdate: ${u.birthdate}</div>
                                  </div>
                                </div>
                                <button id="LogoutBtn" class="btn btn-outline-danger w-100">Logout</button>
                              </div>
                            </div>
                          </div>
                        </div>`;
                        document.querySelector('#LogoutBtn')?.addEventListener('click', () => location.reload());
                    }
                    return;
                }
                alert(data.message || 'Login failed');
            } catch (err) {
                console.error(err);
                alert('Network error');
            }
        });
};

export default loginFn