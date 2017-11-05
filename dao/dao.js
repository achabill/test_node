'use strict';

module.exports = {
    client: null,
    init: function (_client) {
        this.client = _client;
    },
    createIndex: function (indexName, indexMapping) {
        return this.client.indices.create({
            index: indexName,
            mappings: indexMapping
        });
    },

    addToIndex: function (indexName, typeName, obj) {
        return this.client.index({
            index: indexName,
            type: typeName,
            body: obj
        });
    },

    search: function (indexName, typeName) {
        return this.client.search({
            index: indexName,
            type: typeName
        });
    }
};