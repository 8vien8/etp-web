import React, {useEffect, useState} from "react";
import { Form,FormGroup, Row, Input, Button, Col, Label } from reactstrap;
import axios from 'axios';


function AdminClasses() {
    const [data,setData] = useState([]);
    const [formData,setFormData] = useState({});

    useEffect(() => {
        fetch("API_ENDPOINT")
        .then((reponse) => {
            if (!reponse.ok)  {
                throw new Error(reponse);
            }
            return reponse.json();
        })
        .then((data) => {
            setData(data);
        })
        .catch((err) => alert("Error"))
        .finally(() => {
            console.log("End");
        });
    },
    []);


    const handleEdit = async (className) => {
        try{
            const response = await axios.post("API_ENDPOINT", {className});
            console.log("Data sent successfully: ", response.data);
        }catch (error){
            console.error("Error sending data: ",error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
        <div>
        <div className="col-6">
            <Input 
                name="search"
                type="text"
                placeholder="Search..."
            />      
        </div>
        <div className="col-6">
            <Button>Add Class</Button>
        </div>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                {data.map((item) => (
                    <FormGroup key={item.id}>
                        <Row>
                            <Col sm="6">
                                <Label>{item.className}</Label>
                            </Col>
                            <Col sm="6">
                                <Button onClick={() => handleEdit(item.className)}>Edit</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                ))}
            </Form>
        </div>
        </div>
    )
}

export default AdminClasses