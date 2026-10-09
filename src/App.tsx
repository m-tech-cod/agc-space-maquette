import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppShell } from '@/components/shell/app-shell'
import { AssistantPage } from '@/pages/assistant/assistant-page'
import { PresencePage } from '@/pages/presence/presence-page'
import { PublicationPage } from '@/pages/publication/publication-page'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/presence" replace />} />
          <Route path="/presence" element={<PresencePage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/publication" element={<PublicationPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
