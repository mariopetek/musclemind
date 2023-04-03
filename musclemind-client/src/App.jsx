import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome'

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome /> } />
      </Routes>
    </BrowserRouter>
  )
}
