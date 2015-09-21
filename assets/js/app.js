var CommentView = Backbone.View.extend({
  tagName: 'li',
  template: AppTemplates.post,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);

    return this;
  },
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
    'submit form': 'addComment',
    'click add-new-comment': 'newComment',
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

    var comment = this.$el.find('.new-comment').val();
    var email = this.$el.find('.email').val();
    this.collection.create({comment: comment, email: email});
    this.$el.find('.new-comment').val('');
    this.$el.find('.email').val('');
  },

  newComment: function() {
    this.$('.new-comment-window').slideDown();
  },

});

var comments = new CommentThread();
var app = new AppView({collection: comments});
