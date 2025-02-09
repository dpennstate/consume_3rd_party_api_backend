const mongoose = require("mongoose");
const {Schema, model} = mongoose

// Note: After reading up on MongoDB, it creates a unique ObjectID automatically in a new document before
// writing that document. Because of this, there will be no id attached to the Schema
const auditHistorySchemaLocal = new Schema({
    username: String,
    request_made: String,
    request_passed: Boolean,
    audit_date: Date
})

const AuditHistory = model('AuditHistory', auditHistorySchemaLocal)

module.exports = {AuditHistory}