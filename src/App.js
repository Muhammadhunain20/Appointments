import 'bootstrap/dist/css/bootstrap.min.css'
import { BsCalendar2DateFill } from "react-icons/bs";
import { Container, Row, Col, ListGroup,Card } from 'react-bootstrap';
import Search from './components/Search'
import AddAppointment from './components/AddAppointment';
import AppointmentInfo from "./components/AppointmentInfo"
import { useCallback, useEffect, useState } from 'react';

function App() {

  let [appointmentList, SetAppointmentList] = useState([]);
  let [query, SetQuery] = useState("");
  let [sortBy , setSortBy] = useState("firstName")
  let [orderBy , setOrderBy] = useState("asc")
  
const filteredAppointments = appointmentList.filter(
  item => {
    return (
      item.firstName.toLowerCase().includes(query.toLowerCase()) || 
      item.lastName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase()) 
    )
  }
).sort((a,b) => {
  let order = (orderBy === "asc") ? 1 : -1;
  return (
    a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
  )  
})
const fetchData = useCallback(() => { 
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      SetAppointmentList(data) 
    })
  }, []);


useEffect(() => {
  fetchData()
},[fetchData])

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className='d-flex align-items-center justify-content-center'>
            <h1 className='text-center fw-light mt-3'><><BsCalendar2DateFill /></> Appointments</h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
            <AddAppointment 
            onSendAppointment ={myAppointment => SetAppointmentList([...appointmentList, myAppointment])}
            lastId = {appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0 )}/>
        </Row>
        <Row className='justify-content-center'>
          <Col md={4}>
            <Search
             query={query}
             onQueryChange={myQuery => SetQuery(myQuery)}
             orderBy ={orderBy}
             onOrderByChange = {mySort => setOrderBy(mySort) }
             sortBy={sortBy}
             onSortByChange = {mySort => setSortBy(mySort)} />
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col md={8}>
              <Card className="mb-3" >
                <Card.Header>Appointments</Card.Header>
                <ListGroup variant='flush'>
                    {filteredAppointments.map(appointment =>(
                      <AppointmentInfo key={appointment.id} appointment={appointment}
                      onDeleteAppointment = {
                        appointmentId => SetAppointmentList(appointmentList.filter(
                          appointment => appointment.id !== appointmentId
                        ))
                      } />
                    ))}
                </ListGroup>
              </Card>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
