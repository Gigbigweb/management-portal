// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
// // import { LoadingButton } from '@mui/lab';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import Iconify from '../../../components/iconify';
// // import { Url } from '../../../url/url';

// // export default function LoginForm() {
// //   const navigate = useNavigate();
// //   const [formValue, setFormValue] = useState({ email: '', password: '' });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const formHandle = (e) => {
// //     const { name, value } = e.target;
// //     setFormValue((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleClick = async () => {
// //     const { email, password } = formValue;

// //     if (!email || !password) {
// //       Swal.fire('Error', 'Email aur Password required hain!', 'error');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const res = await axios.post(`${Url}/management-staff/login`, { email, password });

// //       // ✅ LocalStorage mein save karo
// //       localStorage.setItem('management_token', res.data.token);
// //       localStorage.setItem('management_staff', JSON.stringify(res.data.data));

// //       Swal.fire({
// //         position: 'top-end',
// //         icon: 'success',
// //         title: 'Login Successful!',
// //         showConfirmButton: false,
// //         timer: 1500,
// //       });

// //       navigate('/Management/app');

// //     } catch (error) {
// //       const msg = error.response?.data?.message || 'Login failed!';
// //       Swal.fire('Error', msg, 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Pehle se logged in hai toh redirect karo
// //   const auth = localStorage.getItem('management_token');
// // // ✅ sirf mount pe check karo — [] dependency array
// // useEffect(() => {
// //   const auth = localStorage.getItem('management_token');
// //   if (auth) {
// //     navigate('/Management/app', { replace: true });
// //   }
// // }, []); // ✅ navigate ko dependency mein mat daalo

// //   return (
// //     <>
// //       {!auth ? (
// //         <>
// //           <Stack spacing={3}>
// //             <TextField
// //               name="email"
// //               type="email"
// //               label="Email address"
// //               value={formValue.email}
// //               onChange={formHandle}
// //             />
// //             <TextField
// //               name="password"
// //               label="Password"
// //               value={formValue.password}
// //               onChange={formHandle}
// //               type={showPassword ? 'text' : 'password'}
// //               InputProps={{
// //                 endAdornment: (
// //                   <InputAdornment position="end">
// //                     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
// //                       <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
// //                     </IconButton>
// //                   </InputAdornment>
// //                 ),
// //               }}
// //             />
// //           </Stack>

// //           <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
// //             <Link variant="subtitle2" underline="hover" style={{ cursor: 'pointer' }}>
// //               Forgot password?
// //             </Link>
// //           </Stack>

// //           <LoadingButton
// //             fullWidth
// //             size="large"
// //             type="submit"
// //             variant="contained"
// //             loading={loading}
// //             onClick={handleClick}
// //           >
// //             Login
// //           </LoadingButton>
// //         </>
// //       ) : null}
// //     </>
// //   );
// // }











// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
// // import { LoadingButton } from '@mui/lab';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import Iconify from '../../../components/iconify';
// // import { Url } from '../../../url/url';

// // export default function LoginForm() {
// //   const navigate = useNavigate();
// //   const [formValue, setFormValue] = useState({ email: '', password: '' });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   // ✅ Sirf mount pe check karo — infinite loop nahi hoga
// //   useEffect(() => {
// //     const auth = localStorage.getItem('management_token');
// //     if (auth) {
// //       navigate('/Management/app', { replace: true });
// //     }
// //   }, []);

// //   const formHandle = (e) => {
// //     const { name, value } = e.target;
// //     setFormValue((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleClick = async () => {
// //     const { email, password } = formValue;

// //     if (!email || !password) {
// //       Swal.fire('Error', 'Email aur Password required hain!', 'error');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // ✅ Step 1 — Login karo
// //       const res = await axios.post(`${Url}/management-staff/login`, { email, password });

// //       // ✅ Step 2 — Staff data save karo
// //       localStorage.setItem('management_token', res.data.token);
// //       localStorage.setItem('management_staff', JSON.stringify(res.data.data));

// //       // ✅ Step 3 — roleId se permissions fetch karo
// //       const roleId = res.data.data.roleId;
// //       try {
// //         const permRes = await axios.get(`${Url}/permissions/true/${roleId}`);
// //         const permissions = permRes.data?.data?.permissions || {};
// //         localStorage.setItem('management_permissions', JSON.stringify(permissions));
// //       } catch (permErr) {
// //         // permissions nahi mili toh empty object save karo
// //         localStorage.setItem('management_permissions', JSON.stringify({}));
// //         console.error('Permissions fetch error:', permErr);
// //       }

// //       Swal.fire({
// //         position: 'top-end',
// //         icon: 'success',
// //         title: 'Login Successful!',
// //         showConfirmButton: false,
// //         timer: 1500,
// //       });

// //       navigate('/Management/app');

// //     } catch (error) {
// //       const msg = error.response?.data?.message || 'Login failed!';
// //       Swal.fire('Error', msg, 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const auth = localStorage.getItem('management_token');

// //   return (
// //     <>
// //       {!auth ? (
// //         <>
// //           <Stack spacing={3}>
// //             <TextField
// //               name="email"
// //               type="email"
// //               label="Email address"
// //               value={formValue.email}
// //               onChange={formHandle}
// //             />
// //             <TextField
// //               name="password"
// //               label="Password"
// //               value={formValue.password}
// //               onChange={formHandle}
// //               type={showPassword ? 'text' : 'password'}
// //               InputProps={{
// //                 endAdornment: (
// //                   <InputAdornment position="end">
// //                     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
// //                       <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
// //                     </IconButton>
// //                   </InputAdornment>
// //                 ),
// //               }}
// //             />
// //           </Stack>

