import "./Main.css";
import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Badge } from "react-bootstrap";
import CourseCard from "./Components/CourseCard";
import FilterGroup from "./Components/FilterGroup";
import CourseModal from "./Components/CourseModal";

const Main = () => {
    const [isLoaded, setIsLoaded] = useState(false); //whether it is the first time the page is loaded, if yes, need to set up searchResult as all courses
    const [searchString, updateSearchString] = useState(""); // the string of the input box
    const [filter, updateFilter] = useState([]); // the filter of the users, it is a list of lists [[tagType, tagName]]

    const [matchedCourses, updateMatchedCourses] = useState([]); // courses that are matched with the filter and the search String

    // course modal controls
    const [showCourseModal, setShowCourseModel] = useState(false);
    const [modalCourseID, setModalCourseID] = useState("");

    // Run only for the first time
    useEffect(() => {
        if (!isLoaded) {
            setIsLoaded(true);
            updateMatchedCourses(Object.keys(courseList));
        }
    }, []);

    // Run everytime the searchString or the filter has been updated
    useEffect(() => {
        // console.log("hi");  
        updateResult();
    }, [searchString, filter]);

    // Runs everytime we have to update the search result because either or both the filter or the search string changes
    useEffect(() => {
        // console.log("matched items: ");
        // console.log(matchedCourses);
    }, [matchedCourses]);

    const handleCloseCourseModal = () => setShowCourseModel(false);
    const handleShowCourseModal = (id) => {
        setModalCourseID(id);
        setShowCourseModel(true);
    };


    const onSearchChange = (e) => {
        console.log(e.target.value);
        updateSearchString(e.target.value);
    };

    const updateResult = () => {
        let matched = [];
        // 1. filter by tags
        Object.values(courseList).forEach((course) => {
            let found = true;
            for (let i = 0; i < filter.length; i++) {
                let tagType = filter[i][0];
                let tagName = filter[i][1];
                // console.log(tagType);
                // console.log(tagName);

                if (
                    !(tagType in course.tags) ||
                    (tagType in course.tags &&
                        !course.tags[tagType].includes(tagName))
                ) {
                    found = false;
                    break;
                }
            }
            if (found) {
                matched.push(course.id);
            }
        });
        // console.log("matched by filter: " + matched);

        // 2. filter by search String
        let finalMatched = [];
        for (let i = 0; i < matched.length; i++) {
            // console.log("hii");
            let course = courseList[matched[i]]["id"] + courseList[matched[i]]["name"] + courseList[matched[i]]["courseInfo"].description;
            let courseJSON = JSON.stringify(course).toLowerCase();
            // console.log(courseJSON)
            if (courseJSON.includes(searchString.toLowerCase())) {
                // console.log("found!!");
                finalMatched.push(matched[i]);
            }
        }

        // For each object, we stringify it and search string with that
        updateMatchedCourses(finalMatched);
    };

    return (
        <div>
            {
                courseList[modalCourseID] ?
                    <CourseModal modalStyle={{backgroundColor: "rgba(0,0,0,0.4)"}}
                                modalCourseID={modalCourseID} courseList={courseList} setModalCourseID={setModalCourseID}
                                showCourseModal={showCourseModal} handleCloseCourseModal={handleCloseCourseModal} setShowCourseModel={setShowCourseModel}/> :""
            }
            <div className="page">
                {/*This contains the whole page, it is a vertically aligned thingy*/}
                <div className="body">
                    <div className="searchArea">
                        <input autoFocus className="inputArea" id="inputBox" placeholder="Search Courses" onChange={onSearchChange}/>
                        <div className="filterArea">
                            <div className="filterBox">
                                {Object.keys(tags).map((tagType, groupId) => (
                                    <FilterGroup filterGroupId={groupId} tagType={tagType} tags={tags} tagNames={tagNames}
                                                filter={filter} updateFilter={updateFilter}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="resultArea">
                        <p className='h3'>Courses</p>
                        <p>{matchedCourses.length} result(s)</p>
                        <div className="resultBox">
                            {matchedCourses.map((classid, index) => {
                                if (courseList[classid]) {
                                    // somehow you need to check if it is null, which is pretty weird, but
                                    return (
                                        <CourseCard index={index} handleShowCourseModal={handleShowCourseModal} classid={classid} courseList={courseList}></CourseCard>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

let course1 = {
    id: "COMP_SCI 211",
    name: "Fundamentals of Computer Programming II",
    courseInfo: {
        description:
            "COMP_SCI 211 teaches foundational software design skills at a small-to-medium scale.",
        prerequisites: ["COMP_SCI 213"],
        sequenceCourses: ["COMP_SCI 213"],
        relatedCourses: ["COMP_SCI 213"],
    },       
    schedule: "Fall : 3:30-4:50 TuTh St-Amour\nWinter : 3:30-4:50 TuTh Dimoulas\nSpring : 12:30-1:50 TuTh St-Amour\n",

    tags: {
        careerTag: ["software engineering", "web development"],
        topicTag: ["software"],
        sequenceTag: ["core sequence"],
        requirementTag: ["core courses"],
        quarterTag: ['Fall', 'Spring'],
    },

};
let course2 = {
    id: "COMP_SCI 213",
    name: "Intro to Computer Systems",
    courseInfo: {
        description: "We learn about computer systems",
        prerequisites: ["COMP_SCI 211",],
        sequenceCourses: ["COMP_SCI 211"],
        relatedCourses: ["COMP_SCI 376", 'COMP_SCI 377'],
    },
    tags: {
        careerTag: ["software engineering", "research"],
        topicTag: ["systems"],
        sequenceTag: ["core sequence"],  
        quarterTag: ['Fall', 'Winter', 'Spring']
    },
};

let course3 = {
    id: "COMP_SCI 396",
    name: "Creative Applications with Machine Learning",
    courseInfo: {
        description: "Computers have been generating images, music, stories, and poetry since the 1950s. With machine learning, computers are even more powerful creative tools. But how do we move beyond push-button-get-art to involve ML systems in our creative practices?  In this class you will use a range of modern ML systems to create new art, learn how to understand and diagram an ML architecture you read about online, and create a few small ML projects of your own.  No previous ML experience, Python or Javascript needed: we will use many tools that you have never seen before and will learn as we go.",
        prerequisites: ["COMP_SCI 211", "COMP_SCI 213"],
        sequenceCourses: ["COMP_SCI 211"],
        relatedCourses: ["COMP_SCI 213"],
    },
    tags: {
        careerTag: ["software engineering", "research"],
        topicTag: ["AI & machine learning"],
        sequenceTag: [],  
        quarterTag: ['Fall']
    },
};

let course4 = {
    id: "COMP_SCI 376",
    name: "Game Design and Development: Intro to Computer Systems",
    courseInfo: {
        description: "Fundamental concepts of software for computer games and other simulation-based media.  Topics will include game design (selecting rules, resources, and player objectives), 2D and 3D game programming, representation of space, physics and collision detection, 3D animation engines, and performance engineering issues for real-time rendering. ",
        prerequisites: ["COMP_SCI 213"],
        sequenceCourses: ["COMP_SCI 377"],
        relatedCourses: ["COMP_SCI 211", "COMP_SCI 377"],
    },
    tags: {
        careerTag: ["software engineering", "research"],
        topicTag: ["game development"],
        sequenceTag: ["game development sequence"],   
        quarterTag: ['Fall']
    },
};

let course5 = {
    id: "COMP_SCI 377",
    name: "Game Development Studio",
    courseInfo: {
        description: "In this course, students will design and develop games using the Unity game engine, with focus on team-based projects and agile development practices. Lectures will cover game design theory, game architecture and implementation, and the business of game development. Students will participate in class discussion and evaluation of projects in progress, to develop their skills in iterative design and implementation.",
        prerequisites: ["COMP_SCI 214", "COMP_SCI 376"],
        sequenceCourses: ["COMP_SCI 376"],
        relatedCourses: ["COMP_SCI 211", "COMP_SCI 376"],
    },
    tags: {
        careerTag: ["software engineering", "research"],
        topicTag: ["game development"],
        sequenceTag: ["game development sequence"], 
        quarterTag: ['Winter']       
    },
};

let courseList = { "COMP_SCI 211": course1, "COMP_SCI 213": course2, "COMP_SCI 396": course3, "COMP_SCI 376": course4, "COMP_SCI 377": course5};

let tags = {
    quarterTag: ['Fall', 'Winter', 'Spring'],
    topicTag: ["systems", "software", "game development",'AI & machine learning'],
    careerTag: ["software engineering", "research", "web development"],
    sequenceTag: ["core sequence", "game development sequence"],
    requirementTag: ["core courses"],
};

let tagNames = {
    careerTag: "Career Area",
    topicTag: 'Topic',
    sequenceTag: 'Sequence',
    requirementTag: 'Requirement',
    quarterTag: 'Quarter Offered (2021-22)',
}

let sequences = {
    "game design": ["COMP_SCI 211", "COMP_SCI 213"],
};


export default Main;


// return (
//     <Card id={index} style={{ width: "18rem" }} onClick={() => handleShowCourseModal(classid)} role="button">
//         <Card.Body>
//             <Card.Title>{classid}</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">
//                 {
//                     courseList[String(classid)][
//                         "name"
//                     ]
//                 }
//             </Card.Subtitle>
//         </Card.Body>
//     </Card>
// );
