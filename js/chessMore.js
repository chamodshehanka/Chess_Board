var $toastContent = $('<span>🎤 Voice command is enabled</span>').add(
    $('<button class="btn-flat toast-action" onclick="$toastContent.hide()">Ok</button><button class="btn-flat toast-action">Undo</button>'));
Materialize.toast($toastContent, 6000,'rounded');

$(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
});

//Disable All
$(document).ready(function () {
    //Disable cut copy paste
    var body=$('body');
    body.bind('cut copy paste', function (e) {
        e.preventDefault();
    });

    //Disable mouse right click
    body.on("contextmenu",function(e){
        return false;
    });
});