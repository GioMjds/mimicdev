import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import EditBlogPost from './pages/EditBlogPost'
import Navbar from './layout/Navbar'
import CreateBlogPost from './pages/CreateBlogPost'

function App() {
  return (
    <div className='mx-auto min-h-screen p-6'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/create" element={<CreateBlogPost />} />
        <Route path="/edit/:id" element={<EditBlogPost />} />
      </Routes>
    </div>
  )
}

export default App
