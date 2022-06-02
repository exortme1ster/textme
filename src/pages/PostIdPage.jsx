import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom' 
import PostService from '../API/PostService';
import MyButton from '../components/ UI/button/MyButton';
import Loader from '../components/ UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import '../styles/App.css'

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [likesId, setLikesId] = useState([]);
  const [dislikesId, setDislikesId] = useState([]);

  const [fetchPostsById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })

  const [fetchComments, isCommentLoading, commentError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(params.id)
    console.log(response.data)
    setComments(response.data)
  })

  const checkLike = (id) => {
    if(likesId.includes(id)) {
      setLikesId(likesId.filter(like => like !== id))
    } else {
      if(!dislikesId.includes(id)) {
        setLikesId([...likesId, id])
      } else {
        setLikesId([...likesId, id])
        setDislikesId(dislikesId.filter(dislike => dislike !== id))
      }
    }
  }

  const checkDislike = (id) => {
    if(dislikesId.includes(id)) {
      setDislikesId(dislikesId.filter(dislike => dislike !== id))
    } else {
      if(!likesId.includes(id)) {
        setDislikesId([...dislikesId, id])
      } else {
        setLikesId(likesId.filter(like => like !== id))
        setDislikesId([...dislikesId, id])

      }
    }
  }

  // const createComment = (comment) => {
    
  // }
  

  useEffect(() => {
     fetchPostsById()
     fetchComments()
  }, [])

  
  return (
    <div className="postIdTop">
      <div>
        <h1 style={{marginBottom: 35}}>
        👋🏻 Пост #{params.id}
        </h1>
      </div>
      {isLoading 
      ?  <Loader />
      : <div> {post.title} </div>
      }
      <h1 style={{marginTop: 50}}>
        📃 Комментарии 
      </h1>
{/* 
      <MyInput style={{marginTop: 25, width: 400, marginBottom: 15}} placeholder="Напиши комментарий..."></MyInput>
      <MyButton>Добавить</MyButton> */}

      {isCommentLoading
      ? <Loader /> 
      : <div className="commentSection">
          {comments.map(comment => 
            <div className="comment" key={comment.id}>
              <div style ={{marginRight: 25, marginTop: 15, color: 'teal'}}>
                <h1>{comment.id}.</h1>
              </div>  
              <div>
                <h5>{comment.email}</h5>
                <div style={{marginTop: 2}}>{comment.body}</div>
                <div className="likesSection">
                  {likesId.includes(comment.id) && !dislikesId.includes(comment.id)
                  ? <MyButton onClick={() => checkLike(comment.id)} style={{backgroundColor: 'teal'}}>👍🏻</MyButton>
                  : <MyButton onClick={() => checkLike(comment.id)}>👍🏻</MyButton>
                  }
                  
                  {dislikesId.includes(comment.id) && !likesId.includes(comment.id)
                  ? <MyButton onClick={() => checkDislike(comment.id)} style={{backgroundColor: 'teal'}}>👎🏻</MyButton>
                  : <MyButton onClick={() => checkDislike(comment.id)}>👎🏻</MyButton>
                  }
                </div>
              </div> 
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default PostIdPage 
