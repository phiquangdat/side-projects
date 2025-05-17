$(document).ready(function () {
  let balance = 0;
  let income = 0;
  let expense = 0;
  let type;

  $("#addTransaction").click(function () {
    let description = $("#description").val();
    let sum = Number($("#sum").val());
    type = sum < 0 ? "expense" : "income";

    balance += sum;
    if (sum < 0) {
      expense += Math.abs(sum);
    } else {
      income += sum;
    }

    $("#balance").html(balance);

    $("#transaction-list").append(`
            <li class="${type}">
                <p class="description">${description}</p>
                <p class="sum">${sum}</p>
                <button class="delete">Poista</button>
            </li>
    `);

    //Add to the chart the data of income and expense columns
    myChart.data.datasets[0].data[0] = income;
    myChart.data.datasets[0].data[1] = expense;
    myChart.update();

    $("#description").val("");
    $("#sum").val("");
  });

  // When new items are dynamically added to the list, they don't have any event listeners attached yet.
  // This is because the delete button doesn't exist when the page first loads, so we can't directly attach
  // an event listener to it. To handle this, we use event delegation, which listens for click events
  // on the parent element (the list), and when a click happens on a delete button (which is inside the list),
  // it will trigger the handler for the delete action.
  $("#transaction-list").on("click", ".delete", function () {
    let amount = Number($(this).closest("li").find(".sum").text());

    if (amount < 0) {
      expense -= amount * -1;
    } else {
      income -= amount;
    }

    balance -= amount;
    $(this).closest("li").remove();

    //Update the income and expense columns in chart; also the balance displayed
    myChart.data.datasets[0].data[0] = income;
    myChart.data.datasets[0].data[1] = expense;
    $("#balance").html(balance);
    myChart.update();
  });

  const ctx = document.getElementById("myChart");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expenditure"],
      datasets: [
        {
          label: "Euro",
          data: [0, 0], //Placeholders for income and expense array
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
