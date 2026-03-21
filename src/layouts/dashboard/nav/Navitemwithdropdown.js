// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { alpha, styled } from '@mui/material/styles';
// import {
//   Box,
//   List,
//   ListItemText,
//   ListItemIcon,
//   ListItemButton,
//   Collapse,
//   Typography,
// } from '@mui/material';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // ----------------------------------------------------------------------

// const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
//   ...theme.typography.body2,
//   height: 48,
//   position: 'relative',
//   textTransform: 'capitalize',
//   color: theme.palette.text.secondary,
//   borderRadius: theme.shape.borderRadius,
//   marginBottom: 4,
//   '&.active': {
//     color: theme.palette.primary.main,
//     backgroundColor: alpha(theme.palette.primary.main, 0.08),
//     fontWeight: theme.typography.fontWeightSemiBold,
//     '& .nav-item-icon': {
//       color: theme.palette.primary.main,
//     },
//   },
// }));

// const StyledNavItemIcon = styled(ListItemIcon)({
//   width: 22,
//   height: 22,
//   color: 'inherit',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minWidth: 0,
//   marginRight: 16,
// });

// const StyledSubItem = styled(ListItemButton)(({ theme }) => ({
//   height: 40,
//   paddingLeft: theme.spacing(6),
//   borderRadius: theme.shape.borderRadius,
//   color: theme.palette.text.secondary,
//   marginBottom: 2,
//   textTransform: 'capitalize',
//   '&.active': {
//     color: theme.palette.primary.main,
//     backgroundColor: alpha(theme.palette.primary.main, 0.08),
//     fontWeight: theme.typography.fontWeightSemiBold,
//   },
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.grey[500], 0.08),
//   },
// }));

// // ----------------------------------------------------------------------

// NavItemWithDropdown.propTypes = {
//   item: PropTypes.shape({
//     title: PropTypes.string,
//     path: PropTypes.string,
//     icon: PropTypes.node,
//     hasDropdown: PropTypes.bool,
//     children: PropTypes.array,
//   }),
// };

// export default function NavItemWithDropdown({ item }) {
//   const { title, path, icon, hasDropdown, children } = item;
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   // Auto-open dropdown agar koi child active hai
//   const isAnyChildActive = children?.some((child) => pathname === child.path);
//   const [open, setOpen] = useState(isAnyChildActive || false);

//   // ── Normal item (no dropdown) ──────────────────────────────────────
//   if (!hasDropdown) {
//     return (
//       <StyledNavItem
//         className={pathname === path ? 'active' : ''}
//         onClick={() => navigate(path)}
//       >
//         <StyledNavItemIcon className="nav-item-icon">{icon}</StyledNavItemIcon>
//         <ListItemText disableTypography primary={title} />
//       </StyledNavItem>
//     );
//   }

//   // ── Dropdown item ──────────────────────────────────────────────────
//   return (
//     <>
//       {/* Parent — "Projects" */}
//       <StyledNavItem
//         className={isAnyChildActive ? 'active' : ''}
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         <StyledNavItemIcon className="nav-item-icon">{icon}</StyledNavItemIcon>
//         <ListItemText disableTypography primary={title} />
//         {open
//           ? <ExpandLessIcon sx={{ fontSize: 18, opacity: 0.6 }} />
//           : <ExpandMoreIcon sx={{ fontSize: 18, opacity: 0.6 }} />
//         }
//       </StyledNavItem>

