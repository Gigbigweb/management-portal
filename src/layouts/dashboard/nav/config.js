
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
// import FiberNewIcon from '@mui/icons-material/FiberNew';
// import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import BadgeIcon from '@mui/icons-material/Badge';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import ChatIcon from '@mui/icons-material/Chat';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import CategoryIcon from '@mui/icons-material/Category';
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import StarRateIcon from '@mui/icons-material/StarRate';
// import ArticleIcon from '@mui/icons-material/Article';
// import AssignmentIcon from '@mui/icons-material/Assignment';        // Order Detail
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // New Projects
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; // Running Projects
// import TaskAltIcon from '@mui/icons-material/TaskAlt';              // Complete Projects
// import MoneyOffIcon from '@mui/icons-material/MoneyOff';            // Refund Project
// import GroupsIcon from '@mui/icons-material/Groups';                // Team
// import DesignServicesIcon from '@mui/icons-material/DesignServices'; // Services
// import BuildIcon from '@mui/icons-material/Build';                  // Package / Project
// import PaletteIcon from '@mui/icons-material/Palette';              // icons-format
// import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';        // HelpSupport

// // ----------------------------------------------------------------------

// const navConfig = [
//   {
//     title: 'dashboard',
//     path: '/Management/app',
//     icon: <DashboardIcon />,
//   },

//   // ✅ Order Detail dropdown
//   {
//     title: 'Order Detail',
//     icon: <AssignmentIcon />,           // 📋 Order/assignment feel
//     hasDropdown: true,
//     children: [
//       {
//         title: 'New Projects',
//         path: '/Management/new-project',
//         icon: <AddCircleOutlineIcon sx={{ width: 18, height: 18 }} />,   // ➕ Naya project
//       },
//       {
//         title: 'Running Projects',
//         path: '/Management/running-project',
//         icon: <PlayCircleOutlineIcon sx={{ width: 18, height: 18 }} />,  // ▶️ Chal raha hai
//       },
//       {
//         title: 'Complete Projects',
//         path: '/Management/complete-project',
//         icon: <TaskAltIcon sx={{ width: 18, height: 18 }} />,            // ✅ Mukammal
//       },
//       {
//         title: 'Refund Project',
//         path: '/Management/refund-project',
//         icon: <MoneyOffIcon sx={{ width: 18, height: 18 }} />,           // 💸 Refund
//       },
//     ],
//   },

//   // ✅ Team dropdown
//   {
//     title: 'Team',
//     icon: <GroupsIcon />,               // 👥 Team/group
//     hasDropdown: true,
//     children: [
//       {
//         title: 'staff',
//         path: '/Management/staff',
//         icon: <BadgeIcon />,            // 🪪 Staff badge
//       },
//       {
//         title: 'freelancers',
//         path: '/Management/Freelancers',
//         icon: <HandymanIcon />,         // 🔧 Kaam karne wala
//       },
//     ],
//   },

//   // ✅ Services dropdown
//   {
//     title: 'Services',
//     icon: <DesignServicesIcon />,       // 🎨 Services
//     hasDropdown: true,
//     children: [
//       {
//         title: 'category',
//         path: '/Management/category',
//         icon: <CategoryIcon />,         // 🗂️ Category
//       },
//       {
//         title: 'subcategory',
//         path: '/Management/subCategory',
//         icon: <AccountTreeIcon />,      // 🌲 Sub-tree structure
//       },
//       {
//         title: 'package',
//         path: '/Management/package',
//         icon: <Inventory2Icon />,       // 📦 Package/box
//       },
//       {
//         title: 'Project',
//         path: '/Management/service',
//         icon: <BuildIcon />,            // 🔨 Project build karna
//       },
//       {
//         title: 'combo services',
//         path: '/Management/ComboServices',
//         icon: <BuildIcon />,            // 🔨 Project build karna
//       },
//     ],
//   },

//   {
//     title: 'client',
//     path: '/Management/client',
//     icon: <PeopleAltIcon />,            // 👤 Clients/people
//   },
//   {
//     title: 'Chat',
//     path: '/Management/projectchat',
//     icon: <ChatIcon />,                 // 💬 Chat
//   },
//   {
//     title: 'Coupon',
//     path: '/Management/coupon',
//     icon: <LocalOfferIcon />,           // 🏷️ Coupon/tag
//   },
//   // {
//   //   title: 'icons-format',
//   //   path: '/dashboard/iconsformat',
//   //   icon: <PaletteIcon />,              // 🎨 Format/design
//   // },


