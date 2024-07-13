function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
async function checkSession() {
    const sessionId = getCookie('session_id');

    if (!sessionId) {
        redirectToLogin('no_session');
        return;
    }
    try {
        const response = await fetch('/api/check-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session_id: sessionId })
        });
        const result = await response.json();
        if (result.valid) {
            console.log('Session is valid');
        } else {
            redirectToLogin('invalid_session');
        }
    } catch (error) {
        console.error('Error checking session:', error);
        redirectToLogin('error');
    }
}
function redirectToLogin(message) {
    window.location.href = `/?error=${message}`;
}
document.addEventListener('DOMContentLoaded', checkSession);