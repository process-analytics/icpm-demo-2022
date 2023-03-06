/* Data structure to store mock compliance rules
   activities stored by name instead of id to be as close as possible to real data*/
const complianceData = new Map()
complianceData.set("Record Invoice Receipt", {
    "Record Goods Receipts": {"nbViolations": 55, "percentTraces": 6.88}
})
complianceData.set("Clear Invoice", {
    "Record Goods Receipts": {"nbViolations": 31, "percentTraces": 5.80},
    "Record Invoice Receipt": {"nbViolations": 3, "percentTraces": 0.67}
})

export function getComplianceData(){
    return complianceData
}

export function getActivityComplianceData(activityName){
    return complianceData.get(activityName)
}