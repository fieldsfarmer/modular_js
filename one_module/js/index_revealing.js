var people = {
    people: ['Will', 'Steve'],
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function() {
        this.$el = $('#peopleModule');
        this.$button = this.$el.find('button');
        this.$input = this.$el.find('input');
        this.$ul = this.$el.find('ul');
        this.template = this.$el.find('#people-template').html();
    },
    bindEvents: function() {
        this.$button.on('click', this.addPerson.bind(this));
        //// on is a more recent api; thus use on rather than delegate, live, etc
        this.$ul.on('click', 'i.del', this.deletePerson.bind(this)); 
        // this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));

        //// inorder to implement this feature, we need to rewrite the addPerson in the following
        this.$input.on('keypress', this.addPerson.bind(this)); 
    },
    render: function() {
       var data = {
           people: this.people,
       };
       this.$ul.html(Mustache.render(this.template, data));
    },
    // addPerson: function() {
    //     this.people.push(this.$input.val());
    //     this.render();
    //     this.$input.val('');
    // },
    ////
    //// This following function enables  keypress also to use it in console, like people.addPerson('Kevin')
    addPerson: function(e) {
        var name = '';
        if(typeof e === 'string'){
            name = e;
        }
        else if(e.type != 'keypress' || e.which==13){
            name = this.$input.val();
        }
        if(name != ''){
            this.people.push(name);
            this.render();
            this.$input.val('');
        }
    },
    // deletePerson: function(event) {
    //     if 
    //     var $remove = $(event.target).closest('li');
    //     var i = this.$ul.find('li').index($remove);

    //     this.people.splice(i, 1);
    //     this.render();
    // }
    //// This following function enables
    deletePerson: function(e) {
        var i;
        if(typeof e === 'number'){
            i = e;
        }
        else{
            var $remove = $(event.target).closest('li');
            i = this.$ul.find('li').index($remove);
        }
        this.people.splice(i, 1);
        this.render();
    }

};

people.init();