// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/ui/Navbar';
// import Footer from '@/components/ui/Footer';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import { Card, CardContent } from '@/components/ui/Card';
// import { authAPI } from '@/lib/api'; // assumes you’ll add authAPI.register

// export default function RegisterPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState('');
//   const [form, setForm] = useState({
//     fullName: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const onChange = (k: keyof typeof form, v: string) => {
//     setForm(s => ({ ...s, [k]: v }));
//     if (err) setErr('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
//       setErr('All required fields must be filled.');
//       return;
//     }
//     if (form.password !== form.confirmPassword) {
//       setErr('Passwords do not match.');
//       return;
//     }

//     try {
//       setLoading(true);
//       // implement this backend endpoint in authAPI
//       await authAPI.register({
//         full_name: form.fullName,
//         phone: form.phone,
//         email: form.email,
//         password: form.password,
//       });
//       router.push('/admin/login');
//     } catch (e) {
//       console.error(e);
//       setErr('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = () => {
//     // Replace with your backend OAuth URL
//     window.location.href = '/api/auth/google';
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
//       <Navbar />
//       <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8">
//           <div className="text-center">
//             <h1 className="mt-2 text-3xl font-bold text-gray-900">Create an account</h1>
//             <p className="mt-2 text-sm text-gray-600">Join RAFIS Assessment Tool</p>
//           </div>

//           <Card>
//             <CardContent className="px-6 py-8">
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <Input
//                   label="Full Name"
//                   value={form.fullName}
//                   onChange={e => onChange('fullName', e.target.value)}
//                   placeholder="Jane Doe"
//                 />
//                 <Input
//                   label="Phone Number"
//                   value={form.phone}
//                   onChange={e => onChange('phone', e.target.value)}
//                   placeholder="+2547xxxxxxx"
//                 />
//                 <Input
//                   label="Email"
//                   type="email"
//                   value={form.email}
//                   onChange={e => onChange('email', e.target.value)}
//                   placeholder="you@example.com"
//                 />
//                 <Input
//                   label="Password"
//                   type="password"
//                   value={form.password}
//                   onChange={e => onChange('password', e.target.value)}
//                   placeholder="••••••••"
//                 />
//                 <Input
//                   label="Confirm Password"
//                   type="password"
//                   value={form.confirmPassword}
//                   onChange={e => onChange('confirmPassword', e.target.value)}
//                   placeholder="••••••••"
//                 />

//                 {err && (
//                   <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                     {err}
//                   </div>
//                 )}

//                 <Button type="submit" disabled={loading} className="w-full">
//                   {loading ? 'Creating account...' : 'Sign Up'}
//                 </Button>

//                 <button
//                   type="button"
//                   onClick={handleGoogleSignup}
//                   className="mt-2 w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   <svg className="mr-2 h-5 w-5" viewBox="0 0 533.5 544.3"><path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272.1v95.6h147c-6.4 34.4-25.7 63.6-54.8 83.1l88.5 68.7c51.6-47.5 80.7-117.6 80.7-197z"/><path fill="#34A853" d="M272.1 544.3c73.1 0 134.5-24.2 179.4-65.8l-88.5-68.7c-24.6 16.6-56.2 26.4-90.9 26.4-69.9 0-129.2-47.1-150.5-110.5H31.3v69.3c44.6 88.1 136.5 149.3 240.8 149.3z"/><path fill="#FBBC05" d="M121.6 325.6c-9.8-29.4-9.8-61 0-90.4V165.9H31.3c-41.3 82.7-41.3 179.8 0 262.5l90.3-69.3z"/><path fill="#EA4335" d="M272.1 107.7c37.4-.6 73.3 13.8 100.3 40.7l74.6-74.6C403.4 24.8 340.6 0 272.1 0 167.8 0 75.9 61.2 31.3 149.4l90.3 69.3c21.3-63.4 80.6-111 150.5-111z"/></svg>
//                   Sign up with Google
//                 </button>

//                 <p className="text-center text-sm text-gray-600 mt-3">
//                   Already have an account?{' '}
//                   <a href="/admin/login" className="text-blue-600 hover:underline">Sign in</a>
//                 </p>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       <Footer />
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, AlertCircle, Mail } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { authAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/components/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (k: 'username'|'email'|'password', v: string) => {
    setFormData(s => ({ ...s, [k]: v }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return;
    }

    setLoading(true);
    try {
      const { data } = await authAPI.register(username, email, password);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.response?.status === 400) {
        setError('User with this username or email already exists');
      } else {
        setError('Registration failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    setSuccess('');

    try {
      const user = await signInWithGoogle();
      console.log('Google login successful:', user);
      router.push('/admin');
    } catch (err: any) {
      console.error('Google login error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups and try again.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Lock className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Sign up to access the dashboard</p>
          </div>

          <Card>
            <CardContent className="px-6 py-8">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="relative">
                  <Input
                    label="Username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => onChange('username', e.target.value)}
                    placeholder="Your username"
                    className="pl-10"
                  />
                  <User className="pointer-events-none absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                  />
                  <Mail className="pointer-events-none absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => onChange('password', e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm flex items-start gap-2">
                    <span>{success}</span>
                  </div>
                )}

                <Button type="submit" disabled={loading || googleLoading} className="w-full">
                  {loading ? 'Registering...' : 'Sign Up'}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading || googleLoading}
                  className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {googleLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                  ) : (
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 533.5 544.3">
                      <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272.1v95.6h147c-6.4 34.4-25.7 63.6-54.8 83.1l88.5 68.7c51.6-47.5 80.7-117.6 80.7-197z"/>
                      <path fill="#34A853" d="M272.1 544.3c73.1 0 134.5-24.2 179.4-65.8l-88.5-68.7c-24.6 16.6-56.2 26.4-90.9 26.4-69.9 0-129.2-47.1-150.5-110.5H31.3v69.3c44.6 88.1 136.5 149.3 240.8 149.3z"/>
                      <path fill="#FBBC05" d="M121.6 325.6c-9.8-29.4-9.8-61 0-90.4V165.9H31.3c-41.3 82.7-41.3 179.8 0 262.5l90.3-69.3z"/>
                      <path fill="#EA4335" d="M272.1 107.7c37.4-.6 73.3 13.8 100.3 40.7l74.6-74.6C403.4 24.8 340.6 0 272.1 0 167.8 0 75.9 61.2 31.3 149.4l90.3 69.3c21.3-63.4 80.6-111 150.5-111z"/>
                    </svg>
                  )}
                  {googleLoading ? 'Signing in with Google...' : 'Sign in with Google'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-3">
                  Already have an account?{' '}
                  <Link href="/admin/login" className="text-blue-600 hover:underline">Sign In</Link>
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
              ← Back to Assessment Tool
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
