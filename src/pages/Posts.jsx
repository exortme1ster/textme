import React, {useState, useEffect} from 'react';
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter';
import MyModal from '../components/ UI/MyModal/MyModal';
import MyButton from '../components/ UI/button/MyButton';
import {usePosts} from '../hooks/usePosts'
import PostService from '../API/PostService';
import '../styles/App.css';
import Loader from '../components/ UI/Loader/Loader';
import {useFetching}  from '../hooks/useFetching'
import {getPageCount, getPagesArray} from '../components/utils/pages'

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  let pagesArray = getPagesArray(totalPages)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count']);
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts();
  }, [page])

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  return ( 
    <div className="App">
      <MyButton onClick={() => setModal(true)} style={{marginTop: 30, marginBottom: 10}}>
        Создать объявление
      </MyButton>
      <MyModal visible = {modal} setVisible = {setModal}>
       <PostForm create={createPost}/>
      </MyModal>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      {postError && 
        <h1>Произошла ошибка! ${postError}</h1>}
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
        : <PostList remove={removePost} posts = {sortedAndSearchedPosts} title="Посты про nstkdl"/>  
      }
      <div className="page__wrapper">
        {pagesArray.map(p =>  
          <span 
            key ={p} 
            className={page === p ? 'page page__current' : 'page'}
            onClick={() => setPage(p)}
            >{p}</span>
        )}
      </div>

    </div>
  );
}

export default Posts;
