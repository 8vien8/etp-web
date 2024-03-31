import { Card, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'
import '../../utils/style/cardStyle.css'
const Dashboard = () => {
  return (
    <div>
      <h1>Coordinator</h1>
      <div className="dashboard-content">
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
              Academic year
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

export default Dashboard