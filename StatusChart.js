  
import React, { useState, useContext, useEffect } from 'react'
import { StatusContext } from '../Context/StatusContext'
import moment from 'moment'


function StatusChart() {

    const { token, userAuxLog, statusList } = useContext(StatusContext)


    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = `${yyyy}-${mm}-${dd}`

    let startTime
    let endTime
    let calcStartTime
    let calcEndTime
    let calcTimeInStatus
    let calcStatus
    let outputTableData = []

    if (userAuxLog !== "" && statusList) {
        const todaysAuxLogs = userAuxLog.filter ? userAuxLog.filter(auxLog => auxLog.start_time.slice(0, 10) === today): []

        todaysAuxLogs.map(auxLog => {
            startTime = (auxLog.start_time !== null) ? moment(auxLog.start_time.split(" ")[1], "hh:mm:ss").format("LT") : "None"
            endTime = (auxLog.end_time !== null) ? moment(auxLog.end_time.split(" ")[1], "hh:mm:ss").format("LT") : "None"
            calcStartTime = (auxLog.start_time !== null) ? auxLog.start_time.split(" ")[1] : null
            calcEndTime = (auxLog.end_time !== null) ? auxLog.end_time.split(" ")[1] : null
            calcTimeInStatus = (calcStartTime && calcEndTime !== null) ? moment(calcEndTime, "HH:mm:ss").diff(moment(calcStartTime, "HH:mm:ss"), 'minutes') : "In Progress"
            calcStatus = statusList.filter(auxStatus => auxLog.aux_number === auxStatus.id)

            outputTableData.push({
                sTime: startTime,
                eTime: endTime,
                tis: calcTimeInStatus,
                status: calcStatus[0].status_name
            })
        })

        return (
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Status</th>
                            <th scope="col">Time in Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outputTableData.reverse().map((outputData) => {
                            return <tr>
                                <td>{outputData.sTime}</td>
                                <td>{outputData.eTime !== null ? outputData.eTime : "N/A"}</td>
                                <td>{outputData.status}</td>
                                <td>{`${outputData.tis}`}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )

    } else {

        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }



}

export default StatusChart
