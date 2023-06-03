import React,{useState} from 'react'

export default function Blog() {

    const[title,setTitle]=useState('');
    const[content,setContent]=useState('');
    const[blogs,setBlogs]=useState([]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setBlogs([{title,content},...blogs]);
        setTitle('');
        setContent('');
    }
    
    return (
        <>
        <h1>Write A Blog!</h1>
        <div className='section'>
            <form onSubmit={handleSubmit}>
                {/* Row component to create a row for first input field */}
                <Row label='Title'>
                    <input className='input' placeholder="Enter the Title of the Blog here.." value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </Row>
                {/* Row component to create a row for Text area field */}
                <Row label='Content'>
                    <textarea className='input content' placeholder="Content of the Blog goes here.." value={content} onChange={(e)=>setContent(e.target.value)}/>
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

