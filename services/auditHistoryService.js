const {CreateAuditHistory} = require("../dbCalls/AuditHistoryDBCalls");
const {AuditHistory} = require("../schemas/auditHistorySchema");

function createAudit(user, requestMade, requestPassed, auditDate) {
    const audit_instance = new AuditHistory({
        username: user,
        request_made: requestMade,
        request_passed: requestPassed,
        audit_date: auditDate
    })
    CreateAuditHistory(audit_instance)
}
module.exports = {createAudit}


