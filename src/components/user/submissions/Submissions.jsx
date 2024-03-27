import { useState } from 'react'
import { Form, Input,Button } from 'reactstrap'
import './submissionStyle.css'
function Submissions() {
  const [courseName, setCourseName] = useState('');
  const [courseDate, setCourseDate] = useState('');
  const [courseStatus, setCourseStatus] = useState('');

  const handleSearch = () => {
    console.log('Searching with the following parameters:');
    console.log('Course Name:', courseName);
    console.log('Course Date:', courseDate);
    console.log('Course Status:', courseStatus);
  };
  return (
    <div>
      <div>
        <Form className='search-course-container'>
          <div className='search-input'>
            <Input 
              type='text'
              name='course'
              id='course'
              placeholder='Enter Course...' 
              onChange={(e) => setCourseName(e.target.value)}
            >
            </Input>
            <Input 
              type='date'
              name='date'
              id='courseDate'
              onChange={(e) => setCourseDate(e.target.value)}
            >
            </Input>
            <Input 
              type='select'
              name='status'
              id='courseStatus'
              onChange={(e) => setCourseStatus(e.target.value)}
            >
              <option>Opening</option>
              <option>Closed</option>
            </Input>
          </div> 
            <Button onClick={handleSearch}> Search</Button>
        </Form>
      </div>
    </div>
  )
}

export default Submissions