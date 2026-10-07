import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@/components/ui';
import { NirmaanPattern } from '@/components/shared/NirmaanPattern';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setIsLoading(true);
    try {
      // Endpoint connection pending backend
      // await authService.forgotPassword(email);
      
      // Simulate API call for now to demonstrate UI state
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError('We couldn\'t process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col relative overflow-hidden">
      {/* Decorative Background */}
      <NirmaanPattern variant="auth" />

      <header className="w-full p-6 lg:p-8 flex items-center justify-between relative z-10">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
          <NirmaanLogo size="sm" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-[500px] mx-auto">
        <div className="w-full bg-surface-primary border border-border-default rounded-2xl p-8 md:p-10 shadow-sm relative">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Reset your password</h1>
            <p className="text-text-secondary">Enter the email associated with your NIRMAAN account.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-lg flex items-start gap-3 text-error text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {isSuccess ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-nirmaan-green-light text-nirmaan-green rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-text-primary font-medium text-center mb-6">
                If an account exists for that email, we have sent password reset instructions.
              </p>
              <Link to="/login" className="w-full">
                <Button size="lg" className="w-full" variant="outline">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>

              <div className="text-center mt-2">
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-nirmaan-green hover:text-nirmaan-green-light transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
