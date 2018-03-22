import React from 'react';
import './post.css'

export default ({ posts }) => {
  return (
    <div className="app-container">
      <div>
        {posts.map(post =>
          <div className="post-container" key={post.id}>
            <div className="post-title">
              {post.title}
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content_rendered }} />
          </div>
        )}
      </div>
    </div>
  )
}
