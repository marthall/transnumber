domready(function () {

    String.prototype.repeat = function(times) {
        return (new Array(times + 1)).join(this);
    };

    document.querySelector('.in-choice .dec').classList.add('selected');
    document.querySelector('.out-choice .bin').classList.add('selected');
    
    function isValidNumber(number, numeral) {
        return getNumeralRegex(numeral).test(number);
    };

    function getNumeralRegex(numeral) {
        if (numeral <= 10) {
            return RegExp('^[0-' + (numeral - 1) + "]+$");
        } else if (numeral == 11) {
            return RegExp('^[0-9aA]+$')
        } else {
            return RegExp('^[0-9a-' + (String.fromCharCode("a".charCodeAt(0) + (numeral - 11))) + "]+$");
        };
    };

    function wrapNumber (number) {
        return "<span class='number'>" + number + "</span>";
    }
    
    function convert () {
        var inNumeral = document.querySelector('.in-choice .btn.selected').value;
        var outNumeral = document.querySelector('.out-choice .btn.selected').value;

        var inText = document.querySelector('#input').value;
        var separator = document.querySelector('#format').value;

        if(!separator) {
            inText = inText.replace(/\n+/g, "<br>");

            var resultString = inText.replace(/([0-9a-zA-Z]+)/g, function(match, number) {
                if (!isValidNumber(number, inNumeral)) {
                    return number;
                }
                var inNumber = parseInt(number, inNumeral);
                var outNumber = inNumber.toString(outNumeral);

                return wrapNumber(outNumber);
            });

        } else {
            var numbers = inText.match(/([0-9a-zA-Z]+)/g);
            var resultString = "";
            if (numbers) {
                numbers.forEach(function (n) {
                    if (!isValidNumber(n, inNumeral)) {
                        resultString += n + separator;
                    } else {
                        var inNumber = parseInt(n, inNumeral);
                        var outNumber = inNumber.toString(outNumeral);
                        resultString += wrapNumber(outNumber) + separator;
                    }
                })
            } 
        }

        document.querySelector('#output').innerHTML = resultString;
    };

    var input = document.querySelector('#input');
    input.addEventListener('input', function () {
        convert();
    });

    var format = document.querySelector('#format');
    format.addEventListener('change', function () {
        console.log("format");
        convert();
    });

    var buttons = document.getElementsByClassName('btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', setInOut, false);
    };

    function setInOut () {
        var parent = this.parentNode;
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].className) {
                var btn = parent.childNodes[i];
                btn.className = btn.className.replace(/selected/, "");
            };
        };
        this.classList.add("selected");
        convert();
    };
});