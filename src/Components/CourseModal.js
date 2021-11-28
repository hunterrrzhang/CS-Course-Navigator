import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Badge, Container, Row, Column} from "react-bootstrap";
import CourseCardInner from "./CourseCardInner";
// import CourseCard from "./CourseCard";
import './CourseModal.css'

const CourseModal = (props) => {

       // Other courses in sequence
       let sequenceCourses = []
       

       // control modal within the main modal
       const [showCourseModalInner, setShowCourseModelInner] = useState(false);
       const [modalCourseIDInner, setModalCourseIDInner] = useState("");
       const handleCloseCourseModalInner = () => setShowCourseModelInner(false);
       const handleShowCourseModalInner = (id) => {
              setModalCourseIDInner(id);
              setShowCourseModelInner(true);
       }; 

       // console.log(props)
       return (
              <div>
              {props.courseList[modalCourseIDInner] ?
              <div className='innerModal'>
              <CourseModal  modalStyle={{backgroundColor: "rgba(0,0,0,0)"}}
                            modalCourseID={modalCourseIDInner} courseList={props.courseList} setModalCourseID={setModalCourseIDInner}
                            showCourseModal={showCourseModalInner} handleCloseCourseModal={handleCloseCourseModalInner} setShowCourseModel={setShowCourseModelInner}></CourseModal>
              </div>:""
              }
              {/* size="lg" className='modalStyle'  */}
              <Modal animation={false} scrollable className="modalCard" style={props.modalStyle} show={props.showCourseModal} onHide={props.handleCloseCourseModal}>
                     <Modal.Header closeButton>
                            <Modal.Title>{props.modalCourseID}: {props.courseList[props.modalCourseID].name}</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                            <div className='quarters'>
                                   <p className="h5">Quarter Offered</p>
                                   <p>{props.courseList[props.modalCourseID].schedule}</p>
                            </div>
                            <div className='prerequisites'>
                                   <p className="h5">Prerequisites</p>
                                   {
                                          props.courseList[props.modalCourseID].courseInfo.prerequisites.map((classid, index) => {
                                          if (props.courseList[classid]) {
                                                 // somehow you need to check if it is null, which is pretty weird, but
                                                 return (
                                                        // <Button variant="outline-dark" className="modalButton"  id={index} onClick={() => handleShowCourseModalInner(classid)}>
                                                        //        {classid}{/*: {props.courseList[classid].name*/}
                                                        // </Button>
                                                        <CourseCardInner index={index} handleShowCourseModalInner={handleShowCourseModalInner} classid={classid} courseList={props.courseList}></CourseCardInner>
                                                 )
                                          }
                                   })}
                            </div>                           
                            <div className='description'>
                                   <p className="h5">Description</p>
                                   <p>{props.courseList[props.modalCourseID].courseInfo.description}</p>
                            </div>

                            <div className='sequenceCourses'>
                                   <p className="h5">Other Courses in Sequence</p>
                                   {
                                          props.courseList[props.modalCourseID].courseInfo.sequenceCourses.map((classid, index) => {
                                          if (props.courseList[classid]) {
                                                 // somehow you need to check if it is null, which is pretty weird, but
                                                 return (
                                                        // <Button variant="outline-dark" className="modalButton"  id={index} onClick={() => handleShowCourseModalInner(classid)}>
                                                        //        {classid}{/*: {props.courseList[classid].name*/}
                                                        // </Button>
                                                        <CourseCardInner index={index} handleShowCourseModalInner={handleShowCourseModalInner} classid={classid} courseList={props.courseList}></CourseCardInner>
                                                 )
                                          }
                                   })}
                            </div>

                            <div className='relatedCourses'>
                                   <p className="h5">Related Courses</p>
                                   {
                                          props.courseList[props.modalCourseID].courseInfo.relatedCourses.map((classid, index) => {
                                          if (props.courseList[classid]) {
                                                 // somehow you need to check if it is null, which is pretty weird, but
                                                 return (
                                                        // <Button variant="outline-dark" className="modalButton"  id={index} onClick={() => handleShowCourseModalInner(classid)}>
                                                        //        {classid}{/*: {props.courseList[classid].name*/}
                                                        // </Button>
                                                        <CourseCardInner index={index} handleShowCourseModalInner={handleShowCourseModalInner} classid={classid} courseList={props.courseList}></CourseCardInner>
                                                 )
                                          }
                                   })}
                            </div>

                            <div className='tags'>
                                   {
                                          Object.values(props.courseList[props.modalCourseID].tags).map((tagList, index) => (
                                                 tagList.map((tagName) => (
                                                 <Badge bg="secondary" style={{ margin: "0.5%" }}>{tagName}</Badge>
                                                 ))
                                          ))
                                   }
                            </div>
                     </Modal.Body>
                     <Modal.Footer>
                     <Button variant="secondary" onClick={props.handleCloseCourseModal}>
                            Back
                     </Button>
                     {/* <Button variant="primary" onClick={props.handleCloseCourseModal}>
                            Save Changes
                     </Button> */}
                     </Modal.Footer>
              </Modal>
              </div>
       );

}

export default CourseModal;