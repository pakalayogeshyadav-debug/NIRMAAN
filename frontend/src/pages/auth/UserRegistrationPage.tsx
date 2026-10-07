import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button, Input } from '@/components/ui';
import { CivicPatternBackground } from '@/components/shared/CivicPatternBackground';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';
import { Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export function UserRegistrationPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Field Validation Logic
  const getErrors = () => {
    const errors: Record<string, string> = {};
    
    if (!name.trim()) errors.name = 'Full name is required.';
    else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

    if (!email.trim()) errors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address.';

    if (!mobile.trim()) errors.mobile = 'Mobile number is required.';
    else if (!/^(?:\+91|91)?[6789]\d{9}$/.test(mobile.trim())) errors.mobile = 'Enter a valid 10-digit Indian mobile number.';

    if (!password) errors.password = 'Password is required.';
    else if (password.length < 8) errors.password = 'Password must be at least 8 characters.';

    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required.';
    else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

    if (!agreed) errors.agreed = 'You must agree to the Terms of Service and Privacy Policy.';

    return errors;
  };

  const errors = getErrors();
  const isFormValid = Object.keys(errors).length === 0;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const calculateStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length > 7) strength++;
    if (pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Mark all as touched to show errors if they submitted prematurely
    setTouched({
      name: true, email: true, mobile: true, password: true, confirmPassword: true, agreed: true
    });

    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: mobile.trim(),
        accountType: 'USER',
      });
      navigate('/app', { replace: true });
    } catch (err) {
      setFormError('We couldn\'t complete your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CivicPatternBackground variant="register">

      <header className="w-full p-6 lg:p-8 flex items-center justify-between relative z-10">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
          <NirmaanLogo size="sm" />
        </Link>
        <Link 
          to="/register" 
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-10 px-6 relative z-10 w-full max-w-[540px] mx-auto">
        <div className="w-full bg-surface-primary border border-border-default rounded-2xl p-8 md:p-10 shadow-sm relative">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Create your account</h1>
            <p className="text-text-secondary">Start contributing to cleaner communities.</p>
          </div>

          {formError && (
            <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-lg flex items-start gap-3 text-error text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div>
              <Input
                label="Full name"
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                error={touched.name ? errors.name : undefined}
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={touched.email ? errors.email : undefined}
                  disabled={isLoading}
                  required
                />
              </div>
              <div>
                <Input
                  label="Mobile number"
                  id="mobile"
                  type="tel"
                  autoComplete="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onBlur={() => handleBlur('mobile')}
                  error={touched.mobile ? errors.mobile : undefined}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <Input
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                error={touched.password ? errors.password : undefined}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 p-2 text-text-tertiary hover:text-text-primary transition-colors focus:outline-none rounded-md ${touched.password && errors.password ? 'top-[34px] -translate-y-1' : 'top-[34px]'}`}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              
              {password && (
                <div className="mt-2 flex items-center justify-between px-1">
                  <span className="text-xs text-text-tertiary">Password strength</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className={`w-6 h-1.5 rounded-full transition-colors ${
                          strength >= level 
                            ? strength > 2 ? 'bg-nirmaan-green' : 'bg-warning' 
                            : 'bg-border-strong'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Input
                label="Confirm password"
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
                disabled={isLoading}
                required
              />
            </div>

            <div className="mt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      handleBlur('agreed');
                    }}
                    disabled={isLoading}
                    required
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-colors flex items-center justify-center ${touched.agreed && errors.agreed ? 'border-error' : 'border-border-strong peer-checked:bg-nirmaan-green peer-checked:border-nirmaan-green'}`}>
                    <svg className={`w-3.5 h-3.5 text-white ${agreed ? 'opacity-100' : 'opacity-0'} transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                  I agree to the <Link to="/terms" className="text-nirmaan-green hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-nirmaan-green hover:underline">Privacy Policy</Link>.
                </span>
              </label>
              {touched.agreed && errors.agreed && (
                <p className="text-error text-caption mt-1.5 ml-8">{errors.agreed}</p>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full mt-4" 
              disabled={isLoading || (!isFormValid && Object.keys(touched).length > 0)}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-text-secondary text-sm">Already have an account? </span>
            <Link 
              to="/login" 
              className="text-sm font-semibold text-nirmaan-green hover:text-nirmaan-green-light transition-colors ml-1"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </CivicPatternBackground>
  );
}
