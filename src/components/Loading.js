import React from "react"
import loading from  "../images/loading.gif"

const Loading = () => {
    return (
        <div className="loadingPage">
        <img className="loading" src={loading} alt="loading..." />
        </div>
    )
}

export default Loading