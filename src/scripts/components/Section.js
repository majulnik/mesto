export class Section {
    _itemsAndRenderer = null;
    _selector = null;
    _container = null;
    constructor(items, renderer, selector){
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
        this._selectContainer();
    }

    _selectContainer() {
        this._container = document.querySelector(this._selector)        
    }

    renderItems() {
        this._items.forEach(element => {
            this.renderItem(element);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
    renderItem(item) {
        const element = this._renderer(item);
        this.addItem(element)
    }
}