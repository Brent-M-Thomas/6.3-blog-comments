var AppTemplates = {};

AppTemplates['app'] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"comment\">\n    <button class=\"add-new-comment\">Add Comment</button>\n    <div class=\"new-comment-window\">\n        <form>\n            <label for=\"new-comment\">Comment</label>\n            <textarea type=\"text\" class=\"new-comment\" placeholder=\"Add your comment here\"></textarea>\n            <label for=\"email\">Email</label>\n            <input type=\"text\" class=\"email\" placeholder=\"email\">\n            <button>Submit</button>\n        </form>\n    </div>\n    <div class=\"thread\">\n        <ul class=\"comment-thread\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 1),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n\n    </div>\n</div>\n";
},"useData":true});
AppTemplates['post'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<p class=\"comment\">"
    + alias3(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</p>\n<p class=\"email\">"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"useData":true});
var Comment = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    comment: '',
    email: '',
  },
});

var CommentThread = Backbone.Collection.extend({
  model: Comment,
  url: 'http://tiny-lr.herokuapp.com/collections/bt-comments',
});


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
    'click .add-new-comment': 'newComment',
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
//# sourceMappingURL=app.map