function CreateAuditHistory(AuditHistoryModel) {
   return AuditHistoryModel.save().then(function(savedValue) {
        console.log("The saved value is ", savedValue)
        return {errorMessage: null}
    }).catch(function(err) {
       console.error("Audit History Save Failed: ", err)
       return {errorMessage: "Audit History Database Save Not Successful"}
   })
}
module.exports = {CreateAuditHistory}