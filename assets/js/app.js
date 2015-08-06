var CommentView = Backbone.View.extend({
  tagName: 'li',
  template: AppTemplates.comment,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);

    return this;
  }
});

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '#target',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
    'submit form': 'addComment'
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;
    this.$el.html(html);
    this.collection.forEach(function(comment) {
      var childView = new CommentView({model: comment});

      _this.$el.find('.comment-thread')
        .append(childView.render().$el);
    });
  },

  addComment: function(ev) {
    ev.preventDefault();

    var title = this.$el.find('input').val();
    this.collection.create({title: title});
    this.$el.find('input').val('');
  }
});

var comments = new CommentThread();
var app = new AppView({collection: comments});
