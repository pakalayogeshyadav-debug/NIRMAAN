import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button, Input } from '@/components/ui';
import { CivicPatternBackground } from '@/components/shared/CivicPatternBackground';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import type { AccountType } from '@/types';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [accountType, setAccountType] = useState<AccountType>('USER');
  const [identifier, setIdentifier] = useState('user@nirmaan.demo');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle switching account types and prefilling demo credentials
  const handleAccountTypeChange = (type: AccountType) => {
    setAccountType(type);
    setError('');
    if (type === 'USER') {
      setIdentifier('user@nirmaan.demo');
    } else {
      setIdentifier('org@nirmaan.demo');
    }
  };

  const from = location.state?.from?.pathname || (accountType === 'USER' ? '/app' : '/organization');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!identifier || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      await login({
        email: identifier,
        password,
        accountType,
      });
      navigate(from, { replace: true });
    } catch (err) {
      // Use professional generic message per requirements
      setError('Unable to sign in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CivicPatternBackground variant="auth">

      <header className="w-full p-6 lg:p-8 flex items-center justify-between relative z-10">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
          <NirmaanLogo size="sm" />
        </Link>
        <Link 
          to="/" 
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Back to website
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-[500px] mx-auto">
        <div className="w-full bg-surface-primary border border-border-default rounded-2xl p-8 md:p-10 shadow-sm relative">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome back</h1>
            <p className="text-text-secondary">Continue your community action</p>
          </div>

          {/* Account Type Selector */}
          <div className="flex bg-surface-soft p-1 rounded-xl mb-8 relative border border-border-default/50">
            <button
              type="button"
              onClick={() => handleAccountTypeChange('USER')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 z-10 ${
                accountType === 'USER' 
                  ? 'bg-surface-primary text-nirmaan-green shadow-xs' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Citizen / Volunteer
            </button>
            <button
              type="button"
              onClick={() => handleAccountTypeChange('ORGANIZATION')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 z-10 ${
                accountType === 'ORGANIZATION' 
                  ? 'bg-surface-primary text-nirmaan-green shadow-xs' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              NGO / Organization
            </button>

          </div>

          {location.state?.message && (
            <div className="mb-6 p-4 bg-nirmaan-green/10 border border-nirmaan-green/30 rounded-lg flex items-start gap-3 text-nirmaan-green-dark text-sm">
              <p>{location.state.message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-lg flex items-start gap-3 text-error text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <Input
                label={accountType === 'USER' ? 'Email or mobile number' : 'Organization email'}
                id="identifier"
                type="text"
                autoComplete="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="relative">
              <Input
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] p-2 text-text-tertiary hover:text-text-primary transition-colors focus:outline-none rounded-md"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex justify-end -mt-2">
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-nirmaan-green hover:text-nirmaan-green-light transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full mt-2" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-text-secondary text-sm">Don't have an account? </span>
            <Link 
              to="/register" 
              className="text-sm font-semibold text-nirmaan-green hover:text-nirmaan-green-light transition-colors ml-1"
            >
              Create one
            </Link>
          </div>
        </div>
      </main>
    </CivicPatternBackground>
  );
}
