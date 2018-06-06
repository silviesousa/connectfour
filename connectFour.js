(function (){
    var curPlayer = 'player1';

    function switchPlayers() {

        $('.chip').removeClass(curPlayer);

        if (curPlayer == 'player1') {
            curPlayer = 'player2';
        } else {
            curPlayer = 'player1';
        }
        $('.chip').addClass(curPlayer);
    }

    function checkForVictory(slots) {
        var str='';
        for (var i = 0; i <slots.length; i++) {
            if (slots.eq(i).hasClass(curPlayer)) {
                str += 'y';
            } else {
                str += 'n';
            }
        }
        return str.indexOf('yyyy') > -1;

    }

    function checkSlotDiag(column, row) {


        var upRight = [
            column.prev().prev().prev().children().eq(row+3),
            column.prev().prev().children().eq(row+2),
            column.prev().children().eq(row+1),
            column.children().eq(row),
            column.next().children().eq(row-1),
            column.next().next().children().eq(row-2),
            column.next().next().next().children().eq(row-3)
        ];

        var downRight = [
            column.prev().prev().prev().children().eq(row-3),
            column.prev().prev().children().eq(row-2),
            column.prev().children().eq(row-1),
            column.children().eq(row),
            column.next().children().eq(row+1),
            column.next().next().children().eq(row+2),
            column.next().next().next().children().eq(row+3)
        ];

        for (var i = 0, str = ''; i < 7; i++){
            if (upRight[i].hasClass(curPlayer)) {
                str += 'y';
            } else {
                str += 'n';
            }
        }

        if (str.indexOf('yyyy') > -1) {
            return true;

        } else {
            for (i = 0, str = ''; i < 7; i++){
                if (downRight[i].hasClass(curPlayer)) {
                    str += 'y';
                } else {
                    str += 'n';
                }
            }
            return str.indexOf('yyyy') > -1;

        }
    }

    function victoryMessage() {
        var win = "Congrats! You win!";
        var animation;
        setTimeout(function() {
            if (curPlayer == 'player1') {
                alert(win);
                animation.easeIn();
                location.reload();
            } else {
                alert (win);
                location.reload();
                animation.easeIn();
            }
        }, 600);
    }


    $('body').on('mousemove', function (e){
        $('.chip').css('top', + (e.clientY - 55));
        $('.chip').css('left', + (e.clientX - 55));
    });


    $('.column').on('click', function (e) {

        var slotsInColumn = $(e.currentTarget).find('.slot');

        for (var i = 5; i >= 0; i--) {
            if (!slotsInColumn.eq(i).hasClass('player1') && !slotsInColumn.eq(i).hasClass('player2')){
                slotsInColumn.eq(i).addClass(curPlayer);
                break;
            }
        }

        if (checkForVictory(slotsInColumn)) {

            victoryMessage();
        } else {

            var slotsInRow = $('.row' + i);
            if (checkForVictory(slotsInRow)) {

                victoryMessage();

            } else {
                if (checkSlotDiag($(e.currentTarget), i)) {
                    
                    victoryMessage();
                }

            }
        }

        switchPlayers();

    });
})();
