import React, { useState, useRef, useEffect, useReducer } from 'react';
import { db } from '../firebaseInit';
import { doc, setDoc, collection, addDoc, getDocs, deleteDoc, onSnapshot } from "firebase/firestore";


// function blogsReducer(state,action){
//     switch(action.type){
//         case 'ADD':
//             return [action.blog,...state];
//         case 'Delete':
//             return state.filter((blog,index)=> index!==action.index);
//         default:
//             return [];        
//     }
// }

export default function Blog() {

    // const[title,setTitle]=useState('');
    // const[content,setContent]=useState('');
    const [formData, setFormData] = useState({ title: '', content: '' })
    const [blogs, setBlogs] = useState([]);
    // const[editBlogs,setEditBlogs]=useState({title:'',content:''});
    const [search, setSearch] = useState('');
    // const[darkMode,setDarkMode]=useState(false);
    // const[blogs,dispatch]=useReducer(blogsReducer,[]);
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus()
    }, []);

    useEffect(() => {
        if (blogs.length && blogs[0].title) {
            document.title = blogs[0].title;
        } else {
            document.title = 'No Blogs!'
        }
    }, [blogs]);

    useEffect(() => {
        // async function fetchData() {
        //     const snapShot = await getDocs(collection(db, "blogs"));
        //     console.log(snapShot);
        //     const blogs = snapShot.docs.map((doc) => {
        //         return {
        //             id: doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     console.log(blogs);
        //     setBlogs(blogs);
        // }
        // fetchData();
        //get real times update..
        const unsub = onSnapshot(collection(db, 'blogs'), (snapShot) => {
            const blogs = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            // console.log(blogs);
            setBlogs(blogs);
        })
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
        // dispatch({type:'ADD',blog:{title:formData.title,content:formData.content}});
        // setTitle('');
        // setContent('');
        //using firebase
        const docRef = collection(db, "blogs");
        await addDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        });
        setFormData({ title: '', content: '' });
        titleRef.current.focus();
    }
    const handleDelete = async (id) => {
        // let restBlog = blogs.filter((blog, i) => i !== id);
        // setBlogs(restBlog);
        const docRef = doc(db, "blogs", id);
        await deleteDoc(docRef);
        // dispatch({type:'Delete',index:index})
    }
    const handleEdit = async(index,id) => {
        // Get the blog at the specified index
        const blogToEdit = blogs[index];
        // Set the formData state with the values of the blog to populate the form
        setFormData({ title: blogToEdit.title, content: blogToEdit.content });
        // Remove the blog from the blogs array
        const updatedBlogs = [...blogs];
        updatedBlogs.splice(index, 1);
        setBlogs(updatedBlogs);
    }
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h1>Write A Blog!</h1>
            <div className="search">
                <input className="input" type="text" placeholder="Search from wishList...." onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='section'>
                <form onSubmit={handleSubmit}>
                    {/* Row component to create a row for first input field */}
                    <Row label='Title'>
                        <input className='input' placeholder="Enter the Title of the Blog here.." value={formData.title} ref={titleRef} onChange={(e) => setFormData({ title: e.target.value, content: formData.content })} />
                    </Row>
                    {/* Row component to create a row for Text area field */}
                    <Row label='Content'>
                        <textarea className='input content' placeholder="Content of the Blog goes here.." required value={formData.content} onChange={(e) => setFormData({ title: formData.title, content: e.target.value })} />
                    </Row>
                    <button className="btn">ADD</button>
                </form>
            </div>
            <hr />
            <h2>Blogs</h2>
            {filteredBlogs.map((blog, index) => (
                <div className='blog' key={index}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <div className='blog-btn'>
                        <button className='btn edit' onClick={() => handleEdit(index,blog.id)}>Edit</button>
                        <button className='btn remove' onClick={() => handleDelete(blog.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}

