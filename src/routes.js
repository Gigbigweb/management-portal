// import { Navigate, useRoutes } from 'react-router-dom';
// // layouts
// import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
// //
// import BlogPage from './pages/BlogPage';
// import UserPage from './pages/UserPage';
// import LoginPage from './pages/LoginPage';
// import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
// import DashboardAppPage from './pages/DashboardAppPage'; 
// import User from './pages/UserPage';
// import Client from './pages/ClientPage';
// import Package from './pages/Package';
// import AddNewPackage from './pages/AddNewPackage';
// import UpdatePackage from './pages/EditPackage';
// import CategoryPage from './pages/CategoryPage';
// import StaffPage from './pages/StaffPage';
// import RolePage from './pages/RolePage';
// import ServicePage from './pages/ServicePage';
// import AddNewService from './pages/AddNewService';
// import RunningProjectPage from './pages/RunningProjectPage';
// import WithoutTeamProjectPage from './pages/WithoutTeamProjectPage';
// import MakeTeamPage from './pages/MakeTeamPage';
// import TeamTestAdd from './pages/TeamTestAdd';
// import ProjectViewPage from './pages/ProjectView';
// import CompleteProjectPage from './pages/CompleteProjectPage';
// import UpdateProjectPage from './pages/UpdateProjectPage';
// import AddNewStaff from './pages/AddNewStaff';
// import RatingPage from './pages/RatingPage';
// import UpdateServicePage from './pages/UpdateServicePage';
// import AddBlog from './pages/AddBlog';
// import UpdateBlog from './pages/Updateblog';
// import StaffUpdateprofile from './pages/StaffUpdateprofile';
// import ViewStaffsingle from './pages/ViewStaffsingle';
// import ServiceView from './pages/ServiceView';
// import ClientView from './pages/ClientView';
// import ProjectChat from './pages/ProjectChat';
// import Freelancers from './pages/Freelancers';
// import FreelancersView from './pages/FreelancersView';
// import SubCategory from './pages/SubCategory';
// import IconsFormat from './pages/IconsFormat';
// import Coupon from './pages/Coupon';
// import RefundProjects from './pages/RefundProjects';
// import EditTeamPage from './pages/EditTeamPage';
// import HelpSupport from './pages/HelpSupport';
// import AdminSettings from './pages/AdminSettings';
// import ComboServices from './pages/ComboServices';
// import BulkMailing from './pages/BulkMailing';
// import EmailBuilderImages from './pages/EmailBuilderImages';
// import Permissions from './pages/Permissions';

// // ----------------------------------------------------------------------

// export default function Router() {
//   const routes = useRoutes([
//     {
//       path: '/Management',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to="/Management/app" />, index: true },
//         { path: 'app', element: <DashboardAppPage /> },
//         // { path: 'user', element: <UserPage /> },

//         { path: 'user', element: <User/>},
//         { path: 'client', element: <Client/>}, 
//         { path: 'Freelancers', element: <Freelancers/>}, 
//         { path: 'view-Freelancer/:id', element: <FreelancersView/>}, 
//         { path: 'client-view/:id', element: <ClientView/>}, 
//         { path: 'projectchat', element: <ProjectChat/>}, 
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'package', element: <Package/> },
//         { path: 'update-package/:id', element: <UpdatePackage/> },
//         { path: 'add-new-package', element: <AddNewPackage/> },
//         { path: 'blog', element: <BlogPage /> },
//         { path: 'category', element: <CategoryPage/> },
//         { path: 'subCategory', element: <SubCategory/> },
//         { path: 'staff', element: <StaffPage/> },
//         { path: 'role', element: <RolePage/> },
//         { path: 'service', element: <ServicePage/> },
//         { path: 'ComboServices', element: <ComboServices/> },
//         { path: 'coupon', element: <Coupon/> },
//         { path: 'iconsformat', element: <IconsFormat/> },
//         { path: 'add-new-service', element: <AddNewService/> },
//         { path: 'running-project', element: <RunningProjectPage/> },
//         { path: 'new-project', element: <WithoutTeamProjectPage/> },
//         { path: 'refund-project', element: <RefundProjects/> },
//         { path: 'make-team/:projectId', element: <MakeTeamPage/> },
//         { path: 'edit-team/:projectId', element: <EditTeamPage/> },
//         // { path: 'team-test', element: <TeamTestAdd/> },
//         { path: 'project/:projectId', element: <ProjectViewPage/> },
//         { path: 'complete-project', element: <CompleteProjectPage/> }, 
//         { path: 'update-project/:projectId', element: <UpdateProjectPage/> },
//         { path: 'update-service/:serviceId', element: <UpdateServicePage/> },
//         { path: 'view-service/:serviceId', element: <ServiceView/> },
//         { path: 'add-new-staff', element: <AddNewStaff/> },
//         { path: 'viewstaff/:id', element: <ViewStaffsingle/> },
//         { path: 'update-staff/:id', element: <StaffUpdateprofile/> },
//         { path: 'rating', element: <RatingPage/> },
//         { path: 'blog', element: <BlogPage/> },
//         { path: 'add-blog', element: <AddBlog/> },
//         { path: 'update-blog/:blogId', element: <UpdateBlog/> },
//         { path: 'blog-view', element: <RatingPage/> },
//         { path: 'Help-Support', element: <HelpSupport/> },
//         { path: 'Admin-Settings', element: <AdminSettings/> },
//         { path: 'BulkMailing', element: <BulkMailing/> },
//         { path: 'EmailBuilderImages', element: <EmailBuilderImages/> },
//         { path: 'Permissions', element: <Permissions/> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       element: <SimpleLayout />,
//       children: [
//         { element: <Navigate to="/Management/app" />, index: true },
//         { path: '404', element: <Page404 /> },
//         { path: '*', element: <Navigate to="/404" /> },
//       ],
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }






