// // icons format start

//  {
//     title: 'icons format',
//     icon: <DesignServicesIcon />,       // 🎨 Services
//     hasDropdown: true,
//     children: [
//       {
//     title: 'icons-format',
//     path: '/Management/iconsformat',
//     icon: <PaletteIcon />,              // 🎨 Format/design
//   },

//       {
//         title: 'bulk-email-images',
//         path: '/Management/EmailBuilderImages',
//         icon: <AccountTreeIcon />,      // 🌲 Sub-tree structure
//       },

//     ],
//   },
// // icons format end 



//   {
//     title: 'staff role',
//     path: '/dashboard/role',
//     icon: <AdminPanelSettingsIcon />,   // 🛡️ Admin/role settings
//   },
//   {
//     title: 'rating',
//     path: '/dashboard/rating',
//     icon: <StarRateIcon />,             // ⭐ Rating
//   },
//   {
//     title: 'blog',
//     path: '/dashboard/blog',
//     icon: <ArticleIcon />,              // 📰 Blog/article
//   },
//   {
//     title: 'HelpSupport',
//     path: '/dashboard/Help-Support',
//     icon: <HeadsetMicIcon />,           // 🎧 Help & Support
//   },
//   {
//     title: 'Bulk-Mailing',
//     path: '/dashboard/BulkMailing',
//     icon: <HeadsetMicIcon />,           // 🎧 Help & Support
//   },


// // management 

//   {
//     title: 'Mangament Settings',
//     icon: <GroupsIcon />,               // 👥 Team/group
//     hasDropdown: true,
//     children: [
//       {
//         title: 'Add staff',
//         path: '/dashboard/staff',
//         icon: <BadgeIcon />,            // 🪪 Staff badge
//       },
//       {
//         title: 'Permissions',
//         path: '/dashboard/Permissions',
//         icon: <HandymanIcon />,         // 🔧 Kaam karne wala
//       },
//     ],
//   },



// ];

// export default navConfig;



































// import DashboardIcon from '@mui/icons-material/Dashboard';
// import BadgeIcon from '@mui/icons-material/Badge';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import ChatIcon from '@mui/icons-material/Chat';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import CategoryIcon from '@mui/icons-material/Category';
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import StarRateIcon from '@mui/icons-material/StarRate';
// import ArticleIcon from '@mui/icons-material/Article';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import MoneyOffIcon from '@mui/icons-material/MoneyOff';
// import GroupsIcon from '@mui/icons-material/Groups';
// import DesignServicesIcon from '@mui/icons-material/DesignServices';
// import BuildIcon from '@mui/icons-material/Build';
// import PaletteIcon from '@mui/icons-material/Palette';
// import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

