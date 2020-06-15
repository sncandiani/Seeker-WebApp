import React, {useState, useEffect} from "react"
const Dashboard = (props) => {
    const user = props.user.user
    return (
        <>
    
        <p className="dashboardtxt">Welcome, {user.username}!</p>
        <p className="dashboardtxt">Your upcoming interviews:</p>
        <p className="dashboardtxt">Who to contact next:</p>
        
        </>
    )
}

export default Dashboard