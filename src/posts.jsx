import React,{useState,useEffect} from 'react';

//props suoraan nimellä eikä props.huomio
const Posts = () => {

    //componentin tilan määritys
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(oliot => setPosts(oliot))
    },[])

    return (
    <>
        <h2>Posts from typicode</h2>
        {

        posts && posts.map(p => 
            <div className='posts' key={p.id}>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
                <h6>user id: {p.userId} post id: {p.id}</h6>
            </div>
            )
        }
    </>
    
    );
}

export default Posts;
