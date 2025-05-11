"use client"

import { useState, FormEvent, useCallback, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, Mail, User as UserIcon, AlertCircle, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ""
  })
  
  const { signUp, signInWithGoogle } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Clear form errors when input values change
  useEffect(() => {
    if (name && formErrors.name) {
      setFormErrors(prev => ({ ...prev, name: undefined }))
    }
    if (email && formErrors.email) {
      setFormErrors(prev => ({ ...prev, email: undefined }))
    }
    if (password && formErrors.password) {
      setFormErrors(prev => ({ ...prev, password: undefined }))
    }
    if (confirmPassword && formErrors.confirmPassword) {
      setFormErrors(prev => ({ ...prev, confirmPassword: undefined }))
    }
    if (agreedToTerms && formErrors.terms) {
      setFormErrors(prev => ({ ...prev, terms: undefined }))
    }
  }, [name, email, password, confirmPassword, agreedToTerms, formErrors])

  // Evaluate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, feedback: "" })
      return
    }

    let score = 0
    let feedback = ""

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Character variety
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Set feedback based on score
    if (score < 2) {
      feedback = "Weak password"
    } else if (score < 4) {
      feedback = "Moderate password"
    } else {
      feedback = "Strong password"
    }

    setPasswordStrength({ score, feedback })
  }, [password])

  const validateForm = useCallback(() => {
    const errors: FormErrors = {}
    let isValid = true

    if (!name.trim()) {
      errors.name = "Full name is required"
      isValid = false
    }

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

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match"
      isValid = false
    }

    if (!agreedToTerms) {
      errors.terms = "You must agree to the terms and privacy policy"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }, [name, email, password, confirmPassword, agreedToTerms])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, name)
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      })
      
      // Redirect to dashboard or homepage
      router.push("/")
    } catch (error: any) {
      console.error("Registration error:", error)
      
      // Format error message based on error code
      const errorMessage = 
        error.code === 'auth/email-already-in-use' ? "This email is already in use" :
        error.code === 'auth/invalid-email' ? "Please enter a valid email address" :
        error.code === 'auth/weak-password' ? "Password is too weak" :
        error.message || "An unknown error occurred"
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [name, email, password, confirmPassword, agreedToTerms, validateForm, signUp, toast, router])

  const handleGoogleSignIn = useCallback(async () => {
    // Prevent multiple clicks
    if (googleLoading) return;
    
    setGoogleLoading(true)

    try {
      // Show "connecting" toast - using a variable instead of trying to dismiss it later
      toast({
        title: "Connecting to Google",
        description: "Opening Google sign-in window...",
      })
      
      // Attempt to sign in with Google
      await signInWithGoogle()
      
      // Show success toast
      toast({
        title: "Google sign-in successful",
        description: "Welcome to NextShop!",
      })
      
      // Redirect to home page
      router.push("/")
    } catch (error: any) {
      console.error("Google sign-in error:", error)

      // Handle different error cases
      if (error.name === 'PopupClosedError') {
        toast({
          title: "Sign-in cancelled",
          description: "The Google sign-in window was closed.",
          variant: "default",
        })
      } else {
        const errorMessage = 
          error.code === "auth/unauthorized-domain" ? 
            "This domain is not authorized for Google sign-in. Please add it in your Firebase console." :
          error.code === "auth/popup-blocked" ?
            "Pop-up was blocked by your browser. Please allow pop-ups for this site." :
          error.code === "auth/cancelled-popup-request" ?
            "The sign-in process was cancelled." :
          error.code === "auth/account-exists-with-different-credential" ?
            "An account already exists with the same email address but different sign-in credentials." :
            error.message || "An unknown error occurred"
        
        toast({
          title: "Google sign-in failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setGoogleLoading(false)
    }
  }, [googleLoading, signInWithGoogle, toast, router])

  const getPasswordStrengthColor = useCallback(() => {
    if (!password) return "bg-gray-200"
    
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "bg-red-500"
      case 2:
      case 3:
        return "bg-yellow-500"
      case 4:
      case 5:
        return "bg-green-500"
      default:
        return "bg-gray-200"
    }
  }, [password, passwordStrength.score])

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute left-0 top-1/3 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-60 h-60 rounded-full bg-purple-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join the next generation of e-commerce
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 transition-all animate-in fade-in-50 zoom-in-95 duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                className="text-sm font-medium flex gap-1.5 items-center"
              >
                <UserIcon className="h-4 w-4 text-gray-500" />
                Full name
              </Label>
              <div className="relative group">
                <Input 
                  id="name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="John Doe"
                  className={`pl-3 pr-3 py-2 transition-all duration-300 border-gray-200 focus:border-primary/50 ${
                    formErrors.name 
                      ? 'border-red-300 focus-visible:ring-red-300' 
                      : 'group-hover:border-gray-300'
                  }`}
                  autoComplete="name"
                  disabled={loading || googleLoading}
                  required 
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1 animate-in slide-in-from-left">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.name}
                  </p>
                )}
              </div>
            </div>
            
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
              <Label 
                htmlFor="password" 
                className="text-sm font-medium flex gap-1.5 items-center"
              >
                <Lock className="h-4 w-4 text-gray-500" />
                Password
              </Label>
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
                  autoComplete="new-password"
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
                
                {password && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <Progress value={(passwordStrength.score / 5) * 100} className={`h-1 ${getPasswordStrengthColor()}`} />
                      <span className="text-xs text-gray-500 ml-2">{passwordStrength.feedback}</span>
                    </div>
                    <ul className="text-xs text-gray-500 space-y-0.5 pl-1">
                      <li className={`flex items-center gap-1 ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className={`h-1 w-1 rounded-full ${password.length >= 8 ? 'bg-green-600' : 'bg-gray-300'}`}></span>
                        At least 8 characters
                      </li>
                      <li className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className={`h-1 w-1 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-600' : 'bg-gray-300'}`}></span>
                        Contains uppercase letter
                      </li>
                      <li className={`flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className={`h-1 w-1 rounded-full ${/[0-9]/.test(password) ? 'bg-green-600' : 'bg-gray-300'}`}></span>
                        Contains number
                      </li>
                      <li className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className={`h-1 w-1 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-600' : 'bg-gray-300'}`}></span>
                        Contains special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label 
                htmlFor="confirmPassword" 
                className="text-sm font-medium flex gap-1.5 items-center"
              >
                <Lock className="h-4 w-4 text-gray-500" />
                Confirm password
              </Label>
              <div className="relative group">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`pl-3 pr-10 py-2 transition-all duration-300 border-gray-200 focus:border-primary/50 ${
                    formErrors.confirmPassword 
                      ? 'border-red-300 focus-visible:ring-red-300' 
                      : 'group-hover:border-gray-300'
                  }`}
                  autoComplete="new-password"
                  disabled={loading || googleLoading}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-primary transition-colors"
                  onClick={toggleShowConfirmPassword}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  disabled={loading || googleLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {formErrors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1 animate-in slide-in-from-left">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-start">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms} 
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="data-[state=checked]:bg-primary mt-1"
                disabled={loading || googleLoading}
              />
              <label 
                htmlFor="terms" 
                className="text-sm text-gray-600 ml-2 cursor-pointer select-none"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {formErrors.terms && (
              <p className="text-xs text-red-500 flex items-center gap-1 -mt-4 animate-in slide-in-from-left">
                <AlertCircle className="h-3 w-3" />
                {formErrors.terms}
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full flex items-center justify-center py-2 h-11 transition-all bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              disabled={loading || googleLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
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

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center py-2 h-11 transition-all hover:bg-gray-50 border-gray-200 hover:border-gray-300 group"
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="#4285F4"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    <span>Sign up with Google</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-medium hover:text-primary/80 transition-colors hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        {/* 2025 badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="px-3 py-1 bg-primary/10 text-xs text-primary font-medium rounded-full">Blockchain Identity</span>
          <span className="px-3 py-1 bg-indigo-500/10 text-xs text-indigo-600 font-medium rounded-full">Neural Authentication</span>
          <span className="px-3 py-1 bg-purple-500/10 text-xs text-purple-600 font-medium rounded-full">Enhanced Protection</span>
        </div>
      </div>
    </div>
  )
}
