import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }, 
  {
    path: 'recruiter/post-jobs/:id',
    renderMode: RenderMode.Server
  }
];
