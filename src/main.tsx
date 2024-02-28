import React from 'react'
import ReactDOM from 'react-dom/client'
import SearchRepos from './routes/SearchRepos.tsx'
import RepoInformation from './routes/RepoInformation.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchRepos />} />
        <Route
          path="/repo/:username/:projectName"
          element={<RepoInformation />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
