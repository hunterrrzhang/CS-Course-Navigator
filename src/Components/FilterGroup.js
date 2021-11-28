import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Badge } from "react-bootstrap";
import './FilterGroup.css';
import {isInArray, indexOfArray} from "../functions";

const FilterGroup = (props) => {

       const onFilterChange = (e) => {
              // console.log(JSON.parse(e.target.value))
              console.log("filter changed: ")
              console.log(e.target)
              let value = JSON.parse(e.target.value);
      
              // Check if this filter item has already been clicked
              if (isInArray(value, props.filter)) {
                  // console.log("already a filter, so delete")
                  // console.log("index is: ")
                  // console.log(indexOfArray(value, filter))
      
                  // removing the element found
                  let index_found = indexOfArray(value, props.filter);
                  if (index_found != -1) {
                      let newFilter = props.filter;
                    //   console.log("Deleting");
                      newFilter.splice(index_found, 1);
                      props.updateFilter([...newFilter]);
                  }
              } else {
                  props.updateFilter([...props.filter, ...[value]]);
              }
          };

       console.log("GroupId:")
       console.log(props.filterGroupId)

       return (
            <Form className='filterGroup' key={props.filterGroupId}>
                            <Form.Label className="h6">{props.tagNames[props.tagType]}</Form.Label>
                            {props.tags[props.tagType].map((tagName, id) => (
                                <div key={`default-${id}`} className="mb-3" onClick={onFilterChange}>
                                    <Form.Check className='formCheckBox' style={{cursor: 'pointer'}} type={"checkbox"}
                                        id={`${props.filterGroupId}-${id}`} label={tagName} 
                                        value={JSON.stringify([props.tagType, tagName,])}/>
                                        
                                </div>
                            ))}
                {/* </Form.Group> */}
            </Form>
       );

}


export default FilterGroup