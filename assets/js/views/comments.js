var Comment = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    title: ''
  }
});

var CommentThread = Backbone.Collection.extend({
  model: Comment,
  url: 'http://tiny-lr.herokuapp.com/collections/bt-comments'
});
