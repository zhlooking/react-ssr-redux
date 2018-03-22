import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions'
import { Link } from "react-router-dom";
import PostList from './PostList';


class HotPosts extends React.Component {
  static initialAction() {
    return fetchPosts('https://www.v2ex.com/api/topics/hot.json')
  }

  componentDidMount() {
    if (!this.props.posts) {
      this.props.dispatch(HotPosts.initialAction());
    }
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <p>
          <Link to="/latest">Latest</Link>
        </p>
        <PostList posts={posts} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(HotPosts);
