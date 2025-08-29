// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Lock, User } from 'lucide-react';
// import Navbar from '@/components/ui/Navbar';
// import Footer from '@/components/ui/Footer';
// import { authAPI } from '@/lib/api';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import { Card, CardContent } from '@/components/ui/Card';

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const onChange = (k: 'username'|'password', v: string) => {
//     setFormData(s => ({ ...s, [k]: v }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.username || !formData.password) {
//       setError('Username and password are required');
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await authAPI.login(formData.username, formData.password);
//       localStorage.setItem('access_token', data.access);
//       localStorage.setItem('refresh_token', data.refresh);
//       router.push('/admin');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Invalid username or password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     // Replace with your backend OAuth URL
//     window.location.href = '/api/auth/google';
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
//       <Navbar />

//       <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div className="text-center">
//             <Lock className="mx-auto h-12 w-12 text-blue-600" />
//             <h2 className="mt-6 text-3xl font-bold text-gray-900">Login</h2>
//             <p className="mt-2 text-sm text-gray-600">Sign in to access your dashboard</p>
//           </div>

//           <Card>
//             <CardContent className="px-6 py-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="relative">
//                   <Input
//                     label="Username or Email"
//                     type="text"
//                     value={formData.username}
//                     onChange={(e) => onChange('username', e.target.value)}
//                     placeholder="you@example.com"
//                     className="pl-10"
//                   />
//                   <User className="pointer-events-none absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
//                 </div>

//                 <div>
//                   <Input
//                     label="Password"
//                     type="password"
//                     value={formData.password}
//                     onChange={(e) => onChange('password', e.target.value)}
//                     placeholder="••••••••"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                     {error}
//                   </div>
//                 )}

//                 <Button type="submit" disabled={loading} className="w-full">
//                   {loading ? 'Signing in...' : 'Sign In'}
//                 </Button>

//                 <button
//                   type="button"
//                   onClick={handleGoogleLogin}
//                   className="mt-2 w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   {/* Google "G" icon */}
//                   <svg className="mr-2 h-5 w-5" viewBox="0 0 533.5 544.3"><path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272.1v95.6h147c-6.4 34.4-25.7 63.6-54.8 83.1l88.5 68.7c51.6-47.5 80.7-117.6 80.7-197z"/><path fill="#34A853" d="M272.1 544.3c73.1 0 134.5-24.2 179.4-65.8l-88.5-68.7c-24.6 16.6-56.2 26.4-90.9 26.4-69.9 0-129.2-47.1-150.5-110.5H31.3v69.3c44.6 88.1 136.5 149.3 240.8 149.3z"/><path fill="#FBBC05" d="M121.6 325.6c-9.8-29.4-9.8-61 0-90.4V165.9H31.3c-41.3 82.7-41.3 179.8 0 262.5l90.3-69.3z"/><path fill="#EA4335" d="M272.1 107.7c37.4-.6 73.3 13.8 100.3 40.7l74.6-74.6C403.4 24.8 340.6 0 272.1 0 167.8 0 75.9 61.2 31.3 149.4l90.3 69.3c21.3-63.4 80.6-111 150.5-111z"/></svg>
//                   Sign in with Google
//                 </button>

//                 <p className="text-center text-sm text-gray-600 mt-3">
//                   No account?{' '}
//                   <Link href="/register" className="text-blue-600 hover:underline">Create one</Link>
//                 </p>
//               </form>
//             </CardContent>
//           </Card>

//           <div className="text-center">
//             <Link href="/" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
//               ← Back to Assessment Tool
//             </Link>
//           </div>

//           {/* <p className="text-center text-xs text-gray-500">Default credentials: admin / admin123</p> */}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
// import Navbar from '@/components/ui/Navbar';
// import Footer from '@/components/ui/Footer';
// import { authAPI } from '@/lib/api';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import { Card, CardContent } from '@/components/ui/Card';

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const onChange = (k: 'username' | 'password', v: string) => {
//     setFormData(s => ({ ...s, [k]: v }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.username || !formData.password) {
//       setError('Username and password are required');
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await authAPI.login(formData.username, formData.password);
//       localStorage.setItem('access_token', data.access);
//       localStorage.setItem('refresh_token', data.refresh);
//       router.push('/admin');
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Invalid username or password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     // Replace with your backend OAuth URL
//     window.location.href = '/api/auth/google';
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
//       <Navbar />

//       <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8">
//           {/* Header */}
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm">
//               <LogIn className="h-7 w-7 text-blue-600" />
//             </div>
//             <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Admin Login</h1>
//             <p className="mt-2 text-sm text-gray-600">Sign in to access the RAFIS admin dashboard</p>
//           </div>

//           {/* Card */}
//           <Card className="border-0 shadow-xl">
//             <CardContent className="px-6 py-8">
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Username */}
//                 <div className="relative">
//                   <Input
//                     label="Username or Email"
//                     type="text"
//                     value={formData.username}
//                     onChange={(e) => onChange('username', e.target.value)}
//                     placeholder="you@example.com"
//                     className="pl-10"
//                   />
//                   <User className="pointer-events-none absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
//                 </div>

//                 {/* Password with toggle */}
//                 <div className="relative">
//                   <Input
//                     label="Password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) => onChange('password', e.target.value)}
//                     placeholder="••••••••"
//                     className="pl-10 pr-10"
//                   />
//                   <Lock className="pointer-events-none absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(prev => !prev)}
//                     className="absolute right-3 top-[36px] inline-flex items-center justify-center p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
//                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                     title={showPassword ? 'Hide password' : 'Show password'}
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                     {error}
//                   </div>
//                 )}

//                 {/* Actions */}
//                 <div className="flex items-center justify-between">
//                   <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <Button type="submit" disabled={loading} className="w-full">
//                   {loading ? 'Signing in...' : 'Sign In'}
//                 </Button>

//                 {/* Divider */}
//                 <div className="relative my-4">
//                   <div className="absolute inset-0 flex items-center">
//                     <span className="w-full border-t border-gray-200" />
//                   </div>
//                   <div className="relative flex justify-center text-xs uppercase">
//                     <span className="bg-white px-2 text-gray-500">Or continue with</span>
//                   </div>
//                 </div>

//                 {/* Google */}
//                 <button
//                   type="button"
//                   onClick={handleGoogleLogin}
//                   className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <svg className="mr-2 h-5 w-5" viewBox="0 0 533.5 544.3" aria-hidden="true">
//                     <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272.1v95.6h147c-6.4 34.4-25.7 63.6-54.8 83.1l88.5 68.7c51.6-47.5 80.7-117.6 80.7-197z"/>
//                     <path fill="#34A853" d="M272.1 544.3c73.1 0 134.5-24.2 179.4-65.8l-88.5-68.7c-24.6 16.6-56.2 26.4-90.9 26.4-69.9 0-129.2-47.1-150.5-110.5H31.3v69.3c44.6 88.1 136.5 149.3 240.8 149.3z"/>
//                     <path fill="#FBBC05" d="M121.6 325.6c-9.8-29.4-9.8-61 0-90.4V165.9H31.3c-41.3 82.7-41.3 179.8 0 262.5l90.3-69.3z"/>
//                     <path fill="#EA4335" d="M272.1 107.7c37.4-.6 73.3 13.8 100.3 40.7l74.6-74.6C403.4 24.8 340.6 0 272.1 0 167.8 0 75.9 61.2 31.3 149.4l90.3 69.3c21.3-63.4 80.6-111 150.5-111z"/>
//                   </svg>
//                   Continue with Google
//                 </button>

//                 <p className="text-center text-sm text-gray-600 mt-2">
//                   No account?{' '}
//                   <Link href="/register" className="text-blue-600 hover:underline">
//                     Create one
//                   </Link>
//                 </p>
//               </form>
//             </CardContent>
//           </Card>

//           <div className="text-center">
//             <Link href="/" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
//               ← Back to Assessment Tool
//             </Link>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }




'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, AlertCircle } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { authAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/components/hooks/useAuth';
// import { useAuth } from '@/hooks/useAuth';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (k: 'username'|'password', v: string) => {
    setFormData(s => ({ ...s, [k]: v }));
    if (error) setError('');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    try {
      // Try Firebase first if email format
      if (formData.username.includes('@')) {
        await signInWithEmail(formData.username, formData.password);
        router.push('/admin');
      } else {
        // Fallback to your existing API
        const { data } = await authAPI.login(formData.username, formData.password);
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        router.push('/admin');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      const user = await signInWithGoogle();
      console.log('Google login successful:', user);
      router.push('/admin');
    } catch (error: any) {
      console.error('Google login error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
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
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Login</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to access your dashboard</p>
          </div>

          <Card>
            <CardContent className="px-6 py-8">
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="relative">
                  <Input
                    label="Username or Email"
                    type="text"
                    value={formData.username}
                    onChange={(e) => onChange('username', e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                  />
                  <User className="pointer-events-none absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
                </div>

                <div>
                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => onChange('password', e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" disabled={loading || googleLoading} className="w-full">
                  {loading ? 'Signing in...' : 'Sign In'}
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
                  No account?{' '}
                  <Link href="/register" className="text-blue-600 hover:underline">Create one</Link>
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