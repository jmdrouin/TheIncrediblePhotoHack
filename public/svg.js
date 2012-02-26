(function() {
  var PhotoView, SvgView, View, WindowView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  View = (function() {

    function View(element, attributes, keep_low) {
      var key, value;
      this.element = element;
      if (attributes == null) attributes = {};
      this.keep_low = keep_low != null ? keep_low : false;
      for (key in attributes) {
        value = attributes[key];
        this.element.setAttribute(key, value);
      }
      this.element.view = this;
    }

    View.prototype.insert = function(parent_element) {
      var first_child;
      first_child = parent_element.firstChild;
      if (this.keep_low && (first_child != null)) {
        return parent_element.insertBefore(this.element, first_child);
      } else {
        return parent_element.appendChild(this.element);
      }
    };

    return View;

  })();

  SvgView = (function(_super) {

    __extends(SvgView, _super);

    function SvgView(type, attributes, keep_low) {
      var element;
      this.type = type;
      this.keep_low = keep_low != null ? keep_low : false;
      element = document.createElementNS("http://www.w3.org/2000/svg", this.type);
      SvgView.__super__.constructor.call(this, element, attributes, this.keep_low);
    }

    return SvgView;

  })(View);

  PhotoView = (function(_super) {

    __extends(PhotoView, _super);

    function PhotoView(file, attributes, keep_low) {
      this.file = file;
      this.keep_low = keep_low != null ? keep_low : false;
      attributes['xlink:href'] = this.file;
      attributes = {
        r: 8,
        'stroke': 'black',
        'fill': 'black',
        'stroke-width': 5,
        cx: 20,
        cy: 20
      };
      PhotoView.__super__.constructor.call(this, 'image', attributes, this.keep_low);
    }

    return PhotoView;

  })(SvgView);

  WindowView = (function(_super) {

    __extends(WindowView, _super);

    function WindowView() {
      var attributes, p;
      WindowView.__super__.constructor.call(this, window);
      this.root = document.getElementById('root');
      attributes = {
        r: 8,
        'stroke': 'black',
        'fill': 'black',
        'stroke-width': 0,
        cx: 20,
        cy: 20
      };
      p = new SvgView('circle', attributes);
      p.insert(this.root);
    }

    return WindowView;

  })(View);

  this.load = function(event) {
    return new WindowView;
  };

}).call(this);
