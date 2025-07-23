import { Routes } from '@angular/router';
import { adminGuard, applicantGuard, authenticatedGuard, recruiterGuard } from './core/guards';
import { authenticationGuard } from './core/guards/AuthenticationGuard/authentication-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/public-layout/public-layout'),
        canActivate: [authenticatedGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/job-board/pages/job-board'),
                canActivate: [authenticatedGuard]
            },
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/pages/login/login'),
                canActivate: [authenticatedGuard]
            },
            {
                path: 'login/forgot-password',
                loadComponent: () => import('./features/auth/forgot-password/pages/send-email/send-email'),
                canActivate: [authenticatedGuard]
            },
            {
                path: 'oauth2/success',
                loadComponent: () => import('./features/auth/login/pages/oauth2/oauth2')
            },
            {
                path: 'register',
                loadComponent: () => import('./features/auth/register/pages/sign-up'),
                canActivate: [authenticatedGuard],
            }
        ]
    },

    {
        path: 'admin',
        loadComponent: () => import('./layouts/admin-layout/admin-layout'),
        canActivate: [authenticationGuard, adminGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/admin/pages/home-page/home-page'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./shared/profile/profile'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'users',
                loadComponent: () => import('./features/admin/pages/show-users/show-users'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'companies',
                loadComponent: () => import('./features/admin/pages/manage-companies/manage-companies'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },

    {
        path: 'recruiter',
        loadComponent: () => import('./layouts/recruiter-layout/recuiter-layout'),
        canActivate: [authenticationGuard, recruiterGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/recruiters/pages/home-page/home-page'),
                canActivate: [authenticationGuard, recruiterGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./shared/profile/profile'),
                canActivate: [authenticationGuard, recruiterGuard]
            },
            {
                path: 'candidates',
                loadComponent: () => import('./features/recruiters/pages/candidates/candidates'),
                canActivate: [authenticationGuard, recruiterGuard]
            },
            {
                path: 'post-jobs',
                loadComponent: () => import('./features/recruiters/pages/create-jobs/create-jobs'),
                canActivate: [authenticationGuard, recruiterGuard]
            },
            {
                path: 'post-jobs/:id',
                loadComponent: () => import('./features/recruiters/pages/create-jobs/create-jobs'),
                canActivate: [authenticationGuard, recruiterGuard],
            },
            {
                path: 'manage-jobs',
                loadComponent: () => import('./features/recruiters/pages/manage-jobs/manage-jobs'),
                canActivate: [authenticationGuard, recruiterGuard]
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },

    {
        path: 'applicant',
        loadComponent: () => import('./layouts/applicant-layout/applicant-layout'),
        canActivate: [authenticationGuard, applicantGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/applicants/pages/home-page/home-page'),
                canActivate: [authenticationGuard, applicantGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./shared/profile/profile'),
                canActivate: [authenticationGuard, applicantGuard]
            },
            {
                path: 'jobs',
                loadComponent: () => import('./features/applicants/pages/jobs/jobs'),
                canActivate: [authenticationGuard, applicantGuard]
            },
            {
                path: 'my-jobs',
                loadComponent: () => import('./features/applicants/pages/my-jobs/my-jobs'),
                canActivate: [authenticationGuard, applicantGuard],
                children: [
                    {
                        path: 'applied',
                        loadComponent: () => import('./features/applicants/pages/jobs-applied/jobs-applied'),
                        canActivate: [authenticationGuard, applicantGuard]
                    },
                    {
                        path: 'in-progress',
                        loadComponent: () => import('./features/applicants/pages/in-progress-jobs/in-progress-jobs'),
                        canActivate: [authenticationGuard, applicantGuard]
                    },
                    {
                        path: '**',
                        redirectTo: 'applied',
                        pathMatch: 'full'
                    },
                ]
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }
];
