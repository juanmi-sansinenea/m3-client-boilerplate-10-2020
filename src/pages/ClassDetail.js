import React, { Component } from "react";
import axios from "axios";
import messagesArr from "./../data/targetedMessages.json";
import ButtonPinkFixed from "./../components/ButtonPinkFixed";
import "./ClassDetail.css";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

export class ClassDetail extends Component {
  state = {
    classType: "",
    instructorName: "",
    duration: "",
    scheduled: "",
    targetedMessage: "",
    comments: [],
    commentTimeDiffs: [],
    commentToolIsOn: false,
    commentBody: "",
  };
  render() {
    return (
      <div>
        <Link className="close-x" to={"/classes"}>
          X
        </Link>
        {/*--------------------Comment tool---------------------------------*/}
        {this.state.commentToolIsOn && (
          <div className="comment-tool">
            <h2>Comment here</h2>
            <div
              className="close-x"
              onClick={() => {
                this.setState({ commentToolIsOn: false });
              }}
            >
              X
            </div>
            {/*-------------------------------------------- */}
            <div>
              <div className="profile-pic"></div>
              <form>
                <textarea
                  className="text-area"
                  type="text"
                  placeholder="Post your comment here"
                  name="commentBody"
                  value={this.state.commentBody}
                  onChange={this.handleChange}
                ></textarea>

                <button onClick={this.handleFormSubmit}>Post comment</button>

                {/* <ButtonPinkFixed
                  text="Post comment"
                  handleClick={this.handleFormSubmit}
                /> */}
              </form>
            </div>
          </div>
        )}
        {/*-------Body of the Class Details ------------------------------------*/}

        <p>{this.state.classType} </p>
        <p>{this.state.instructorName} </p>
        <p>{this.state.duration} </p>
        <p>{this.state.scheduled} </p>

        <p>{this.state.targetedMessage} </p>
        {/* ------Listo of Comments -------------------- */}
        {this.state.comments.map((oneComment) => (
          <div key={oneComment._id}>
            <p>
              {oneComment.author.username}
              {oneComment.updated_at}
            </p>
            <p>{oneComment.commentBody}</p>
          </div>
        ))}

        <ButtonPinkFixed
          text="Add comment"
          handleClick={this.openCommentTool}
        />
      </div>
    );
  }
  componentDidMount() {
    this.getClassDetails();
    this.loadTargetedMessage();
  }
  getClassDetails = () => {
    const { class_id } = this.props.match.params;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/classes/${class_id}`)
      .then((apiResponse) => {
        const theClass = apiResponse.data;
        const { classType, duration, scheduled } = theClass;
        const instructorName = theClass.instructor.username;
        const comments = theClass.comments.reverse();

        this.setState({
          classType,
          instructorName,
          duration,
          scheduled,
          comments,
        });
        this.fillCommentTimeDiffs();
      })
      .catch((err) => console.log(err));
  };
formatDate =(date)=> {
    var d = new Date(date),
        minutes = '' + (d.getMinutes()),
        hours = '' + (d.getHours()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day, hours, minutes].join('-');
}
  fillCommentTimeDiffs = () => {
    const timeDiffs = this.state.comments.map((oneComment) => {
      let formattedDateNow = this.formatDate(new Date());
      let formattedDateComment = this.formatDate(oneComment.updated_at);
      console.log((formattedDateNow), typeof formattedDateNow)
      console.log((formattedDateComment), typeof formattedDateComment)
      

      return (formattedDateNow-formattedDateComment);
    });
    console.log('timeDiffs :>> ', timeDiffs);
  };
  loadTargetedMessage = () => {
    const rand = Math.floor(Math.random() * Math.floor(messagesArr.length));
    const messageToShow = messagesArr[rand];
    this.setState({ targetedMessage: messageToShow });
  };
  openCommentTool = () => {
    this.setState({
      commentToolIsOn: true,
    });
  };
  /*--------COMMENT TOOL FUNCTIONS ---------------------------------*/
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { commentBody } = this.state;
    const classId = this.props.match.params.class_id;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/comments`,
        {
          commentBody,
          classId,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.getClassDetails(); // refresh the state with new data from the DB
        this.setState({
          commentBody: "",
          commentToolIsOn: false,
        });
      })
      .catch((error) => console.log(error));
  };
}

export default withAuth(ClassDetail);
