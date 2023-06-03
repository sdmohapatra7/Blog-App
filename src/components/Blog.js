import React,{useState,useRef,useEffect} from 'react'

export default function Blog() {

    // const[title,setTitle]=useState('');
    // const[content,setContent]=useState('');
    const[formData,setFormData]=useState({title:'',content:''})
    const[blogs,setBlogs]=useState([]);
    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus()
    },[]);

    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = 'No Blogs!'
        }
    },[blogs]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        setBlogs([{title:formData.title,
                content:formData.content},...blogs]);
        // setTitle('');
        // setContent('');
        setFormData({title:'',content:''});
        titleRef.current.focus();
    }
    const handleDelete = (index)=>{
        let restBlog = blogs.filter((blog,i)=>i!==index);
        setBlogs(restBlog);
    }
    const handleEdit = ()=>{

    }
    
    return (
        <>
        <h1>Write A Blog!</h1>
        <div className='section'>
            <form onSubmit={handleSubmit}>
                {/* Row component to create a row for first input field */}
                <Row label='Title'>
                    <input className='input' placeholder="Enter the Title of the Blog here.." value={formData.title} ref={titleRef} onChange={(e)=>setFormData({title:e.target.value,content:formData.content})}/>
                </Row>
                {/* Row component to create a row for Text area field */}
                <Row label='Content'>
                    <textarea className='input content' placeholder="Content of the Blog goes here.." required value={formData.content} onChange={(e)=>setFormData({title:formData.title,content:e.target.value})}/>
                </Row>
                <button className = "btn">ADD</button>
            </form>
        </div>
        <hr />
        <h2>Blogs</h2>
        {blogs.map((blog,index)=>(
            <div className='blog' key={index}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <div className='blog-btn'>
                    <button className='btn edit' onClick={()=>handleEdit(index)}>Edit</button>
                    <button className='btn remove' onClick={()=>handleDelete(index)}>Delete</button>
                </div>
            </div>
        ))}
        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}

