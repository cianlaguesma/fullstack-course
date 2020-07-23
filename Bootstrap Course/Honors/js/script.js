function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("restaurantUL");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

$(document).ready(function () {
  $("#restaurantUL").hide();
  $("#searchBar").click(function (e) {
    $("#restaurantUL").show();
    e.stopPropagation();
  });
  $("#restaurantUL").click(function (e) {
    e.stopPropagation();
  });
  $(document).click(function (e) {
    $("#restaurantUL").hide();
  });
});
$(function () {
  var navlist = document.getElementById("nav-list");
  var navItem1 = document.getElementById("navItem1");
  var navItem2 = document.getElementById("navItem2");
  var screenWidth = window.innerWidth;
  if (screenWidth < 576) {
    console.log("here");
    navlist.classList.remove("mr-3");
    navlist.classList.remove("ml-auto");
    navItem1.classList.remove("mr-5");
    navItem2.classList.remove("mr-5");
  } else if (screenWidth > 576) {
    navlist.classList.add("mr-3");
    navlist.classList.add("ml-auto");
    navItem1.classList.add("mr-5");
    navItem2.classList.add("mr-5");
  }
  $(window).on("resize", function () {
    var screenWidth = window.innerWidth;
    if (screenWidth < 576) {
      console.log("here");
      navlist.classList.remove("mr-3");
      navlist.classList.remove("ml-auto");
      navItem1.classList.remove("mr-5");
      navItem2.classList.remove("mr-5");
    } else if (screenWidth > 576) {
      navlist.classList.add("mr-3");
      navlist.classList.add("ml-auto");
      navItem1.classList.add("mr-5");
      navItem2.classList.add("mr-5");
    }
  });
});
