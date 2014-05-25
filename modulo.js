$(document).ready(function () {

    String.prototype.repeat = function(times) {
        return (new Array(times + 1)).join(this);
    };

    $('#input').keyup(function () {
        
        var text = $(this).val().split(/[,.\ \n]+/);
        var numbers = [];
        var longest = 0;

        text.forEach(function (e) {
            if($.isNumeric(e)) {
                var dec = parseInt(e)
                var bin = dec.toString(2);
                if (bin.length > longest) {longest = bin.length};
                numbers.push([dec, dec.toString(2)]);
            }
        });

        numbers.forEach(function (a) {
            padding = "0".repeat(longest - a[1].length)
            console.log(padding);
            a[1] = "<span class='fade'>" + padding + "</span>" + a[1];
        });

        var tbody = "";

        numbers.forEach(function (a) {
            var row = '<tr><td>' + a[0] + '</td><td>' + a[1] + '</td></tr>';
            tbody += row;
        })

        $('#output').html(tbody);
    })
})