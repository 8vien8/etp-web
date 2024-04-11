import { useState } from "react"
import "./uploadFileStyle.css"
import { Input, Button } from "reactstrap"
function UploadFile() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUpLoadedFiles] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFiles([...selectedFiles, ...e.target.files]);
    }

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            // logic to save the selected files in to database
            setUpLoadedFiles([...uploadedFiles, ...selectedFiles]);
            setSelectedFiles([]);
            console.log('Choose file:', selectedFiles);
        } else {
            console.log('Choose at least one file');
        }
    }

    const handleDeleteFiles = (index) => {
        const newFiles = [...uploadedFiles];
        newFiles.splice(index, 1);
        setUpLoadedFiles(newFiles);
        console.log('New files:', newFiles);
    }
    return (
        <div>
            <div className="class-documents"><h3> Class Document here </h3>
                <Input className="upload-document" type="file" multiple onChange={handleFileChange}></Input>
                <Button onClick={handleUpload}>Upload File</Button>
                {uploadedFiles.length > 0 && (
                    <div>
                        <h4>Uploaded Files:</h4>
                        <ul>
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="file-information">
                                    {file.name}
                                    <div className="function-button">
                                        <a href={URL.createObjectURL(file)} download>Download</a>
                                        <Button onClick={() => handleDeleteFiles(index)}>Delete</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div >
    )
}

export default UploadFile