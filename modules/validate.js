export function validatePassword(event) {
    event.preventDefault();
    const form = event.target;
    const username = "admin123";
    const password = "kode123"
    
    if (form.username.value === username && form.password.value === password) {
        window.location.href = "/admin.html"
        form.reset();
    } else   {
        console.log("Incorrect password = password is kode123");
        form.reset();
    }
}