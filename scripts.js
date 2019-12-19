var scroll_pos = 0;
function navScroll(pxScroll = window.innerHeight-53) {
  scroll_pos = window.pageYOffset; //number of pixels scrolled

  //header picture still showing on page, so the nav bar is transparent
  if (scroll_pos < pxScroll) {
    document.getElementById("nav").getElementsByTagName("ul")[0].style.backgroundColor = 'transparent';
    document.getElementById("nav").getElementsByTagName("ul")[0].style.transition = "all 0.5s";
    document.getElementById("nav").getElementsByTagName("ul")[0].style.WebkitTransition = "all 0.5s"; //safari
  }

//header picture is not showing on the page, so the nav bar is not transparent
  else {
    document.getElementById("nav").getElementsByTagName("ul")[0].style.backgroundColor = '#00d9ff';
    document.getElementById("nav").getElementsByTagName("ul")[0].style.transition = "all 0.5s";
    document.getElementById("nav").getElementsByTagName("ul")[0].style.WebkitTransition = "all 0.5s"; //safari
  }
};
