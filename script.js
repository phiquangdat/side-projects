$(document).ready(function(){
    let balance = 0;
    let income = [];
    let expense = [];
    let type;
    $("#addTransaction").click(function(){
        let description = $("#description").val();
        let sum = $("#sum").val();
        balance += Number(sum);
        type = sum < 0 ? "expense" : "income";
        if(type == "expense"){
            income.push(sum);
        }
        else{
            expense.push(sum);
        }
        $("#balance").html(balance);
        $("#transaction-list").append(`
            <li class="${type}">
                <p>${description}</p>
                <p>${sum}</p>
                <button class="delete">Poista</button>
            </li>
        `);

        localStorage.set
    
        $("#description").val("");
        $("#sum").val("");

        $(".delete").click(function() {
            $(this).closest("li").remove();
        });
    });



});

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Income', 'Expenditure'],
    datasets: [{
      label: 'Euro',
      data: ${type === "income" ? income : expense},
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