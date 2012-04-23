//-----------------------------------------------------------------------------
// Adapter and Adapter factory
//-----------------------------------------------------------------------------

XML3D.data = XML3D.data || {};

XML3D.data.Adapter = function(factory, node) {
    this.factory = factory; // optional
    this.node = node; // optional
};

XML3D.data.Adapter.prototype.init = function() {
    // Init is called by the factory after adding the adapter to the node
};

XML3D.data.Adapter.prototype.notifyChanged = function(e) {
    // Notification from the data structure. e is of type
    // XML3D.Notification.
};
XML3D.data.Adapter.prototype.isAdapterFor = function(aType) {
    return false; // Needs to be overwritten
};

XML3D.data.AdapterFactory = function() {
};

XML3D.data.AdapterFactory.prototype.getAdapter = function(node, atype) {
    if (!node || node._configured === undefined)
        return null;
    var elemHandler = node._configured;
    var realType = atype || this.name;
    var adapter = elemHandler.adapters[realType];
    if(adapter !== undefined)
        return adapter;

    // No adapter found, try to create one
    adapter = this.createAdapter(node);
    if (adapter) {
        elemHandler.adapters[realType] = adapter;
        adapter.init();
    }
    return adapter;
};

XML3D.data.AdapterFactory.prototype.createAdapter = function(node) {
    return null;
};
