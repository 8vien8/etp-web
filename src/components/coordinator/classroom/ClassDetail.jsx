import "./classDetailStyle.css"
import UploadFile from "./uploadFile/UploadFile.jsx"
import ClassMembers from "./members/ClassMembers.jsx"
import Submissions from "./submission/Submissions.jsx"
import ClassDueDate from "./dueDate/ClassDueDate.jsx"
const ClassDetail = () => {
    return (
        <div>
            <div className="class-information"><h2> Class name and ID here</h2></div>
            <ClassDueDate />
            <UploadFile />
            <ClassMembers />
            <Submissions />
        </div>
    )
}

export default ClassDetail