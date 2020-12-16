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
    commentId: "",
    crudMode: "",
  };
  render() {
    return (
      <div>
        <Link className="close-x" to={"/classes"}>
          X
        </Link>
        {/*--------------------Open Comment tool Modal---------------------------------*/}
        {this.state.commentToolIsOn && (
          <div className="comment-tool">
            <p>Comment here</p>
            <div
              className="close-x"
              onClick={() => {
                this.setState({ commentToolIsOn: false });
                console.log(this.state.crudMode);
              }}
            >
              X
            </div>
            {/*------------------------------------ */}
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
        {/*-------Body of the Class Details Summary ----------------------------------------------------------*/}

        <p>{this.state.classType} </p>
        <p>{this.state.instructorName} </p>
        <p>{this.state.duration} </p>
        <p>{this.state.scheduled} </p>

        <p>{this.state.targetedMessage} </p>
        <br></br>
        <br></br>
        {/* ------Listo of Comments --------------------------------------------------------------- */}
        {this.state.comments.map((oneComment, i) => (
          <div key={oneComment._id}>
            <Link to={`/comment/${oneComment._id}`}>
              <p>
                {oneComment.author.username} | {this.state.commentTimeDiffs[i]}
              </p>
              <p>{oneComment.commentBody}</p>
              <p>view x replies</p>
              <br />
            </Link>
            {/*------Edit and delete buttons (avail. only for 'me')--------------*/}
            {this.props.user._id === oneComment.author._id ? (
              <div>
                <button // pencil
                  onClick={() => {
                    this.setState({
                      crudMode: "U", //UPDATE
                      commentBody: oneComment.commentBody,
                      commentId: oneComment._id,
                      commentToolIsOn: true,
                    });
                  }}
                >
                  <img src="/img/edit.svg" alt="edit" />
                </button>
                <button // x for deleting
                  onClick={() => {
                    // DELETE
                    axios
                      .delete(
                        `${process.env.REACT_APP_API_URL}/api/comments/${oneComment._id}`,
                        { withCredentials: true }
                      )
                      .then(() => {
                        this.getClassDetails(); // refresh the state with new data from the DB
                      })
                      .catch((error) => console.log(error));
                  }}
                >
                  <img src="/img/delete.svg" alt="delete" />
                </button>
              </div>
            ) : null}
          </div>
        ))}

        <ButtonPinkFixed
          text="Add comment"
          handleClick={() => {
            this.setState({
              crudMode: "C",
              commentBody: "",
              commentToolIsOn: true,
            });
          }}
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

  msToTime = (duration) => {
    var //milliseconds = parseInt((duration % 1000) / 100),
      //seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor(duration / (1000 * 60 * 60 * 24));

    //hours = hours < 10 ? "0" + hours : hours;
    //minutes = minutes < 10 ? "0" + minutes : minutes;
    //seconds = seconds < 10 ? "0" + seconds : seconds;

    let print = "";
    if (days === 0 && hours === 0 && minutes === 0) {
      print = `just now`;
    } else {
      if (days !== 0) {
        days = days + "d ";
      } else {
        days = "";
      }
      if (hours !== 0) {
        hours = hours + "h ";
      } else {
        hours = "";
      }
      if (minutes !== 0) {
        minutes = minutes + "m ";
      } else {
        minutes = "";
      }
      print = `${days}${hours}${minutes}`;
    }

    return print;
  };
  fillCommentTimeDiffs = () => {
    const timeDiffs = this.state.comments.map((oneComment) => {
      const now = new Date();
      const dateComment = new Date(oneComment.updated_at);
      const difference = now - dateComment;
      const niceDifference = this.msToTime(difference);
      return niceDifference;
    });
    this.setState({ commentTimeDiffs: timeDiffs });
  };
  loadTargetedMessage = () => {
    const rand = Math.floor(Math.random() * Math.floor(messagesArr.length));
    const messageToShow = messagesArr[rand];
    this.setState({ targetedMessage: messageToShow });
  };

  /*--------COMMENT TOOL FUNCTIONS ---------------------------------*/
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  //--------> CREATA: POST -----------
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { commentBody } = this.state;
    const classId = this.props.match.params.class_id;

    // in case CRUD MODE is Create
    if (this.state.crudMode === "C") {
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
    }

    //in case CRUD MODE is Edit
    if (this.state.crudMode === "U") {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/comments/${this.state.commentId}`,
          {
            commentBody,
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
    }
  };
}

export default withAuth(ClassDetail);
