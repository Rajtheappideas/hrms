import React, { useState } from 'react'
import DeveloperReport from './Developer/DeveloperReport'
import ReportTable from './Developer/ReportTable'
const Index = () => {
    const[reports,setReports] = useState([])
    return (
        <div>
            <DeveloperReport reports={reports} />
            <ReportTable />
        </div>
    )
}

export default Index
