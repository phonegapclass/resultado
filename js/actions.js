//actions
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});

function escribir(texto){
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        alert(0);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        alert(1);
        fileSystem.root.getFile("practica8.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        alert(2);
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        alert(3);
        writer.onwriteend = function(evt) {
            navigator.notification.alert("El archivo fue escrito satisfactoriamente.",null,"Escribir","Aceptar");
        };
        writer.write(text);
    }

    function fail(error) {
        alert(error.code);
    }
}

function leer(){
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("practica8.txt", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(readAsText, fail);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            $('#arcLeer').val(evt.target.result);
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
}

$(function(){
    $('#archivos .individual li').tap(function(){
        if($(this).index()==0){//Escribir
            escribir($('#arcEscribir').val());
        }else{//Leer
            leer();
        }
    });
});