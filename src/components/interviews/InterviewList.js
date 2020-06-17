import React, {useState, useEffect}from "react"
import {Button, Icon} from "semantic-ui-react"
import ApiManager from "../../modules/ApiManager"
import InterviewCard from "./InterviewCard"
const InterviewList = (props) => {
    const [interviews, setInterviews] = useState([])
    
    const getInterviews = () => {
        ApiManager.getInterviews(props.token)
        .then((interviews) => {
            
            setInterviews(interviews)
        })
    }
    useEffect(() => {
        getInterviews()
    }, [])
    return (
        <>
        <h1>Interviews</h1>
        <Button icon onClick={() => props.history.push("/interviews/form")}><Icon name="plus"/></Button>
        <div className="interviewCards">
        {interviews ? 
        <>
        {interviews.map((interview) => (
        <InterviewCard key={interview.id} interview={interview} {...props} />
      ))}
        </>
         : 
         <p>No Interviews</p>}
      
      </div>
        </>
    )

}

export default InterviewList