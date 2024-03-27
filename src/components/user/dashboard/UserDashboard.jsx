import { Card, CardBody, CardTitle, CardSubtitle, Button, Input } from 'reactstrap'
import './dashboardStyle.css'
function UserDashboard() {
  return (
    <div className='user-dashboard-container'>
      <div className='user-dashboard-search'>
        <box-icon name='search-alt-2'/>
        <Input type='search' placeholder='Search courses here... '/>
      </div>
      <div className='user-dashboard-content' >
        <Card style={{ width: '18%' }}>
          <img
            alt="Sample"
            src="https://picsum.photos/300/200"
            style={{ width: '100%' }}
          />
          <CardBody className='articles-container'>
            <CardTitle tag="h2">
              Courses name
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h3"
            >
              Article name
            </CardSubtitle>
            <Button>
              Detail 
              <box-icon name='link-external'></box-icon>
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>

  )
}

export default UserDashboard