// const navConfig = [
//   {
//     title: 'dashboard',
//     path: '/Management/app',
//     icon: <DashboardIcon />,
//     permKey: 'dashboard',        // ✅
//   },
//   {
//     title: 'Order Detail',
//     icon: <AssignmentIcon />,
//     hasDropdown: true,
//     permKey: 'orderDetail',      // ✅
//     children: [
//       { title: 'New Projects',      path: '/Management/new-project',      icon: <AddCircleOutlineIcon sx={{ width: 18, height: 18 }} /> },
//       { title: 'Running Projects',  path: '/Management/running-project',  icon: <PlayCircleOutlineIcon sx={{ width: 18, height: 18 }} /> },
//       { title: 'Complete Projects', path: '/Management/complete-project', icon: <TaskAltIcon sx={{ width: 18, height: 18 }} /> },
//       { title: 'Refund Project',    path: '/Management/refund-project',   icon: <MoneyOffIcon sx={{ width: 18, height: 18 }} /> },
//     ],
//   },
//   {
//     title: 'Team',
//     icon: <GroupsIcon />,
//     hasDropdown: true,
//     permKey: 'team',             // ✅
//     children: [
//       { title: 'staff',       path: '/Management/staff',       icon: <BadgeIcon /> },
//       { title: 'freelancers', path: '/Management/Freelancers', icon: <HandymanIcon /> },
//     ],
//   },
//   {
//     title: 'Services',
//     icon: <DesignServicesIcon />,
//     hasDropdown: true,
//     permKey: 'services',         // ✅
//     children: [
//       { title: 'category',       path: '/Management/category',      icon: <CategoryIcon /> },
//       { title: 'subcategory',    path: '/Management/subCategory',   icon: <AccountTreeIcon /> },
//       { title: 'package',        path: '/Management/package',       icon: <Inventory2Icon /> },
//       { title: 'Project',        path: '/Management/service',       icon: <BuildIcon /> },
//       { title: 'combo services', path: '/Management/ComboServices', icon: <BuildIcon /> },
//     ],
//   },
//   {
//     title: 'client',
//     path: '/Management/client',
//     icon: <PeopleAltIcon />,
//     permKey: 'client',           // ✅
//   },
//   {
//     title: 'Chat',
//     path: '/Management/projectchat',
//     icon: <ChatIcon />,
//     permKey: 'chat',             // ✅
//   },
//   {
//     title: 'Coupon',
//     path: '/Management/coupon',
//     icon: <LocalOfferIcon />,
//     permKey: 'coupon',           // ✅
//   },
//   {
//     title: 'icons format',
//     icon: <DesignServicesIcon />,
//     hasDropdown: true,
//     permKey: 'iconsFormat',      // ✅
//     children: [
//       { title: 'icons-format',        path: '/Management/iconsformat',        icon: <PaletteIcon /> },
//       { title: 'bulk-email-images',   path: '/Management/EmailBuilderImages', icon: <AccountTreeIcon /> },
//     ],
//   },
//   {
//     title: 'staff role',
//     path: '/Management/role',
//     icon: <AdminPanelSettingsIcon />,
//     permKey: 'staffRole',        // ✅
//   },
//   {
//     title: 'rating',
//     path: '/Management/rating',
//     icon: <StarRateIcon />,
//     permKey: 'rating',           // ✅
//   },
//   {
//     title: 'blog',
//     path: '/Management/blog',
//     icon: <ArticleIcon />,
//     permKey: 'blog',             // ✅
//   },
//   {
//     title: 'HelpSupport',
//     path: '/Management/Help-Support',
//     icon: <HeadsetMicIcon />,
//     permKey: 'helpSupport',      // ✅
//   },
//   {
//     title: 'Bulk-Mailing',
//     path: '/Management/BulkMailing',
//     icon: <HeadsetMicIcon />,
//     permKey: 'bulkMailing',      // ✅
//   },
//   {
//     title: 'Management Settings',
//     icon: <GroupsIcon />,
//     hasDropdown: true,
//     permKey: 'managementSettings', // ✅
//     children: [
//       { title: 'Add staff',    path: '/Management/Add-Management', icon: <BadgeIcon /> },
//       { title: 'Permissions',  path: '/Management/Permissions',    icon: <HandymanIcon /> },
//     ],
//   },
// ];

// export default navConfig;














// import DashboardIcon from '@mui/icons-material/Dashboard';
// import BadgeIcon from '@mui/icons-material/Badge';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import ChatIcon from '@mui/icons-material/Chat';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import CategoryIcon from '@mui/icons-material/Category';
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import StarRateIcon from '@mui/icons-material/StarRate';
// import ArticleIcon from '@mui/icons-material/Article';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import MoneyOffIcon from '@mui/icons-material/MoneyOff';
// import GroupsIcon from '@mui/icons-material/Groups';
// import DesignServicesIcon from '@mui/icons-material/DesignServices';
// import BuildIcon from '@mui/icons-material/Build';
// import PaletteIcon from '@mui/icons-material/Palette';
// import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

