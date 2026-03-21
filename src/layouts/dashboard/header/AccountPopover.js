// import { useState } from 'react';
// // @mui
// import { alpha } from '@mui/material/styles';
// import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// import { Link } from 'react-router-dom';
// // mocks_
// import account from '../../../_mock/account';

// // ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//   },
//   {
//     label: 'Settings',
//     icon: 'eva:settings-2-fill',
//   },
// ];

// // ----------------------------------------------------------------------

// export default function AccountPopover() {
//   const [open, setOpen] = useState(null);

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleClose = () => {
//     setOpen(null);
//   };
//   const logOutFunc = ()=>{
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin");

//   }

//   return (
//     <>
//       <IconButton
//         onClick={handleOpen}
//         sx={{
//           p: 0,
//           ...(open && {
//             '&:before': {
//               zIndex: 1,
//               content: "''",
//               width: '100%',
//               height: '100%',
//               borderRadius: '50%',
//               position: 'absolute',
//               bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
//             },
//           }),
//         }}
//       >
//         <Avatar src={account.photoURL} alt="photoURL" />
//       </IconButton>

//       <Popover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: {
//             p: 0,
//             mt: 1.5,
//             ml: 0.75,
//             width: 180,
//             '& .MuiMenuItem-root': {
//               typography: 'body2',
//               borderRadius: 0.75,
//             },
//           },
//         }}
//       >
//         {/* <Box sx={{ my: 1.5, px: 2.5 }}>
//           <Typography variant="subtitle2" noWrap>
//             {account.displayName}
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
//             {account.email}
//           </Typography>
//         </Box> */}

//         {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

//         {/* <Stack sx={{ p: 1 }}>
//           {MENU_OPTIONS.map((option) => (
//             <MenuItem key={option.label} onClick={handleClose}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Stack> */}

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         {/* <Link onClick={logOutFunc} to="/login">
//         <MenuItem onClick={handleClose} sx={{ m: 1 }}>
//           Logout
//         </MenuItem>
//         </Link> */}




// <MenuItem
//   component={Link}
//   to="/login"
//   onClick={() => {
//     logOutFunc();
//     handleClose();
//   }}
//   sx={{ m: 1 }}
// >
//   Logout
// </MenuItem>

// <MenuItem
//   component={Link}
//   to="/dashboard/Admin-Settings"
//   onClick={handleClose}
//   sx={{ m: 1 }}
// >
//   Settings
// </MenuItem>




//       </Popover>
//     </>
//   );
// }























import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  // ✅ management staff data localStorage se
  const staff = JSON.parse(localStorage.getItem('management_staff') || '{}');

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);

  const logOutFunc = () => {
    // ✅ sirf management tokens clear karo
    localStorage.removeItem('management_token');
    localStorage.removeItem('management_staff');
    handleClose();
    navigate('/login', { replace: true });
  };

  // ✅ Avatar initials — name se pehla letter
  const getInitials = (name) =>
    name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {/* ✅ Agar photo nahi hai toh initials dikhao */}
        <Avatar sx={{ bgcolor: '#1e40af', fontSize: 14, fontWeight: 700 }}>
          {getInitials(staff?.name)}
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 200,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* ✅ Staff name + email + role */}
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap fontWeight={700}>
            {staff?.name || 'Staff'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {staff?.email || ''}
          </Typography>
          <Typography variant="caption" sx={{ color: '#1e40af', fontWeight: 600 }} noWrap>
            {staff?.roleName || ''}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* ✅ Logout */}
        <MenuItem onClick={logOutFunc} sx={{ m: 1, color: '#dc2626', fontWeight: 600 }}>
          🚪 Logout
        </MenuItem>
      </Popover>
    </>
  );
}
