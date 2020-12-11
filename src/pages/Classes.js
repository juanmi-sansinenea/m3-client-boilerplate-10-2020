import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import axios from 'axios';



export class Classes extends Component {
    state = {
        classesArr : []
    }
    render() {
        const { classesArr } = this.state;
        return (
            <div>
                {classesArr.map((
            oneClass //   <-- ADD
          ) => (
            <div key={oneClass._id} className="oneClass">
              {/* <Link to={`/classes/${oneClass._id}`}> */}
                <h3>{oneClass.classType}</h3>
                <p>{oneClass.duration} </p>
              {/* </Link> */}
            </div>
          ))}
            </div>
        )
    }
    componentDidMount() {
        this.getAllClasses();
    }
    getAllClasses = () => {
        axios.get("http://localhost:5000/api/classes").then((apiResponse) => {
          this.setState({ classesArr: apiResponse.data });
        });
      };
}

export default withAuth (Classes)