// // ✅ Function banao — slug parameter lega
// const getNavConfig = (slug) => [
//   // {
//   //   title: 'dashboard',
//   //   path: `/${slug}/app`,
//   //   icon: <DashboardIcon />,
//   //   permKey: 'dashboard',
//   // },
//   {
//     title: 'DashBoard',
//     path: `/${slug}/DashBoard`,
//     icon: <DashboardIcon />,
//     permKey: 'dashboard',
//   },
//   {
//     title: 'Order Detail',
//     icon: <AssignmentIcon />,
//     hasDropdown: true,
//     permKey: 'orderDetail',
//     children: [
//       { title: 'New Projects',      path: `/${slug}/new-project`,      icon: <AddCircleOutlineIcon sx={{ width: 18, height: 18 }} />,  permChildKey: 'newProjects' },
//       { title: 'Running Projects',  path: `/${slug}/running-project`,  icon: <PlayCircleOutlineIcon sx={{ width: 18, height: 18 }} />, permChildKey: 'runningProjects' },
//       { title: 'Complete Projects', path: `/${slug}/complete-project`, icon: <TaskAltIcon sx={{ width: 18, height: 18 }} />,           permChildKey: 'completeProjects' },
//       { title: 'Refund Project',    path: `/${slug}/refund-project`,   icon: <MoneyOffIcon sx={{ width: 18, height: 18 }} />,          permChildKey: 'refundProject' },
//     ],
//   },
//   {
//     title: 'Team',
//     icon: <GroupsIcon />,
//     hasDropdown: true,
//     permKey: 'team',
//     children: [
//       { title: 'staff',       path: `/${slug}/staff`,       icon: <BadgeIcon />,    permChildKey: 'staff' },
//       { title: 'freelancers', path: `/${slug}/Freelancers`, icon: <HandymanIcon />, permChildKey: 'freelancers' },
//     ],
//   },
//   {
//     title: 'Services',
//     icon: <DesignServicesIcon />,
//     hasDropdown: true,
//     permKey: 'services',
//     children: [
//       { title: 'category',       path: `/${slug}/category`,      icon: <CategoryIcon />,    permChildKey: 'category' },
//       { title: 'subcategory',    path: `/${slug}/subCategory`,   icon: <AccountTreeIcon />, permChildKey: 'subcategory' },
//       { title: 'package',        path: `/${slug}/package`,       icon: <Inventory2Icon />,  permChildKey: 'package' },
//       { title: 'Project',        path: `/${slug}/service`,       icon: <BuildIcon />,       permChildKey: 'project' },
//       { title: 'combo services', path: `/${slug}/ComboServices`, icon: <BuildIcon />,       permChildKey: 'comboServices' },
//     ],
//   },
//   {
//     title: 'client',
//     path: `/${slug}/client`,
//     icon: <PeopleAltIcon />,
//     permKey: 'client',
//   },
//   {
//     title: 'Chat',
//     path: `/${slug}/projectchat`,
//     icon: <ChatIcon />,
//     permKey: 'chat',
//   },
//   {
//     title: 'Coupon',
//     path: `/${slug}/coupon`,
//     icon: <LocalOfferIcon />,
//     permKey: 'coupon',
//   },
//   {
//     title: 'icons format',
//     icon: <DesignServicesIcon />,
//     hasDropdown: true,
//     permKey: 'iconsFormat',
//     children: [
//       { title: 'icons-format',      path: `/${slug}/iconsformat`,        icon: <PaletteIcon />,     permChildKey: 'iconsFormat' },
//       { title: 'bulk-email-images', path: `/${slug}/EmailBuilderImages`, icon: <AccountTreeIcon />, permChildKey: 'bulkEmailImages' },
//     ],
//   },
//   {
//     title: 'staff role',
//     path: `/${slug}/role`,
//     icon: <AdminPanelSettingsIcon />,
//     permKey: 'staffRole',
//   },
//   {
//     title: 'rating',
//     path: `/${slug}/rating`,
//     icon: <StarRateIcon />,
//     permKey: 'rating',
//   },
//   {
//     title: 'blog',
//     path: `/${slug}/blog`,
//     icon: <ArticleIcon />,
//     permKey: 'blog',
//   },
//   {
//     title: 'HelpSupport',
//     path: `/${slug}/Help-Support`,
//     icon: <HeadsetMicIcon />,
//     permKey: 'helpSupport',
//   },
//   {
//     title: 'Bulk-Mailing',
//     path: `/${slug}/BulkMailing`,
//     icon: <HeadsetMicIcon />,
//     permKey: 'bulkMailing',
//   },
//   {
//     title: 'Management Settings',
//     icon: <GroupsIcon />,
//     hasDropdown: true,
//     permKey: 'managementSettings',
//     children: [
//       { title: 'Add staff',   path: `/${slug}/Add-Management`, icon: <BadgeIcon />,    permChildKey: 'addStaff' },
//       { title: 'Permissions', path: `/${slug}/Permissions`,    icon: <HandymanIcon />, permChildKey: 'permissions' },
//     ],
//   },
// ];

// export default getNavConfig;











import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandymanIcon from '@mui/icons-material/Handyman';
import ChatIcon from '@mui/icons-material/Chat';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarRateIcon from '@mui/icons-material/StarRate';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import GroupsIcon from '@mui/icons-material/Groups';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BuildIcon from '@mui/icons-material/Build';
import PaletteIcon from '@mui/icons-material/Palette';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';



