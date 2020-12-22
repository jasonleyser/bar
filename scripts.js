function addFire() {
  var date = formatDate();
  console.log(date);
  fetch("https://api.countapi.xyz/hit/barmelo-for-breakfast-fire/33442")
    .then((response) => response.json())
    .then((data) => {
      // Here's a list of repos!
      console.log(data);
      document.getElementById("fireValue").innerHTML = data.value;
    });
}

function countFire() {
  fetch("https://api.countapi.xyz/get/barmelo-for-breakfast-fire/33442")
    .then((response) => response.json())
    .then((data) => {
      // Here's a list of repos!
      console.log(data);
      document.getElementById("fireValue").innerHTML = data.value;
    });
}

function addCoin() {
  var date = formatDate();
  console.log(date);
  fetch("https://api.countapi.xyz/hit/barmelo-for-breakfast-coin/33442")
    .then((response) => response.json())
    .then((data) => {
      // Here's a list of repos!
      console.log(data);
      document.getElementById("coinValue").innerHTML = data.value;
    });
}

function countCoin() {
  fetch("https://api.countapi.xyz/get/barmelo-for-breakfast-coin/33442")
    .then((response) => response.json())
    .then((data) => {
      // Here's a list of repos!
      console.log(data);
      document.getElementById("coinValue").innerHTML = data.value;
    });
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
}

async function getTitle() {
  fetch(
    "https://api.radioking.io/widget/radio/barmelo-for-breakfast/track/current"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data::" + data.title);
    });
}

async function refreshData() {
  countFire();
  countCoin();
  try {
    current_title = "";

    const response = await fetch(
      "https://api.radioking.io/widget/radio/barmelo-for-breakfast/track/current"
    );

    if (response.status === 200) {
      const data = await response.json(); //extract JSON from the http response
      var title = data.title;
      var artist = data.artist;
      var info = data.album.split(",");
      console.log(data.title);

      this.document.getElementById("sleepingCover").style.display = "none";
      this.document.getElementById("playerCover").style.display = "inline";

      this.document.getElementById("title").innerHTML = data.title;
      this.document.getElementById("artist").innerHTML = ">" + data.artist;
      this.document.getElementById("year").innerHTML = info[1];
      this.document.getElementById("discogs_button").href = data.buy_link;
      console.log("ct:" + current_title);

      if (data.title == current_title) {
        console.log("same");
      } else {
        console.log("changed");
        var current_title = data.title;
        if (info[2] == "none") {
          this.document.getElementById("lowest_price_bar").style.width = "0%";
          this.document.getElementById("price").innerHTML = "NONE FOR SALE";
          this.document.getElementById("rating_bar").style.width = "0%";
          this.document.getElementById("rating").innerHTML = "NO RATINGS";
        } else {
          return;
        }
      }
    } else {
      console.log("Error: Radio is off or has been connection lost");

      this.document.getElementById("sleepingCover").style.display = "inline";
      this.document.getElementById("playerCover").style.display = "none";
    }
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err);
  } finally {
    // do it again in 2 seconds
    setTimeout(refreshData, 5000);
  }
}
