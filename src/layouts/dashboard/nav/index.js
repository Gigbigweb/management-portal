// import PropTypes from 'prop-types';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// // @mui
// import { styled, alpha } from '@mui/material/styles';
// import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// // mock
// import account from '../../../_mock/account';
// // hooks
// import useResponsive from '../../../hooks/useResponsive';
// // components
// import Logo from '../../../components/logo';
// import Scrollbar from '../../../components/scrollbar';
// import NavSection from '../../../components/nav-section';
// //
// import navConfig from './config';

// // ----------------------------------------------------------------------

// const NAV_WIDTH = 280;

// const StyledAccount = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

// // ----------------------------------------------------------------------

// Nav.propTypes = {
//   openNav: PropTypes.bool,
//   onCloseNav: PropTypes.func,
// };

// export default function Nav({ openNav, onCloseNav }) {
//   const { pathname } = useLocation();

//   const isDesktop = useResponsive('up', 'lg');

//   useEffect(() => {
//     if (openNav) {
//       onCloseNav();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   const renderContent = (
//     <Scrollbar
//       sx={{
//         height: 1,
//         '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
//       }}
//     >
//       <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
//         <Logo />
//       </Box>

//       <Box sx={{ mb: 5, mx: 2.5 }}>
//         <Link underline="none">
//           <StyledAccount>
//             <Avatar src={account.photoURL} alt="photoURL" />

//             <Box sx={{ ml: 2 }}>
//               <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
//                 {account.displayName}
//               </Typography>

//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 {account.role}
//               </Typography>
//             </Box>
//           </StyledAccount>
//         </Link>
//       </Box>

//       <NavSection data={navConfig} />

//       <Box sx={{ flexGrow: 1 }} />

//     </Scrollbar>
//   );

//   return (
//     <Box
//       component="nav"
//       sx={{
//         flexShrink: { lg: 0 },
//         width: { lg: NAV_WIDTH },
//       }}
//     >
//       {isDesktop ? (
//         <Drawer
//           open
//           variant="permanent"
//           PaperProps={{
//             sx: {
//               width: NAV_WIDTH,
//               bgcolor: 'background.default',
//               borderRightStyle: 'dashed',
//             },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       ) : (
//         <Drawer
//           open={openNav}
//           onClose={onCloseNav}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           PaperProps={{
//             sx: { width: NAV_WIDTH },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       )}
//     </Box>
//   );
// }







// import PropTypes from 'prop-types';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// // @mui
// import { styled, alpha } from '@mui/material/styles';
// import { Box, Link, Drawer, Typography, Avatar, List } from '@mui/material';
// // mock
// import account from '../../../_mock/account';
// // hooks
// import useResponsive from '../../../hooks/useResponsive';
// // components
// import Logo from '../../../components/logo';
// import Scrollbar from '../../../components/scrollbar';
// import NavItemWithDropdown from './Navitemwithdropdown';
// //
// import navConfig from './config';

// // ----------------------------------------------------------------------

// const NAV_WIDTH = 280;

// const StyledAccount = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

// // ----------------------------------------------------------------------

// Nav.propTypes = {
//   openNav: PropTypes.bool,
//   onCloseNav: PropTypes.func,
// };

// export default function Nav({ openNav, onCloseNav }) {
//   const { pathname } = useLocation();
//   const isDesktop = useResponsive('up', 'lg');

//   useEffect(() => {
//     if (openNav) {
//       onCloseNav();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   const renderContent = (
//     <Scrollbar
//       sx={{
//         height: 1,
//         '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
//       }}
//     >
//       {/* Logo */}
//       <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
//         <Logo />
//       </Box>

//       {/* Account */}
//       <Box sx={{ mb: 5, mx: 2.5 }}>
//         <Link underline="none">
//           <StyledAccount>
//             <Avatar src={account.photoURL} alt="photoURL" />
//             <Box sx={{ ml: 2 }}>
//               <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
//                 {account.displayName}
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 {account.role}
//               </Typography>
//             </Box>
//           </StyledAccount>
//         </Link>
//       </Box>

//       {/* ✅ Nav Items */}
//       <Box sx={{ px: 2.5 }}>
//         <List disablePadding>
//           {navConfig.map((item) => (
//             <NavItemWithDropdown key={item.title} item={item} />
//           ))}
//         </List>
//       </Box>

//       <Box sx={{ flexGrow: 1 }} />
//     </Scrollbar>
//   );

//   return (
//     <Box
//       component="nav"
//       sx={{
//         flexShrink: { lg: 0 },
//         width: { lg: NAV_WIDTH },
//       }}
//     >
//       {isDesktop ? (
//         <Drawer
//           open
//           variant="permanent"
//           PaperProps={{
//             sx: {
//               width: NAV_WIDTH,
//               bgcolor: 'background.default',
//               borderRightStyle: 'dashed',
//             },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       ) : (
//         <Drawer
//           open={openNav}
//           onClose={onCloseNav}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           PaperProps={{
//             sx: { width: NAV_WIDTH },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       )}
//     </Box>
//   );
// }














