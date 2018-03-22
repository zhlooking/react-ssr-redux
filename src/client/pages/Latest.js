import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions'
import PostList from './PostList';

class Latest extends React.Component {
  static initialAction() {
    return fetchPosts('https://www.v2ex.com/api/topics/latest.json')
  }

  componentDidMount() {
    if (!this.props.posts) {
      return this.props.dispatch(Latest.initialAction());
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

export default connect(mapStateToProps)(Latest);
