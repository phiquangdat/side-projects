$(document).ready(function(){
    let balance = 0;
    let income = 0;
    let expense = 0;
    let type;
    $("#addTransaction").click(function(){
        let description = $("#description").val();
        let sum = Number($("#sum").val());
        balance += (sum);
        if(sum < 0){
            expense += (sum * -1);
        }
        else{
            income += (sum);
        }
        $("#balance").html(balance);
        $("#transaction-list").append(`
            <li class="${type}">
                <p>${description}</p>
                <p>${sum}</p>
                <button class="delete">Poista</button>
            </li>
        `);
        myChart.data.datasets[0].data[0] = income;
        myChart.data.datasets[0].data[1] = expense;
        myChart.update();
        $("#description").val("");
        $("#sum").val("");

        $(".delete").click(function() {
            $(this).closest("li").remove();
        });
    });
    const ctx = document.getElementById('myChart');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expenditure'],
        datasets: [{
          label: 'Euro',
          data: [0, 0],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
});

