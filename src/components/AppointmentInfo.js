import {Button, ListGroup} from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";


const AppointmentInfo = ({appointment, onDeleteAppointment}) =>{
    return (
        <>
             <ListGroup.Item>
                        <p><strong>Date : </strong>{appointment.aptDate}</p>
                        <p><strong>First Name : </strong> {appointment.firstName} </p>
                        <p><strong>First Name : </strong> {appointment.lastName} </p>
                        <p><strong>Notes: </strong>{appointment.aptNotes}</p>
                        <Button onClick={() => onDeleteAppointment(appointment.id)} size="sm" variant="danger" className="d-flex align-items-center me-2"> <MdDeleteForever /> Delete</Button>
             </ListGroup.Item>
        </>
    )
}
export default AppointmentInfo;