//       {/* Children — New / Running / Complete / Refund */}
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           {children?.map((child) => (
//             <StyledSubItem
//               key={child.path}
//               className={pathname === child.path ? 'active' : ''}
//               onClick={() => navigate(child.path)}
//             >
//               <ListItemText
//                 disableTypography
//                 primary={
//                   <Typography
//                     variant="body2"
//                     sx={{ fontSize: '0.82rem' }}
//                   >
//                     • {child.title}
//                   </Typography>
//                 }
//               />
//             </StyledSubItem>
//           ))}
//         </List>
//       </Collapse>
//     </>
//   );
// }









// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { alpha, styled } from '@mui/material/styles';
// import {
//   Box,
//   List,
//   ListItemText,
//   ListItemButton,
//   Collapse,
//   Typography,
// } from '@mui/material';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // ----------------------------------------------------------------------

// const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
//   ...theme.typography.body2,
//   height: 48,
//   position: 'relative',
//   textTransform: 'capitalize',
//   color: theme.palette.text.secondary,
//   borderRadius: theme.shape.borderRadius,
//   marginBottom: 4,
//   '&.active': {
//     color: theme.palette.primary.main,
//     backgroundColor: alpha(theme.palette.primary.main, 0.08),
//     fontWeight: theme.typography.fontWeightSemiBold,
//     '& .nav-icon': {
//       color: theme.palette.primary.main,
//     },
//   },
// }));

// // Parent item icon wrapper
// const NavIconBox = styled(Box)({
//   width: 22,
//   height: 22,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   flexShrink: 0,
//   marginRight: 16,
//   color: 'inherit',
//   '& svg': {
//     width: 22,
//     height: 22,
//   },
// });

// const StyledSubItem = styled(ListItemButton)(({ theme }) => ({
//   height: 42,
//   paddingLeft: theme.spacing(3.5),
//   borderRadius: theme.shape.borderRadius,
//   color: theme.palette.text.secondary,
//   marginBottom: 2,
//   textTransform: 'capitalize',
//   '&.active': {
//     color: theme.palette.primary.main,
//     backgroundColor: alpha(theme.palette.primary.main, 0.08),
//     fontWeight: theme.typography.fontWeightSemiBold,
//     '& .sub-icon': {
//       color: theme.palette.primary.main,
//     },
//   },
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.grey[500], 0.08),
//   },
// }));

// // Sub item icon wrapper
// const SubIconBox = styled(Box)({
//   width: 18,
//   height: 18,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   flexShrink: 0,
//   marginRight: 12,
//   opacity: 0.75,
//   color: 'inherit',
//   '& svg': {
//     width: 18,
//     height: 18,
//   },
// });

// // ----------------------------------------------------------------------

// NavItemWithDropdown.propTypes = {
//   item: PropTypes.shape({
//     title: PropTypes.string,
//     path: PropTypes.string,
//     icon: PropTypes.node,
//     hasDropdown: PropTypes.bool,
//     children: PropTypes.arrayOf(
//       PropTypes.shape({
//         title: PropTypes.string,
//         path: PropTypes.string,
//         icon: PropTypes.node,
//       })
//     ),
//   }),
// };

// export default function NavItemWithDropdown({ item }) {
//   const { title, path, icon, hasDropdown, children } = item;
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const isAnyChildActive = children?.some((child) => pathname === child.path);
//   const [open, setOpen] = useState(isAnyChildActive || false);

//   // ── Normal item ────────────────────────────────────────────────────
//   if (!hasDropdown) {
//     return (
//       <StyledNavItem
//         className={pathname === path ? 'active' : ''}
//         onClick={() => navigate(path)}
//       >
//         <NavIconBox className="nav-icon">{icon}</NavIconBox>
//         <ListItemText disableTypography primary={title} />
//       </StyledNavItem>
//     );
//   }

//   // ── Dropdown item ──────────────────────────────────────────────────
//   return (
//     <>
//       <StyledNavItem
//         className={isAnyChildActive ? 'active' : ''}
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         <NavIconBox className="nav-icon">{icon}</NavIconBox>
//         <ListItemText disableTypography primary={title} />
//         {open
//           ? <ExpandLessIcon sx={{ fontSize: 18, opacity: 0.6 }} />
//           : <ExpandMoreIcon sx={{ fontSize: 18, opacity: 0.6 }} />
//         }
//       </StyledNavItem>

//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding sx={{ mb: 1 }}>
//           {children?.map((child) => (
//             <StyledSubItem
//               key={child.path}
//               className={pathname === child.path ? 'active' : ''}
//               onClick={() => navigate(child.path)}
//             >
//               {child.icon && (
//                 <SubIconBox className="sub-icon">
//                   {child.icon}
//                 </SubIconBox>
//               )}
//               <ListItemText
//                 disableTypography
//                 primary={
//                   <Typography variant="body2" sx={{ fontSize: '0.82rem' }}>
//                     {child.title}
//                   </Typography>
//                 }
//               />
//             </StyledSubItem>
//           ))}
//         </List>
//       </Collapse>
//     </>
//   );
// }








import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  marginBottom: 4,
  '&.active': {
    // color: theme.palette.primary.main,
    color: 'white',
    // backgroundColor: alpha(theme.palette.primary.main, 0.08),
    backgroundColor:theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightSemiBold,
    '& .nav-icon': {
      color: 'white',
    },
  },
}));

// Parent item icon wrapper
const NavIconBox = styled(Box)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginRight: 16,
  color: 'inherit',
  '& svg': {
    width: 22,
    height: 22,
  },
});

const StyledSubItem = styled(ListItemButton)(({ theme }) => ({
  height: 42,
  paddingLeft: theme.spacing(3.5),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  marginBottom: 2,
  textTransform: 'capitalize',
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    fontWeight: theme.typography.fontWeightSemiBold,
    '& .sub-icon': {
      color: theme.palette.primary.main,
    },
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.08),
  },
}));

// Sub item icon wrapper
const SubIconBox = styled(Box)({
  width: 18,
  height: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginRight: 12,
  opacity: 0.75,
  color: 'inherit',
  '& svg': {
    width: 18,
    height: 18,
  },
});

// ----------------------------------------------------------------------

NavItemWithDropdown.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.node,
    hasDropdown: PropTypes.bool,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        path: PropTypes.string,
        icon: PropTypes.node,
      })
    ),
  }),
};

export default function NavItemWithDropdown({ item }) {
  const { title, path, icon, hasDropdown, children } = item;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAnyChildActive = children?.some((child) => pathname === child.path);
  const [open, setOpen] = useState(isAnyChildActive || false);

  // ── Normal item ────────────────────────────────────────────────────
  if (!hasDropdown) {
    return (
      <StyledNavItem
        className={pathname === path ? 'active' : ''}
        onClick={() => navigate(path)}
      >
        <NavIconBox className="nav-icon">{icon}</NavIconBox>
        <ListItemText disableTypography primary={title} />
      </StyledNavItem>
    );
  }

  // ── Dropdown item ──────────────────────────────────────────────────
  return (
    <>
      <StyledNavItem
        className={isAnyChildActive ? 'active' : ''}
        onClick={() => setOpen((prev) => !prev)}
      >
        <NavIconBox className="nav-icon">{icon}</NavIconBox>
        <ListItemText disableTypography primary={title} />
        {open
          ? <ExpandLessIcon sx={{ fontSize: 18, opacity: 0.6 }} />
          : <ExpandMoreIcon sx={{ fontSize: 18, opacity: 0.6 }} />
        }
      </StyledNavItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ mb: 1 }}>
          {children?.map((child) => (
            <StyledSubItem
              key={child.path}
              className={pathname === child.path ? 'active' : ''}
              onClick={() => navigate(child.path)}
            >
              {child.icon && (
                <SubIconBox className="sub-icon">
                  {child.icon}
                </SubIconBox>
              )}
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="body2" sx={{ fontSize: '0.82rem' }}>
                    {child.title}
                  </Typography>
                }
              />
            </StyledSubItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}