// //           <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
// //             <Link variant="subtitle2" underline="hover" style={{ cursor: 'pointer' }}>
// //               Forgot password?
// //             </Link>
// //           </Stack>

// //           <LoadingButton
// //             fullWidth
// //             size="large"
// //             type="submit"
// //             variant="contained"
// //             loading={loading}
// //             onClick={handleClick}
// //           >
// //             Login
// //           </LoadingButton>
// //         </>
// //       ) : null}
// //     </>
// //   );
// // }


























// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import Iconify from '../../../components/iconify';
// import { Url } from '../../../url/url';

// export default function LoginForm() {
//   const navigate = useNavigate();
//   const [formValue, setFormValue] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const auth = localStorage.getItem('management_token');
//     if (auth) {
//       navigate('/Management/app', { replace: true });
//     }
//   }, []);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClick = async () => {
//     const { email, password } = formValue;

//     if (!email || !password) {
//       Swal.fire('Error', 'Email aur Password required hain!', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       // ✅ Step 1 — Login
//       const res = await axios.post(`${Url}/management-staff/login`, { email, password });

//       // ✅ Step 2 — Staff data save
//       localStorage.setItem('management_token', res.data.token);
//       localStorage.setItem('management_staff', JSON.stringify(res.data.data));

//       // ✅ Step 3 — Permissions fetch
//       const roleId = res.data.data.roleId;
//       try {
//         const permRes = await axios.get(`${Url}/permissions/true/${roleId}`);
//         // ✅ Yeh fix hai — .data.data direct hai, .permissions nahi
//         const permissions = permRes.data?.data || {};
//         localStorage.setItem('management_permissions', JSON.stringify(permissions));
//       } catch (permErr) {
//         localStorage.setItem('management_permissions', JSON.stringify({}));
//         console.error('Permissions fetch error:', permErr);
//       }

//       Swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'Login Successful!',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       navigate('/Management');

//     } catch (error) {
//       const msg = error.response?.data?.message || 'Login failed!';
//       Swal.fire('Error', msg, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const auth = localStorage.getItem('management_token');

//   return (
//     <>
//       {!auth ? (
//         <>
//           <Stack spacing={3}>
//             <TextField
//               name="email"
//               type="email"
//               label="Email address"
//               value={formValue.email}
//               onChange={formHandle}
//             />
//             <TextField
//               name="password"
//               label="Password"
//               value={formValue.password}
//               onChange={formHandle}
//               type={showPassword ? 'text' : 'password'}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                       <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Stack>

//           <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
//             <Link variant="subtitle2" underline="hover" style={{ cursor: 'pointer' }}>
//               Forgot password?
//             </Link>
//           </Stack>

//           <LoadingButton
//             fullWidth
//             size="large"
//             type="submit"
//             variant="contained"
//             loading={loading}
//             onClick={handleClick}
//           >
//             Login
//           </LoadingButton>
//         </>
//       ) : null}
//     </>
//   );
// }














import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Swal from 'sweetalert2';
import Iconify from '../../../components/iconify';
import { Url } from '../../../url/url';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Mount pe check — slug se redirect
  useEffect(() => {
    const auth = localStorage.getItem('management_token');
    if (auth) {
      const staff = JSON.parse(localStorage.getItem('management_staff') || '{}');
      const slug = staff?.slug || 'Management';
      navigate(`/${slug}/DashBoard`, { replace: true });
    }
  }, []);

  const formHandle = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    const { email, password } = formValue;

    if (!email || !password) {
      Swal.fire('Error', 'Email aur Password required hain!', 'error');
      return;
    }

    setLoading(true);
    try {
      // ✅ Step 1 — Login
      const res = await axios.post(`${Url}/management-staff/login`, { email, password });

      const staffData = res.data.data;
      const slug = staffData?.slug || 'Management';  // ✅ slug lo

      // ✅ Step 2 — Staff data save
      localStorage.setItem('management_token', res.data.token);
      localStorage.setItem('management_staff', JSON.stringify(staffData));

      // ✅ Step 3 — Permissions fetch
      const roleId = staffData.roleId;
      try {
        const permRes = await axios.get(`${Url}/permissions/true/${roleId}`);
        const permissions = permRes.data?.data || {};
        localStorage.setItem('management_permissions', JSON.stringify(permissions));
      } catch (permErr) {
        localStorage.setItem('management_permissions', JSON.stringify({}));
        console.error('Permissions fetch error:', permErr);
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful!',
        showConfirmButton: false,
        timer: 1500,
      });

      // ✅ Slug wale route pe navigate karo
      navigate(`/${slug}/DashBoard`);

    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed!';
      Swal.fire('Error', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const auth = localStorage.getItem('management_token');

  return (
    <>
      {!auth ? (
        <>
          <Stack spacing={3}>
            <TextField
              name="email"
              type="email"
              label="Email address"
              value={formValue.email}
              onChange={formHandle}
            />
            <TextField
              name="password"
              label="Password"
              value={formValue.password}
              onChange={formHandle}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
            <Link variant="subtitle2" underline="hover" style={{ cursor: 'pointer' }}>
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            onClick={handleClick}
          >
            Login
          </LoadingButton>
        </>
      ) : null}
    </>
  );
}