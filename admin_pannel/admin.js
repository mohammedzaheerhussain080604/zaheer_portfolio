const BASE_URL = "https://zaheer-portfolio-3.onrender.com";

// 🔹 reusable function to render table
function renderTable(data) {
    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    data.forEach((e) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.phone}</td>
            <td>${e.subject}</td>
            <td>${e.type}</td>
            <td>${e.message}</td>
            <td>${formatDate(e.date)}</td>
        `;
        tbody.appendChild(row);
    });
}

// 🔹 fetch all
const fetchall = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/admin/getall/`);
        const data = await res.json();
        renderTable(data);
    } catch (err) {
        console.log(err);
        alert("Failed to fetch data ❌");
    }
};

function formatDate(date) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    let hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm} - ${weekday}`;
}

fetchall();

// 🔍 search
document.getElementById("search-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const query = document.getElementById("search_bar").value.trim();
    const q2 = document.getElementById("type").value;

    try {
        let url = `${BASE_URL}/api/admin/search?`;

        // ✅ add params only if they exist
        const params = new URLSearchParams();

        if (query) params.append("q", query);
        if (q2 && q2 !== "All Types") {
         params.append("q2", q2);
         }

        url += params.toString();

        // 👉 if no filters → fetch all
        if (!query && !q2) {
            fetchall();
            return;
        }

        const res = await fetch(url);
        const data = await res.json();

        renderTable(data);

    } catch (err) {
        console.log(err);
        alert("Search failed ❌");
    }
});