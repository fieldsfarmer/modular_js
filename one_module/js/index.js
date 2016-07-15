var people = (function(){
    var people    = ['Will', 'Steve'];

    var $el       = $('#peopleModule');
    var $input    = $el.find('input');
    var $button   = $el.find('button');  
    var $template = $el.find('#people-template').html();
    var $ul       = $el.find('ul');

    $button.on('click', addPerson);
    $input.on('keypress', addPerson);
    $ul.on('click', 'i.del', deletePerson);

    _render();

    function _render(){
        $ul.html(Mustache.render($template, {people: people}));
    }
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
        }
    }
    function deletePerson(e){
        var i;
        if(typeof e === 'number'){
            i = e;
        }
        else{
            var $remove = $(e.target).closest('li');
            i = $ul.find('li').index($remove);
        }
        people.splice(i,1);
        _render();
    }
    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    };
}());