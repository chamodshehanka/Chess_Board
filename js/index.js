$(".spinner-wrapper").delay(3200).fadeOut(300);

function login() {
    $('.tap-target').tapTarget('open');
}

//menu links
function homePage() {
    location.href = "index.html";
}

function playPage() {
    location.href = "play.html";
}

function blogPage() {
    // location.href = "play.html";
    Materialize.toast('Blog is coming soon!', 2000,'rounded');
}