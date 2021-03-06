import React, { Component } from "react";
import axios from "axios";
import messagesArr from "./../data/targetedMessages.json";
import ButtonPinkFixed from "./../components/ButtonPinkFixed";
import "./ClassDetail.scss";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

export class ClassDetail extends Component {
  state = {
    classType: "",
    instructorName: "",
    profilepic: "",
    duration: "",
    scheduled: "",
    targetedMessage: "",
    comments: [],
    commentTimeDiffs: [],
    commentToolIsOn: false,
    commentBody: "",
    commentId: "",
    crudMode: "",
    fakerClass: true,
  };

  render() {
    return (
      <div className="scroll-container-detail">
      {/* -----------------Faker class ----------------------------------------- */}
      {this.state.fakerClass ? (
          <div className="faker-class">
            <img src="/img/home-yoga.jpg" alt="classtime"/>
          </div>
        ) : null
        }
        <Link className="close-x" to={"/classes"}>
          <img src="/img/clsx.svg" alt="close-panel" />
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
              </form>
            </div>
          </div>
        )}
        {/*-------Body of the Class Details Summary ----------------------------------------------------------*/}
        <h2 className="pink-h2">
          {this.humanizeDayMini(new Date(this.state.scheduled).getDay())},{" "}
          {this.addZeroBefore(new Date(this.state.scheduled).getDate())}
          <br />
          {this.addZeroBefore(new Date(this.state.scheduled).getHours())}:
          {this.addZeroBefore(new Date(this.state.scheduled).getMinutes())}h
        </h2>

        <div className="portrait-container">
          <img
            src={this.state.profilepic}
            alt="portrait"
            className="portrait"
          />
        </div>
        <h2 className="duration-and-type">
          {`${this.state.duration} min ${this.state.classType}`}{" "}
        </h2>
        <p className="small-caps">{this.state.instructorName} </p>
        <div style={{ height: "40px" }}></div>

        <p className="medium-text">{this.state.targetedMessage} </p>
        <br></br>
        <br></br>
        {/* ------List of Comments --------------------------------------------------------------- */}
        <div >
          {this.state.comments.map((oneComment, i) => (
            <div
              className="small-comment"
              key={oneComment._id}
              style={{ color: "#333" }}
            >
              <div className="comment-card">
                <div className="profile-pic">
                  <img src={oneComment.author.profilepic} alt="profile"></img>
                </div>
                <div>
                  <Link to={`/comment/${oneComment._id}`}>
                    <p style={{ color: "#333", fontWeight: "bold" }}>
                      {oneComment.author.username} |{" "}
                      {this.state.commentTimeDiffs[i]}
                    </p>
                    <p>{oneComment.commentBody}</p>
                    <p className="pinklink">view x replies</p>
                    <br />
                  </Link>
                  {/*------Edit and delete buttons (avail. only for 'me')--------------*/}
                  {this.props.user._id === oneComment.author._id ? (
                    <div>
                      <button
                        className="actions" // pencil
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
                      <button
                        className="actions" // x for deleting
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
                      <div style={{ height: "40px" }}></div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          
        </div>

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
        <div style={{ height: "240px" }}></div>
        <div className="bg"></div>
      </div>
    );
  }
  componentDidMount() {
    this.getClassDetails();
    this.loadTargetedMessage();
    this.startFakerClass();
  }
  startFakerClass = () => {
    setTimeout(()=>{this.setState({fakerClass: false})}, 4000)
  }
  getClassDetails = () => {
    const { class_id } = this.props.match.params;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/classes/${class_id}`)
      .then((apiResponse) => {
        const theClass = apiResponse.data;
        const { classType, duration, scheduled } = theClass;
        const instructorName = theClass.instructor.username;
        const profilepic = theClass.instructor.profilepic;
        const comments = theClass.comments.reverse();

        this.setState({
          classType,
          instructorName,
          profilepic,
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
  addZeroBefore = (n) => {
    return (n < 10 ? "0" : "") + n;
  };

  humanizeDay = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "XXX";
    }
  };
  humanizeDayMini = (day) => {
    switch (day) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "XXX";
    }
  };
  humanizeMonth = (month) => {
    switch (month) {
      case 0:
        return "Jan.";
      case 1:
        return "Feb.";
      case 2:
        return "Mar.";
      case 3:
        return "Apr.";
      case 4:
        return "May.";
      case 5:
        return "Jun.";
      case 6:
        return "Jul.";
      case 7:
        return "Ago.";
      case 8:
        return "Sep.";
      case 9:
        return "Oct.";
      case 10:
        return "Nov.";
      case 11:
        return "Dec.";
      default:
        return "XXX";
    }
  };
}

export default withAuth(ClassDetail);
