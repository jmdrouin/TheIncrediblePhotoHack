class View
    constructor: (@element, attributes={}, @keep_low=false) ->
        @element.setAttribute(key, value) for key, value of attributes;
        @element.view = this

    insert: (parent_element) ->
        first_child = parent_element.firstChild
        if @keep_low and first_child?
            parent_element.insertBefore(@element, first_child)
        else
            parent_element.appendChild(@element)

class SvgView extends View
    constructor: (@type, attributes, @keep_low=false) ->
        element = document.createElementNS("http://www.w3.org/2000/svg", @type);
        super(element, attributes, @keep_low);

class WindowView extends View
    constructor: ->
        super(window)
        @root = document.getElementById('root')

        attributes =
            r: 8
            'stroke': 'black'
            'fill': 'black'
            'stroke-width':1
            cx: 20
            cy: 20
        p = new SvgView('circle', attributes)
        p.insert(@root)

this.load = (event) ->
    new WindowView

