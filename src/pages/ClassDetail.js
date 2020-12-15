import React, { Component } from "react";
import axios from "axios";
import messagesArr from "./../data/targetedMessages.json";
import ButtonPinkFixed from "./../components/ButtonPinkFixed";
import "./ClassDetail.css";
import { Link } from "react-router-dom";

export class ClassDetail extends Component {
  state = {
    classType: "",
    instructorName: "",
    duration: "",
    scheduled: "",
    targetedMessage: "",
    comments: [],
    commmentBodies: [],
    commentToolIsOn: false,
    commentBody: [],
  };
  render() {
    return (
      <div>
        {/*--------------------Comment tool---------------------------------*/}
        {this.state.commentToolIsOn && (
          <div className="comment-tool">
            <h2>Comment here</h2>
            <div
              className="close-x"
              onClick={() => {
                // reset state
                // close tool
                this.setState({ commentToolIsOn: false });
              }}
            >
              X
            </div>

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

                <ButtonPinkFixed
                  text="Post comment"
                  handleClick={this.handleFormSubmit}
                />
              </form>
            </div>
          </div>
        )}
        {/*-----------------End of Comment tool---------------------------------*/}

        <Link className="close-x" to={"/classes"}>
          X
        </Link>

        <p>{this.state.classType} </p>
        <p>{this.state.instructorName} </p>
        <p>{this.state.duration} </p>
        <p>{this.state.scheduled} </p>

        <p>{this.state.targetedMessage} </p>

        {this.state.comments.map((oneComment) => (
          <p key={oneComment._id}>{oneComment.commentBody}</p>
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
        const { classType, duration, scheduled, comments } = theClass;
        const instructorName = theClass.instructor.username;

        
        
        console.log('comments :>> ', comments);

        this.setState({
          classType,
          instructorName,
          duration,
          scheduled,
          comments,
        });
      })
      .catch((err) => console.log(err));
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
  /*--------COMMENT TOOL-----------------------------------*/
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { commentBody } = this.state;
    const { class_id } = this.props.match.params;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/comments`,
        {
          commentBody,
          class_id,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({
          commentBody: "",
          commentToolIsOn: false,
        });
      })
      .catch((error) => console.log(error));
  };
}

export default ClassDetail;
