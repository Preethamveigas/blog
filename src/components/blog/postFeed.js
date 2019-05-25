import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PostItem from "./postItem";
import ErrorBoundry from "../ErrorBoundry/errorBoundry";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    if (posts === null) {
      return false;
    }

    return posts.map(post => {
      return (
        <ErrorBoundry key={post._id}>
          <PostItem key={post._id} post={post} />;
        </ErrorBoundry>
      );
    });
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
