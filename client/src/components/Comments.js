import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import hebrewLocale from 'moment/locale/he';

import orangeProfile from '../images/comments/comments-orange.png';
import blueProfile from '../images/comments/comments-blue.png';
import greenProfile from '../images/comments/comments-green.png';
import { loadMoreComments, getCommentsCount, createNewComment } from '../actions/comment';

const Comments = ({ currentComments, commentsCount, loadMoreComments, getCommentsCount, createNewComment }) => {
  // Limit & Skip for fetching comments
  const limit = 3;
  const [skip, setSkip] = useState(0);

  // New comment
  const [isNewComment, setIsNewComment] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  // DISABLED USE EFFECT FOR TESTING - RETURN AFTERWARDS

  useEffect(() => {
    getCommentsCount();
    loadMoreComments(skip, limit);
    setSkip(skip + limit);
  }, []);

  const loadMore = () => {
    setSkip(skip + limit);
    loadMoreComments(skip, limit);
  };

  const currentImageToShow = (index) => {
    if (index % limit === 0) return <img src={orangeProfile}></img>;
    else if (index % limit === 1) return <img src={blueProfile}></img>;
    else if (index % limit === 2) return <img src={greenProfile}></img>;
  };

  const handleCreateComment = (e) => {
    e.preventDefault();

    if (!name || !email || !content) {
      return alert('תוכן חסר');
    }

    if (!/\S+@\S+\.\S+/.test(email)) return alert('שגיאה: המייל שהוזן שגוי');

    const newComment = {
      name,
      email,
      content,
      reviewScore: rating,
      date: new Date(Date.now()),
    };

    createNewComment(newComment);
  };

  return (
    <Wrapper>
      <section className='comments-section' id='comments'>
        {/* Comments */}
        <div className='comments-container direction-rtl'>
          <div className='comments-top '>
            <h2>קצת ממה שמספרים</h2>
            <div className='comments-summary'>
              <ReactStars count={5} size={24} color='#ffd700' edit={false} isHalf={true} />
              <h3>(5.0)</h3>
            </div>
            <p className='direction-rtl'>מתוך {commentsCount.count} חוות דעת</p>
          </div>

          {currentComments.map((item, index) => {
            return (
              <div className='single-comment' key={item._id}>
                {currentImageToShow(index)}
                <div className='comment-info'>
                  <div className='comment-title'>
                    <h3 className='text-right'>{item.name}</h3>
                    <ReactStars count={item.reviewScore} size={16} color='#ffd700' edit={false} isHalf={true} />
                  </div>
                  <span className='text-right'>
                    <Moment utc format='פורסם בתאריך DD/MM/YYYY'>
                      {item.date}
                    </Moment>
                  </span>
                  <p className='text-right'>{item.content}</p>
                </div>
              </div>
            );
          })}

          <div className='comments-buttons'>
            <button className='btn' onClick={() => loadMore()}>
              טען עוד ביקורות
            </button>
            <button className='btn' onClick={() => setIsNewComment(!isNewComment)}>
              צור ביקורת חדשה
            </button>
          </div>

          {/* New comment */}
          {isNewComment && (
            <section className='new-comment'>
              <h2>צור ביקורת חדשה</h2>
              <form>
                {/* Name */}
                <div className='form-group'>
                  <label htmlFor='name'>שם</label>
                  <input type='text' name='name' id='name' value={name} placeholder='שם המשתתף' onChange={(e) => setName(e.target.value)} />
                </div>
                {/* Email */}
                <div className='form-group'>
                  <label htmlFor='email'>אימייל</label>
                  <input type='email' name='email' id='email' value={email} placeholder='אימייל המשתתף' onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* Review */}
                <div className='form-group'>
                  <label htmlFor='review'>דירוג</label>
                  <ReactStars count={5} value={rating} size={24} edit={true} isHalf={false} onChange={(newValue) => setRating(newValue)} />
                  <p></p>
                </div>
                {/* Content */}
                <div className='form-group'>
                  <label htmlFor='content'>תוכן</label>
                  <textarea
                    className='content-text-area'
                    name='content'
                    id='content'
                    value={content}
                    placeholder='שתפו את חווייתכם מהסדנה..'
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                {/* Submit button */}
                <button className='btn submit-comment-btn' onClick={(e) => handleCreateComment(e)}>
                  אישור
                </button>
              </form>
            </section>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .comments-section {
    /* padding: 2rem 0; */
    text-align: center;
  }

  .comments-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.8rem;
  }

  .comments-summary {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .comments-container {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    /* background: #fef9f5; */
    align-items: center;
  }

  .comments-container img {
    width: 4rem;
    height: 4rem;
  }

  .single-comment {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1rem 1.5rem;
    background: #fff;
    box-shadow: 0px 0px 7px #c9c9c9;
    border-radius: 10px;
    margin-bottom: 2rem;
    width: 75vw;
  }

  .single-comment .comment-info {
    display: flex;
    flex-direction: column;
  }

  .single-comment .comment-info .comment-title {
    display: flex;
    gap: 0.7rem;
  }

  .single-comment .comment-info > span {
    font-size: 0.85rem;
    color: #333;
  }

  /* Buttons */

  .btn {
    /* Overriding existing .btn (in App.css) proprty */
    padding: 0.7rem;
  }

  .comments-buttons {
    display: flex;
    gap: 1rem;
  }

  /* New Comment */

  .new-comment {
    margin-top: 2rem;
    background: #fff;
    box-shadow: 0px 1px 4px #777;
    padding: 1rem 1rem;
    border-radius: 10px;
    display: inline-block;
    direction: rtl;
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
    padding: 0 1rem;
    gap: 1rem;
  }

  .form-group label {
    width: 20%;
  }

  .form-group input {
    text-align: center;
    width: 80%;
    border-radius: 5px;
    padding: 0.2rem 0;
    border: 1px solid #333;
  }

  .form-group .content-text-area {
    width: 80%;
    height: 6rem;
    padding: 0.5rem;
    font-family: 'Open Sans', sans-serif;
    border-radius: 5px;
    border: 1px solid #333;
    resize: none;
  }

  /* Utilities */

  .direction-rtl {
    direction: rtl;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .submit-comment-btn {
    margin-top: 1.5rem;
    padding: 0.5rem;
    background-color: #555;
  }

  @media only screen and (max-width: 768px) {
    .comments-section {
      padding: 2rem 0;
    }

    .comments-container {
      padding: 2rem;
    }

    .comments-container img {
      width: 3.2rem;
      height: 3.2rem;
    }

    .single-comment {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 1rem;
      width: 100%;
    }

    .single-comment .comment-info {
      align-items: center;
    }

    .single-comment .comment-info .comment-title {
      flex-direction: column;
      gap: 0;
      align-items: center;
    }

    .single-comment .comment-info .comment-title > h3 {
      font-size: 1rem;
    }

    .single-comment .comment-info > p {
      text-align: center;
      font-size: 0.9rem;
    }

    .single-comment .comment-info > span {
      text-align: center;
      margin-top: 0.4rem;
      font-size: 0.8rem;
    }
  }
`;

Comments.propTypes = {
  currentComments: PropTypes.array.isRequired,
  commentsCount: PropTypes.object.isRequired,

  loadMoreComments: PropTypes.func.isRequired,
  getCommentsCount: PropTypes.func.isRequired,
  createNewComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentComments: state.comment.currentComments,
  commentsCount: state.comment.commentsCount,
});

export default connect(mapStateToProps, { loadMoreComments, getCommentsCount, createNewComment })(Comments);
