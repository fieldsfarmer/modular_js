
//people module
var people = (function(){
    var people = ['Will', 'Steve'];

    //cache DOM
    var $el = $('#peopleModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#people-template').html();

    //bind events
    $button.on('click', addPerson);
    $input.on('keypress', addPerson);
    $ul.delegate('i.del', 'click', deletePerson);

    _render();

    function _render() {
       $ul.html(Mustache.render(template, {people: people}));
       events.emit("peopleChanged", people.length);
    }

    // function addPerson(value) {
    //     var name = (typeof value === "string") ? value : $input.val();
    //     people.push(name);
    //     _render();
    //     $input.val('');
    // }

    function addPerson(e){
        var name = '';
        if(typeof e === 'string'){
            name = e;
        }
        else if(e.type != 'keypress' || e.which == 13){
            name = $input.val();
        }
        if(name != ''){
            people.push(name);
            _render();
            $input.val('')
        }
    }

    function deletePerson(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            i = $ul.find('li').index($remove);
        }
        people.splice(i, 1);
        _render();
    }


})();