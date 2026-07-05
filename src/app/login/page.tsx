'use client';

import { useState, useEffect, useRef } from 'react';
import { auth } from '@/lib/firebase/client';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Phone, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const localNumber = phoneNumber.replace(/^0/, '').replace(/\D/g, '');
      if (localNumber.length !== 9) {
        throw new Error('Please enter a valid 9-digit Ghana mobile number.');
      }
      const formattedPhone = `+233${localNumber}`;

      const appVerifier = (window as any).recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);

      setConfirmationResult(confirmation);
      setStep('OTP');
      // Focus first OTP input
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    const fullOtp = newOtp.join('');
    if (fullOtp.length === 6) {
      handleVerifyOtp(fullOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      handleVerifyOtp(pastedData);
    }
  };

  const handleVerifyOtp = async (otpString?: string) => {
    const code = otpString || otp.join('');
    if (code.length !== 6 || !confirmationResult) return;

    setLoading(true);
    setError('');

    try {
      const result = await confirmationResult.confirm(code);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        throw new Error('Failed to create session');
      }
    } catch (err: any) {
      console.error("OTP Verification Error:", err);
      setError(err.message || 'Invalid OTP. Please check and try again.');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12 animate-fade-in flex flex-col items-center">
          <img src="/logo.png" alt="Iconic Links Logo" className="h-28 w-auto object-contain mb-6" />
          <p className="text-blue-200/70 text-lg max-w-sm mx-auto leading-relaxed">
            Premium printing, design, and finishing services for businesses and individuals.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xs mx-auto">
            {['Digital', 'Large Format', 'Design'].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs font-semibold text-blue-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[var(--brand-surface)]">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img src="/logo.png" alt="Iconic Links Logo" className="h-20 w-auto object-contain mb-2" />
            <p className="text-sm text-gray-500 mt-1">Premium Print & Design</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                {step === 'PHONE' ? <Phone className="w-5 h-5 text-white" /> : <ShieldCheck className="w-5 h-5 text-white" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 'PHONE' ? 'Welcome' : 'Verify Code'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {step === 'PHONE'
                  ? 'Sign in or create your account to get started'
                  : 'Enter the 6-digit code sent to your phone'}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 animate-scale-in">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {step === 'PHONE' ? (
              <form className="space-y-6" onSubmit={handleSendOtp}>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm font-semibold">+233</span>
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-16 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none text-base"
                      placeholder="24 123 4567"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !phoneNumber}
                  className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 text-base disabled:opacity-50 disabled:transform-none"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* OTP Input Boxes */}
                <div className="flex gap-3 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 rounded-xl border-2 border-gray-200 bg-gray-50 text-center text-xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none"
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleVerifyOtp()}
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 text-base disabled:opacity-50 disabled:transform-none"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep('PHONE'); setOtp(['', '', '', '', '', '']); setError(''); }}
                  className="w-full text-sm text-gray-500 hover:text-blue-600 font-medium transition"
                >
                  Use a different number
                </button>
              </div>
            )}
          </div>

          <div id="recaptcha-container" />
        </div>
      </div>
    </div>
  );
}
