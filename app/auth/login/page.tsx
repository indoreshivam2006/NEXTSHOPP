"use client"

import { useState, FormEvent, useCallback, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import ClickSpark from "@/components/ClickSpark"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formErrors, setFormErrors] = useState<{email?: string; password?: string}>({})
  const { signIn, signInWithGoogle, signOut, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Clear form errors when input values change
  useEffect(() => {
    if (email && formErrors.email) {
      setFormErrors(prev => ({ ...prev, email: undefined }))
    }
    if (password && formErrors.password) {
      setFormErrors(prev => ({ ...prev, password: undefined }))
    }
  }, [email, password, formErrors.email, formErrors.password])

  // Clear any demo auto-login when accessing the login page only if needed
  useEffect(() => {
    // We only want to clear mock users in development mode and
    // only if we're on the login page by user choice (not auto-redirected)
    const shouldClearUser = process.env.NODE_ENV === 'development' && 
                           !sessionStorage.getItem('intentionalGoogleSignIn');
    
    if (shouldClearUser) {
      // If there's a mockUser in localStorage but the user wants to log in again,
      // clear it to prevent auto-login with the demo account
      if (localStorage.getItem('mockUser')) {
        localStorage.removeItem('mockUser');
        // If the auth context still has a user, sign them out
        if (user) {
          console.log("Signing out existing user to allow new login");
          signOut().catch(error => {
            console.error("Error signing out:", error);
          });
        }
      }
    }
    
    // Set a flag to indicate an intentional Google sign-in attempt
    return () => {
      sessionStorage.removeItem('intentionalGoogleSignIn');
    };
  }, [signOut, user]);

  // Load saved email from localStorage if available
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const validateForm = useCallback(() => {
    const errors: {email?: string; password?: string} = {}
    let isValid = true

    if (!email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }
    
    if (!password) {
      errors.password = "Password is required"
      isValid = false
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }, [email, password])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await signIn(email, password)
      
      // Remember email if checkbox is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
      
      router.push("/")
    } catch (error: any) {
      console.error("Login error:", error)
      
      const errorMessage = 
        error.code === 'auth/user-not-found' ? "No account found with this email" :
        error.code === 'auth/wrong-password' ? "Incorrect password" :
        error.code === 'auth/too-many-requests' ? "Too many failed attempts. Please try again later" :
        error.message || "An unknown error occurred"
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [email, password, rememberMe, validateForm, signIn, toast, router])

  const handleGoogleSignIn = useCallback(async (e: React.MouseEvent) => {
    // Prevent default form behavior
    e.preventDefault();
    
    // Prevent multiple clicks
    if (googleLoading) return;
    
    // Set a flag to indicate this is an intentional Google sign-in
    sessionStorage.setItem('intentionalGoogleSignIn', 'true');
    
    setGoogleLoading(true);

    try {
      console.log("Starting Google sign-in process");
      
      // Show "connecting" toast - without trying to dismiss it later
      toast({
        title: "Connecting to Google",
        description: "Opening sign-in window...",
      });
      
      // Attempt to sign in with Google
      const user = await signInWithGoogle();
      console.log("Google sign-in successful", user);
      
      // Show success toast
      toast({
        title: "Sign-in successful",
        description: "Welcome to the store!",
      });
      
      // Add a slight delay before redirecting to ensure toasts are shown
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: any) {
      console.error("Google sign-in error:", error);

      // Handle different error cases
      if (error.name === 'PopupClosedError') {
        toast({
          title: "Sign-in cancelled",
          description: "The sign-in window was closed.",
          variant: "default",
        });
      } else {
        // Create a more user-friendly error message based on the error details
        let errorMessage = "An error occurred during sign-in. Please try again.";
        
        if (error.code === "auth/unauthorized-domain") {
          errorMessage = "This website is not authorized for Google sign-in.";
        } else if (error.code === "auth/popup-blocked") {
          errorMessage = "Pop-up was blocked by your browser. Please allow pop-ups for this site.";
        } else if (error.code === "auth/cancelled-popup-request") {
          errorMessage = "The sign-in process was cancelled.";
        } else if (error.code === "auth/account-exists-with-different-credential") {
          errorMessage = "An account already exists with the same email address but different sign-in credentials.";
        } else if (error.message) {
          // If we have an error message, use it but ensure it's not too technical
          errorMessage = error.message.replace(/Firebase:|auth\/|Error:|\(.*\)/gi, '').trim() || errorMessage;
        }
        
        toast({
          title: "Sign-in failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setGoogleLoading(false);
    }
  }, [googleLoading, signInWithGoogle, toast, router]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-purple-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 transition-all animate-in fade-in-50 zoom-in-95 duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium flex gap-1.5 items-center"
              >
                <Mail className="h-4 w-4 text-gray-500" />
                Email address
              </Label>
              <div className="relative group">
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your@email.com"
                  className={`pl-3 pr-3 py-2 transition-all duration-300 border-gray-200 focus:border-primary/50 ${
                    formErrors.email 
                      ? 'border-red-300 focus-visible:ring-red-300' 
                      : 'group-hover:border-gray-300'
                  }`}
                  autoComplete="email"
                  disabled={loading || googleLoading}
                  required 
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1 animate-in slide-in-from-left">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label 
                  htmlFor="password" 
                  className="text-sm font-medium flex gap-1.5 items-center"
                >
                  <Lock className="h-4 w-4 text-gray-500" />
                  Password
                </Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`pl-3 pr-10 py-2 transition-all duration-300 border-gray-200 focus:border-primary/50 ${
                    formErrors.password 
                      ? 'border-red-300 focus-visible:ring-red-300' 
                      : 'group-hover:border-gray-300'
                  }`}
                  autoComplete="current-password"
                  disabled={loading || googleLoading}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-primary transition-colors"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading || googleLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {formErrors.password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1 animate-in slide-in-from-left">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <Checkbox 
                id="remember" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="data-[state=checked]:bg-primary"
                disabled={loading || googleLoading}
              />
              <label 
                htmlFor="remember" 
                className="text-sm text-gray-600 ml-2 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            {/* Login button with ClickSpark */}
            <ClickSpark
              sparkColor="#6366f1"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-11 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </ClickSpark>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-3 mb-2">
              Sign in with your personal Google account
            </p>

            {/* Google sign in button with ClickSpark */}
            <ClickSpark
              sparkColor="#ef4444"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full h-11 bg-white hover:bg-gray-50 text-gray-800 flex items-center justify-center gap-2 border-gray-200"
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
            </ClickSpark>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-primary font-medium hover:text-primary/80 transition-colors hover:underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>
        
        {/* 2025 badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="px-3 py-1 bg-primary/10 text-xs text-primary font-medium rounded-full">AI-Enhanced Security</span>
          <span className="px-3 py-1 bg-indigo-500/10 text-xs text-indigo-600 font-medium rounded-full">Biometric Integration</span>
          <span className="px-3 py-1 bg-purple-500/10 text-xs text-purple-600 font-medium rounded-full">Web3 Ready</span>
        </div>
      </div>
    </div>
  )
}
