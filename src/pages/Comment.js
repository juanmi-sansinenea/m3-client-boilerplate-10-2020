import React, { Component } from "react";
import axios from "axios";
import ButtonPinkFixed from "./../components/ButtonPinkFixed";

export class Comment extends Component {
  state = {
    commentBody: "",
    author: "",
    replies: [],
    updated_at: "",
    replyToolIsOn: false,
  };
  render() {
    return (
      <div>
        {this.state.commentBody}
        <ButtonPinkFixed
          text="Reply"
          handelClick={() => {
            this.setState({ replyToolIsOpen: true });
          }}
        ></ButtonPinkFixed>
      </div>
    );
  }
  componentDidMount() {
    this.getCommentDetails();
  }
  getCommentDetails = () => {
    const { comment_id } = this.props.match.params;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/comments/${comment_id}`)
      .then((apiResponse) => {
        const theComment = apiResponse.data;
        const { commentBody, author, updated_at } = theComment;
        const replies = theComment.replies.reverse();
        this.setState({
          commentBody,
          author,
          replies,
          updated_at,
        });
        this.fillCommentTimeDiffs();
      })
      .catch((err) => console.log(err));
  };
}
export default Comment;
