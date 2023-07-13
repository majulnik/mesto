export class Section {
    _itemsAndRenderer = null;
    _selector = null;
    _container = null;
    constructor(itemsAndRenderer, selector){
        this._itemsAndRenderer = itemsAndRenderer;
        this._selector = selector;
        this._selectContainer()
    }

    _selectContainer() {
        this._container = document.querySelector(this._selector)        
    }

    render() {
        this._itemsAndRenderer.items.forEach(element => {
            this.renderItem(element);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
    renderItem(item) {
        const element = this._itemsAndRenderer.renderer(item);
        this.addItem(element)
    }
}