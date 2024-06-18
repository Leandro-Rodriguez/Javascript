let url = 'https://jsonplaceholder.typicode.com/users';
fetch(url)
    .then(response => response.json())
    .then(data => mostrarInfo(data))
    .catch(error => console.log(error));

const mostrarInfo = (data) => {
    console.log(data);
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `
            <div class="card">
                <h2>${data[i].name}</h2>
                <p><strong>ID:</strong> ${data[i].id}</p>
                <p><strong>Username:</strong> ${data[i].username}</p>
            </div>
        `;
    }
    document.getElementById('data').innerHTML = body;
}