// import PropTypes from 'prop-types';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { styled, alpha } from '@mui/material/styles';
// import { Box, Link, Drawer, Typography, Avatar, List } from '@mui/material';
// import useResponsive from '../../../hooks/useResponsive';
// import Logo from '../../../components/logo';
// import Scrollbar from '../../../components/scrollbar';
// import NavItemWithDropdown from './Navitemwithdropdown';
// import navConfig from './config';

// const NAV_WIDTH = 280;

// const StyledAccount = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

// Nav.propTypes = {
//   openNav: PropTypes.bool,
//   onCloseNav: PropTypes.func,
// };

// export default function Nav({ openNav, onCloseNav }) {
//   const { pathname } = useLocation();
//   const isDesktop = useResponsive('up', 'lg');

//   // ✅ Staff data aur permissions localStorage se lo
//   const staff = JSON.parse(localStorage.getItem('management_staff') || '{}');
//   const permissions = JSON.parse(localStorage.getItem('management_permissions') || '{}');

//   // ✅ Avatar initials
//   const getInitials = (name) =>
//     name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';

// // const filteredNav = navConfig.filter(item => {
// //   if (!item.permKey) return true
// //   const perm = permissions[item.permKey]
// //   // ✅ perm exist karta ho AND view true ho tabhi dikhao
// //   if (!perm) return false
// //   // ✅ Agar perm object hai (jaise orderDetail) toh koi bhi child true ho
// //   if (typeof perm === 'object' && !('view' in perm)) {
// //     return Object.values(perm).some(v => v === true)
// //   }
// //   return perm?.view === true
// // })




// const filteredNav = navConfig
//   .filter(item => {
//     if (!item.permKey) return true
//     const perm = permissions[item.permKey]
//     if (!perm) return false
//     if (typeof perm === 'object' && !('view' in perm)) {
//       return Object.values(perm).some(v => v === true)
//     }
//     return perm?.view === true
//   })
//   .map(item => {
//     // ✅ Children bhi filter karo
//     if (!item.children || !item.permKey) return item
//     const perm = permissions[item.permKey]
//     if (!perm || typeof perm !== 'object') return item

//     const filteredChildren = item.children.filter(child => {
//       if (!child.permChildKey) return true
//       return perm[child.permChildKey] === true
//     })
//     return { ...item, children: filteredChildren }
//   })

//   useEffect(() => {
//     if (openNav) {
//       onCloseNav();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   const renderContent = (
//     <Scrollbar
//       sx={{
//         height: 1,
//         '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
//       }}
//     >
//       {/* Logo */}
//       <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
//         <Logo />
//       </Box>

//       {/* ✅ Staff Account — management_staff se data */}
//       <Box sx={{ mb: 5, mx: 2.5 }}>
//         <Link underline="none">
//           <StyledAccount>
//             <Avatar sx={{ bgcolor: '#1e40af', fontSize: 13, fontWeight: 700 }}>
//               {getInitials(staff?.name)}
//             </Avatar>
//             <Box sx={{ ml: 2 }}>
//               <Typography variant="subtitle2" sx={{ color: 'text.primary' }} noWrap>
//                 {staff?.name || 'Staff'}
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
//                 {staff?.roleName || ''}
//               </Typography>
//             </Box>
//           </StyledAccount>
//         </Link>
//       </Box>

//       {/* ✅ Filtered Nav Items */}
//       <Box sx={{ px: 2.5 }}>
//         <List disablePadding>
//           {filteredNav.map((item) => (
//             <NavItemWithDropdown key={item.title} item={item} />
//           ))}
//         </List>
//       </Box>

//       <Box sx={{ flexGrow: 1 }} />
//     </Scrollbar>
//   );

//   return (
//     <Box
//       component="nav"
//       sx={{
//         flexShrink: { lg: 0 },
//         width: { lg: NAV_WIDTH },
//       }}
//     >
//       {isDesktop ? (
//         <Drawer
//           open
//           variant="permanent"
//           PaperProps={{
//             sx: {
//               width: NAV_WIDTH,
//               bgcolor: 'background.default',
//               borderRightStyle: 'dashed',
//             },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       ) : (
//         <Drawer
//           open={openNav}
//           onClose={onCloseNav}
//           ModalProps={{ keepMounted: true }}
//           PaperProps={{ sx: { width: NAV_WIDTH } }}
//         >
//           {renderContent}
//         </Drawer>
//       )}
//     </Box>
//   );
// }















