document.getElementById("send-btn").addEventListener("click", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value.trim();

    // ✅ VALIDATION
    if (!name || !email || !phone || !subject || !type || !message) {
        alert("Please fill all fields");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Phone must be 10 digits");
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter valid email");
        return;
    }

    try {
        const res = await fetch("https://zaheer-portfolio-3.onrender.com/api/zaheer/upload/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                subject,
                type,
                message
            })
        });

        const data = await res.json();

        if (res.ok) {
            console.log(data);
            alert("Successfully sent ✅");

            // clear form
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("type").value = "";
            document.getElementById("message").value = "";

        } else {
            alert("Error: " + data.message);
        }

    } catch (err) {
        console.log(err);
        alert("Server error ❌");
    }

});

