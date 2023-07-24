async function fillTable(){
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('user');
    const table = document.getElementById('ordersTable');

    fetch('http://localhost:3001/orders', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            token: token,
            userEmail: userEmail
        })
    })
        .then(function (response) {
            if (response.status === 200) {
                response
                    .json()
                    .then(data => {
                        let orders = '';
                        data.data.forEach(order => 
                            orders += ` <tr>
                                            <td>${order.Tourism}</td>
                                            <td>${order.AmountOfDays}</td>
                                            <td>${order.AmountOfTrips}</td>
                                            <td>${order.StartDay.toString().split("T")[0]}</td>
                                            <td>${order.EndDay.toString().split("T")[0]}</td>
                                            <td>${order.Goal}</td>
                                        </tr>`);
                        table.innerHTML =
                        `<tr>
                            <th>Tourism</th>
                            <th>Amount of days</th>
                            <th>Amount of trips</th>
                                <th>Start date</th>
                            <th>End date</th>
                            <th>Goal</th>
                        </tr>${orders}`;
                    });
            }
            else {
                alert(response.statusText);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

document.addEventListener("DOMContentLoaded", fillTable)