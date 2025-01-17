import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import EditBlogPost from './pages/EditBlogPost'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/edit/:id" element={<EditBlogPost />} />
      </Routes>
    </>
  )
}

export default App
