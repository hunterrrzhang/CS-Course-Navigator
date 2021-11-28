import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Badge } from "react-bootstrap";
import './CourseCardInner.css'

const CourseCardInner = (props) => {
       console.log("Call back function: ")
       console.log(props.handleShowCourseModalInner)

       return (
              <Button variant="outline-dark" className="modalButton"  id={props.index} onClick={() => props.handleShowCourseModalInner(props.classid)}>
                     {props.classid}{/*: {props.courseList[classid].name*/}
              </Button> 
          );

}

export default CourseCardInner