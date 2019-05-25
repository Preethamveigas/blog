import React from "react";
import headerStyle from "../../assets/jss/material-kit-react/components/blog/blogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import PostFeed from "./postFeed";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import ErrorBoundry from "../ErrorBoundry/errorBoundry";
import {
  getPosts,
  checkCommentService,
  checkLikeService
} from "../../actions/postActions";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";

class Posts extends React.Component {
  componentDidMount() {
    // check for user auth
    console.log(Object.keys(this.props.token.user).length);
    if (Object.keys(this.props.token.user).length > 1) {
      this.props.loginUser("1");
    }

    // get all the posts
    this.props.getPosts();

    //check server status - comment
    this.props.checkCommentService();

    //check server status - like
    this.props.checkLikeService();
  }

  render() {
    // if there is no post or not fetched yet
    // load spinner else load the post
    const { classes, post } = this.props;
    const { posts, loading } = post;
    console.log(posts);
    let checkd = false;
    let postContents;

    if (posts === null && loading) {
      postContents = <Spinner />;
    } else if (typeof posts === "object" && Object.keys(posts).length === 0) {
      console.log(typeof posts);

      postContents = <Spinner />;
    } else {
      console.log(Object.keys(posts).length);
      console.log(posts);
      checkd = true;
      postContents = (
        <CardBody>
          <ErrorBoundry>
            <PostFeed posts={posts} />
          </ErrorBoundry>
        </CardBody>
      );
    }
    return (
      <ErrorBoundry>
        <Card className={classes.container}>
          <PostForm />
          {postContents}
        </Card>
      </ErrorBoundry>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  token: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, checkLikeService, checkCommentService, loginUser }
)(withStyles(headerStyle)(Posts));
