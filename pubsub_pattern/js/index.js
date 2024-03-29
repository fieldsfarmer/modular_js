//events (publish subscribe) pattern

var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};

// Stats module
(function(){
    var people = 0;

    //cache DOM
    var $stats = $('#statsModule');
    var template = $('#stats-template').html();
    
    //bind events
    events.on('peopleChanged', setPeople);
    _render();
    console.log('stats module '+people)
    function _render() {
        console.log('I am in stats render')
       $stats.html(Mustache.render(template, {people: people}));
    }

    function setPeople(newPeople) {
        people = newPeople;
        _render();
    }

})();

//people module
(function(){
    var people = ['Will', 'Steve'];

    //cache DOM
    var $el = $('#peopleModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#people-template').html();

    //bind events
    $button.on('click', addPerson);
    $ul.delegate('i.del', 'click', deletePerson);

    _render();
    console.log('people module')
    function _render() {
       $ul.html(Mustache.render(template, {people: people}));
       events.emit("peopleChanged", people.length);
    }

    function addPerson(value) {
        var name = (typeof value === "string") ? value : $input.val();
        people.push(name);
        _render();
        $input.val('');
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