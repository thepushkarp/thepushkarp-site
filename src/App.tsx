import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import AiLogPage from '@/pages/AiLogPage';
import BlogListPage from '@/pages/BlogListPage';
import BlogPostPage from '@/pages/BlogPostPage';
import EtymologyPage from '@/pages/EtymologyPage';
import HomePage from '@/pages/HomePage';
import MiscPage from '@/pages/MiscPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProjectsPage from '@/pages/ProjectsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/misc" element={<MiscPage />} />
        <Route path="/etymology" element={<EtymologyPage />} />
        <Route path="/ai-log" element={<AiLogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
