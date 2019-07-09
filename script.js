var names = [];
var namesList = [];
var x = 0;
var drawTimer = '';
var winners = [];


const button = function(text, onClick) {
    return '<button onclick="' + onClick + '()">' + text + '</button>';
}

const renderLayout = function() {
    var layout = '<div id="namelist"><h1>Deltagere:</h1><br>';
    namesList = names;
    namesList.sort();
    for (i = 0; i < namesList.length; i++) {
        if (i === 0) layout += namesList[i];
        else layout += '<br>' + namesList[i];
    }
    layout += '</div>';
    layout += '<div id="winners"><h1>Vindere:</h1></div>';
    layout += '<div id="draw">Klar til at trække den første vinder.</div>';
    layout += '<button id="button" onclick="startDraw()">Træk en vinder</button>';
    document.getElementById('body').innerHTML = layout;
}

const nextPage = function() {
    var text = document.getElementById('textarea').value;
    names = text.split('\n');
    renderLayout();
}

const startDraw = function() {
    document.getElementById('button').style.display = 'none';
    names.sort(function(a, b){return 0.5 - Math.random()});
    x = 0;
    drawTimer = setInterval(draw, 50);
    setTimeout(drawWinner, (((Math.random() * 10) + 5) * 1000));
}

const drawWinner = function() {
    clearInterval(drawTimer);
    winners.push(names[x-1]);
    names.splice(x-1, 1);
    if (names.length != 0) {
        var button = document.getElementById('button');
        button.innerHTML = 'Træk næste vinder';
        button.style.display = 'block';
    }
    namesList = names;
    namesList.sort();
    var newText = '<h1>Deltagere:</h1><br>';
    for (i = 0; i < namesList.length; i++) {
        if (i === 0) newText += namesList[i];
        else newText += '<br>' + namesList[i];
    }
    document.getElementById('namelist').innerHTML = newText;
    document.getElementById('winners').innerHTML += '<br><strong>' + winners.length + '.</strong> ' + winners[winners.length-1];
}

const draw = function() {
    if (x == names.length) {
        x = 0;
        names.sort(function(a, b){return 0.5 - Math.random()});
    }
    document.getElementById('draw').innerHTML = names[x];
    console.log(names[x]);
    x++;
}