export function validatePassword(event) {
    event.preventDefault();
    const form = event.target;
    const username = "admin123";
    const password = "sutma"
    
    if (form.username.value === username && form.password.value === password) {
        window.location.href = "/admin.html"
        form.reset();
    } else   {
        console.log("Incorrect password");
        form.reset();
    }
}