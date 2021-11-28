import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Badge } from "react-bootstrap";
import './CourseCard.css'

const CourseCard = (props) => {
       // console.log("Card size")
       // console.log(props)


       return (
              <Card className='mainCard' id={props.index} onClick={() => props.handleShowCourseModal(props.classid)} role="button">
                  <Card.Body>
                     <Card.Title className='cardTitle'>{props.classid}</Card.Title>
                     <Card.Subtitle className="mb-2 text-muted cardSubtitle">{props.courseList[String(props.classid)]["name"]}</Card.Subtitle>
                  </Card.Body>
              </Card>
          );

}

export default CourseCard