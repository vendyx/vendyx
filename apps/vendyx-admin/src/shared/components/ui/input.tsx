import * as React from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import { Button } from './button';

// eslint-disable-next-line @typescript-eslint/ban-types
export type InputProps = {
  isPrice?: boolean;
  isPassword?: boolean;
  rightElement?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isPrice, isPassword, rightElement, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <input
          type={isPrice ? 'text' : isPassword ? (showPassword ? 'text' : 'password') : type}
          {...((type === 'number' || isPrice) && { onFocus: e => e.target.select() })}
          {...(type === 'tel' && { max: 15 })}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            isPassword && 'hide-password-toggle pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-0 top-0 h-full flex items-center">
          {rightElement && <div className="px-3 py-2">{rightElement}</div>}
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-transparent px-3 py-2"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
            </Button>
          )}
        </div>
        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