import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, List } from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavItemWithDropdown from './Navitemwithdropdown';
import getNavConfig from './config';  // ✅ function import karo

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  // ✅ localStorage se staff + permissions + slug
  const staff = JSON.parse(sessionStorage.getItem('management_staff') || '{}');
  const permissions = JSON.parse(sessionStorage.getItem('management_permissions') || '{}');
  const slug = staff?.slug || 'Management';  // ✅ slug

  // ✅ Avatar initials
  const getInitials = (name) =>
    name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';

  // ✅ slug se navConfig generate karo
  const navConfig = getNavConfig(slug);

  // ✅ Permissions ke hisaab se filter karo
  // const filteredNav = navConfig
  //   .filter(item => {
  //     if (!item.permKey) return true
  //     const perm = permissions[item.permKey]
  //     if (!perm) return false
  //     if (typeof perm === 'object' && !('view' in perm)) {
  //       return Object.values(perm).some(v => v === true)
  //     }
  //     return perm?.view === true
  //   })
  //   .map(item => {
  //     if (!item.children || !item.permKey) return item
  //     const perm = permissions[item.permKey]
  //     if (!perm || typeof perm !== 'object') return item
  //     const filteredChildren = item.children.filter(child => {
  //       if (!child.permChildKey) return true
  //       return perm[child.permChildKey] === true
  //     })
  //     return { ...item, children: filteredChildren }
  //   })





// const filteredNav = navConfig
//   .filter(item => {
//     if (!item.permKey) return true
//     if (item.permKey === 'orderDetail') {
//       return item.children?.some(child =>
//         permissions[child.permKey]?.enable === true
//       )
//     }
//     return permissions[item.permKey]?.enable === true
//   })
//   .map(item => {
//     if (!item.children) return item
//     if (item.permKey === 'orderDetail') {
//       return {
//         ...item,
//         children: item.children.filter(child =>
//           permissions[child.permKey]?.enable === true
//         )
//       }
//     }
//     return item
//   })
//   .filter(item => {
//     if (item.hasDropdown && item.children?.length === 0) return false
//     return true
//   })



const filteredNav = navConfig
  .filter(item => {
    if (!item.permKey) return true

    // orderDetail group
    if (item.permKey === 'orderDetail') {
      return item.children?.some(child =>
        permissions[child.permKey]?.enable === true
      )
    }

    // ✅ Services group — children ke permKey check karo
    if (item.permKey === 'services') {
      return item.children?.some(child =>
        permissions[child.permKey]?.enable === true
      )
    }

    // ✅ Team group — children ke permKey check karo
    if (item.permKey === 'team') {
      return item.children?.some(child =>
        permissions[child.permKey]?.enable === true
      )
    }

    // ✅ iconsFormat group — children ke permKey check karo
    if (item.permKey === 'iconsFormat') {
      return permissions[item.permKey]?.enable === true
    }

    // ✅ managementSettings group
    if (item.permKey === 'managementSettings') {
      return permissions[item.permKey]?.enable === true
    }

    return permissions[item.permKey]?.enable === true
  })
  .map(item => {
    if (!item.children) return item

    // orderDetail children filter
    if (item.permKey === 'orderDetail') {
      return {
        ...item,
        children: item.children.filter(child =>
          permissions[child.permKey]?.enable === true
        )
      }
    }

    // ✅ Services children filter — har child ka apna permKey check karo
    if (item.permKey === 'services') {
      return {
        ...item,
        children: item.children.filter(child =>
          permissions[child.permKey]?.enable === true
        )
      }
    }

    // ✅ Team children filter
    if (item.permKey === 'team') {
      return {
        ...item,
        children: item.children.filter(child =>
          permissions[child.permKey]?.enable === true
        )
      }
    }

    return item
  })
  .filter(item => {
    if (item.hasDropdown && item.children?.length === 0) return false
    return true
  })






  

  useEffect(() => {
    if (openNav) onCloseNav();
  }, [pathname]);

  const renderContent = (
    <Scrollbar sx={{ height: 1, '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' } }}>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar sx={{ bgcolor: '#1e40af', fontSize: 13, fontWeight: 700 }}>
              {getInitials(staff?.name)}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }} noWrap>
                {staff?.name || 'Staff'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {staff?.roleName || ''}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <Box sx={{ px: 2.5 }}>
        <List disablePadding>
          {filteredNav.map((item) => (
            <NavItemWithDropdown key={item.title} item={item} />
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box component="nav" sx={{ flexShrink: { lg: 0 }, width: { lg: NAV_WIDTH } }}>
      {isDesktop ? (
        <Drawer open variant="permanent"
          PaperProps={{ sx: { width: NAV_WIDTH, bgcolor: 'background.default', borderRightStyle: 'dashed' } }}>
          {renderContent}
        </Drawer>
      ) : (
        <Drawer open={openNav} onClose={onCloseNav}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: NAV_WIDTH } }}>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}