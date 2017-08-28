var size = 10;

var clearGrid = function() {
    $('#container').empty();
    makeGrid(size);
}

function makeGrid(size) {
    var box = $('#container');
    var shade = 50;
    var counter = 0;
    for (var y = 0; y < size; y++) {
        var row = $('<div></div>');
        var side;
        (screen.width > screen.height) ? side = screen.height : side = screen.width;
        row.css('width', side);
        row.css('height', side/size);
        //row.css('background-color', "rgb(255," + shade + "," + shade + ")");
        for (var x = 0; x < size; x++) {
            var cell = $('<div></div>');
            cell.addClass("cell");
            cell.css('background-color', "rgb(0," + shade + "," + shade + ")");
            cell.css('width', side/size);
            cell.css('height', side/size);
            cell.on('mouseover', function(){
                var parts = $(this).css('background-color').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                var r = (10 + (+parts[1])) % 255;
                var g = (10 + (+parts[2])) % 255;
                var b = (10 + (+parts[3])) % 255;
                $(this).css('background-color', "rgb("+ r + ", " + g + "," + b + ")");
            });
            row.append(cell);
            counter++;
        }
        box.append(row);
        shade = shade;
    }
}

function color(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}

function changeSize() {
    size = +($('#size').val());
    clearGrid();
}

$(document).ready(function () {
    makeGrid(size);
    $('.button, #clear').on('click', clearGrid);
    $('#size').on('change', changeSize);
});