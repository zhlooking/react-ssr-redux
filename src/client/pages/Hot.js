import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions'
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

    return <PostList posts={posts} />
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(HotPosts);