const getNavConfig = (slug) => [
  {
    title: 'DashBoard',
    path: `/${slug}/DashBoard`,
    icon: <DashboardIcon />,
    permKey: 'dashboard',
  },

  // ── Order Detail — ab har item apna permKey khud check karega ──
  {
    title: 'Order Detail',
    icon: <AssignmentIcon />,
    hasDropdown: true,
    permKey: 'orderDetail',   // sirf group heading ke liye
    children: [
      { title: 'New Projects',      path: `/${slug}/new-project`,      icon: <AddCircleOutlineIcon sx={{ width: 18, height: 18 }} />,  permKey: 'newProjects' },
      { title: 'Running Projects',  path: `/${slug}/running-project`,  icon: <PlayCircleOutlineIcon sx={{ width: 18, height: 18 }} />, permKey: 'runningProjects' },
      { title: 'Complete Projects', path: `/${slug}/complete-project`, icon: <TaskAltIcon sx={{ width: 18, height: 18 }} />,           permKey: 'completeProjects' },
      { title: 'Refund Project',    path: `/${slug}/refund-project`,   icon: <MoneyOffIcon sx={{ width: 18, height: 18 }} />,          permKey: 'refundProject' },
    ],
  },

  {
    title: 'Team',
    icon: <GroupsIcon />,
    hasDropdown: true,
    permKey: 'team',
    children: [
      { title: 'staff',       path: `/${slug}/staff`,       icon: <BadgeIcon />,    permKey: 'team' },
      { title: 'freelancers', path: `/${slug}/Freelancers`, icon: <HandymanIcon />, permKey: 'team' },
    ],
  },

  {
    title: 'Services',
    icon: <DesignServicesIcon />,
    hasDropdown: true,
    permKey: 'services',
    children: [
      { title: 'category',       path: `/${slug}/category`,      icon: <CategoryIcon />,    permKey: 'category' },
      { title: 'subcategory',    path: `/${slug}/subCategory`,   icon: <AccountTreeIcon />, permKey: 'subcategory' },
      { title: 'package',        path: `/${slug}/package`,       icon: <Inventory2Icon />,  permKey: 'package' },
      { title: 'Project',        path: `/${slug}/service`,       icon: <BuildIcon />,       permKey: 'project' },
      { title: 'combo services', path: `/${slug}/ComboServices`, icon: <BuildIcon />,       permKey: 'comboServices' },
    ],
  },

  {
    title: 'client',
    path: `/${slug}/client`,
    icon: <PeopleAltIcon />,
    permKey: 'client',
  },
  {
    title: 'Chat',
    path: `/${slug}/projectchat`,
    icon: <ChatIcon />,
    permKey: 'chat',
  },
  {
    title: 'Coupon',
    path: `/${slug}/coupon`,
    icon: <LocalOfferIcon />,
    permKey: 'coupon',
  },
  {
    title: 'icons format',
    icon: <DesignServicesIcon />,
    hasDropdown: true,
    permKey: 'iconsFormat',
    children: [
      { title: 'icons-format',      path: `/${slug}/iconsformat`,        icon: <PaletteIcon />,     permKey: 'iconsFormat' },
      { title: 'bulk-email-images', path: `/${slug}/EmailBuilderImages`, icon: <AccountTreeIcon />, permKey: 'iconsFormat' },
    ],
  },
  {
    title: 'staff role',
    path: `/${slug}/role`,
    icon: <AdminPanelSettingsIcon />,
    permKey: 'staffRole',
  },
  {
    title: 'rating',
    path: `/${slug}/rating`,
    icon: <StarRateIcon />,
    permKey: 'rating',
  },
  {
    title: 'blog',
    path: `/${slug}/blog`,
    icon: <ArticleIcon />,
    permKey: 'blog',
  },
  {
    title: 'HelpSupport',
    path: `/${slug}/Help-Support`,
    icon: <HeadsetMicIcon />,
    permKey: 'helpSupport',
  },
  {
    title: 'StaffHelpSupport',
    path: `/${slug}/StaffHelpSupport`,
    icon: <HeadsetMicIcon />,
    permKey: 'StaffHelpSupport',
  },
  {
    title: 'Bulk-Mailing',
    path: `/${slug}/BulkMailing`,
    icon: <HeadsetMicIcon />,
    permKey: 'bulkMailing',
  },
  {
    title: 'Management Settings',
    icon: <GroupsIcon />,
    hasDropdown: true,
    permKey: 'managementSettings',
    children: [
      { title: 'Add staff',   path: `/${slug}/Add-Management`, icon: <BadgeIcon />,    permKey: 'managementSettings' },
      { title: 'Permissions', path: `/${slug}/Permissions`,    icon: <HandymanIcon />, permKey: 'managementSettings' },
    ],
  },
];

export default getNavConfig;