import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage'; 
import User from './pages/UserPage';
import Client from './pages/ClientPage';
import Package from './pages/Package';
import AddNewPackage from './pages/AddNewPackage';
import UpdatePackage from './pages/EditPackage';
import CategoryPage from './pages/CategoryPage';
import StaffPage from './pages/StaffPage';
import RolePage from './pages/RolePage';
import ServicePage from './pages/ServicePage';
import AddNewService from './pages/AddNewService';
import RunningProjectPage from './pages/RunningProjectPage';
import WithoutTeamProjectPage from './pages/WithoutTeamProjectPage';
import MakeTeamPage from './pages/MakeTeamPage';
import ProjectViewPage from './pages/ProjectView';
import CompleteProjectPage from './pages/CompleteProjectPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
import AddNewStaff from './pages/AddNewStaff';
import RatingPage from './pages/RatingPage';
import UpdateServicePage from './pages/UpdateServicePage';
import AddBlog from './pages/AddBlog';
import UpdateBlog from './pages/Updateblog';
import StaffUpdateprofile from './pages/StaffUpdateprofile';
import ViewStaffsingle from './pages/ViewStaffsingle';
import ServiceView from './pages/ServiceView';
import ClientView from './pages/ClientView';
import ProjectChat from './pages/ProjectChat';
import Freelancers from './pages/Freelancers';
import FreelancersView from './pages/FreelancersView';
import SubCategory from './pages/SubCategory';
import IconsFormat from './pages/IconsFormat';
import Coupon from './pages/Coupon';
import RefundProjects from './pages/RefundProjects';
import EditTeamPage from './pages/EditTeamPage';
import HelpSupport from './pages/HelpSupport';
import AdminSettings from './pages/AdminSettings';
import ComboServices from './pages/ComboServices';
import BulkMailing from './pages/BulkMailing';
import EmailBuilderImages from './pages/EmailBuilderImages';
import Permissions from './pages/Permissions';
import DashBoard from './pages/DashBoard';

export default function Router() {
  // ✅ localStorage se slug lo — default 'Management'
 const staff = JSON.parse(sessionStorage.getItem('management_staff') || '{}');
  const slug = staff?.slug || 'Management';

  const routes = useRoutes([
    {
      path: `/${slug}`,          // ✅ dynamic slug
      element: <DashboardLayout />,

      children: [
        { element: <Navigate to={`/${slug}/DashBoard`} />, index: true },
        { path: 'app',                    element: <DashboardAppPage /> },
        { path: 'user',                   element: <User /> },
        { path: 'client',                 element: <Client /> },
        { path: 'Freelancers',            element: <Freelancers /> },
        { path: 'view-Freelancer/:id',    element: <FreelancersView /> },
        { path: 'client-view/:id',        element: <ClientView /> },
        { path: 'projectchat',            element: <ProjectChat /> },
        { path: 'products',               element: <ProductsPage /> },
        { path: 'package',                element: <Package /> },
        { path: 'update-package/:id',     element: <UpdatePackage /> },
        { path: 'add-new-package',        element: <AddNewPackage /> },
        { path: 'blog',                   element: <BlogPage /> },
        { path: 'category',               element: <CategoryPage /> },
        { path: 'subCategory',            element: <SubCategory /> },
        { path: 'staff',                  element: <StaffPage /> },
        { path: 'role',                   element: <RolePage /> },
        { path: 'service',                element: <ServicePage /> },
        { path: 'ComboServices',          element: <ComboServices /> },
        { path: 'coupon',                 element: <Coupon /> },
        { path: 'iconsformat',            element: <IconsFormat /> },
        { path: 'add-new-service',        element: <AddNewService /> },
        { path: 'running-project',        element: <RunningProjectPage /> },
        { path: 'new-project',            element: <WithoutTeamProjectPage /> },
        { path: 'refund-project',         element: <RefundProjects /> },
        { path: 'make-team/:projectId',   element: <MakeTeamPage /> },
        { path: 'edit-team/:projectId',   element: <EditTeamPage /> },
        { path: 'project/:projectId',     element: <ProjectViewPage /> },
        { path: 'complete-project',       element: <CompleteProjectPage /> },
        { path: 'update-project/:projectId', element: <UpdateProjectPage /> },
        { path: 'update-service/:serviceId', element: <UpdateServicePage /> },
        { path: 'view-service/:serviceId',   element: <ServiceView /> },
        { path: 'add-new-staff',          element: <AddNewStaff /> },
        { path: 'viewstaff/:id',          element: <ViewStaffsingle /> },
        { path: 'update-staff/:id',       element: <StaffUpdateprofile /> },
        { path: 'rating',                 element: <RatingPage /> },
        { path: 'add-blog',               element: <AddBlog /> },
        { path: 'update-blog/:blogId',    element: <UpdateBlog /> },
        { path: 'blog-view',              element: <RatingPage /> },
        { path: 'Help-Support',           element: <HelpSupport /> },
        { path: 'Admin-Settings',         element: <AdminSettings /> },
        { path: 'BulkMailing',            element: <BulkMailing /> },
        { path: 'EmailBuilderImages',     element: <EmailBuilderImages /> },
        { path: 'Permissions',            element: <Permissions /> },
        { path: 'Add-Management',         element: <AddNewStaff /> },
        { path: 'DashBoard',         element: <DashBoard /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to={`/${slug}/app`} />, index: true },
        { element: <Navigate to={`/${slug}/DashBoard`} />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}