$(".spinner-wrapper").delay(3200).fadeOut(300);

function login() {
    $('.tap-target').tapTarget('open');
}

//menu links
function homepage() {
    location.href = "index.html";
}

function playpage() {
    location.href = "play.html";
}

function blogpage() {
    // location.href = "play.html";
    Materialize.toast('Blog is coming soon!', 2000,'rounded');
}