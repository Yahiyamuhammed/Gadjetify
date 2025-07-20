import { useState,useEffect  } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Spinner icon
import { cn } from "@/lib/utils"; // for merging classes
import toast, { Toaster } from 'react-hot-toast';

export default function SpinningButton({
  children,
  icon: Icon,               
  onClick,                  
  minDuration = 500,        
  disabled = false,
  type = 'button',
  variant = "default",
  size = "default",
  className = "",
  iconPosition = "left",
  loading = false,
  hasError = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(null);

  // Handle external loading (like form submissions or Google login)
  useEffect(() => {
    if (loading && !isLoading) {
      // External loading started
      setIsLoading(true);
      setLoadingStartTime(Date.now());
    } else if (!loading && isLoading && loadingStartTime) {
      // External loading stopped
      const elapsed = Date.now() - loadingStartTime;
      
      if (hasError) {
        // Stop immediately on error
        setIsLoading(false);
        setLoadingStartTime(null);
      } else {
        // Success: ensure minimum duration
        const remainingTime = Math.max(0, minDuration - elapsed);
        setTimeout(() => {
          setIsLoading(false);
          setLoadingStartTime(null);
        }, remainingTime);
      }
    }
  }, [loading, isLoading, loadingStartTime, minDuration, hasError]);

  // Handle button clicks (when no external loading)
  const handleClick = async (e) => {
    if (!onClick || loading) return; // Don't handle clicks during external loading

    setIsLoading(true);
    const startTime = Date.now();

    try {
      await onClick(e);
    } catch (err) {
      console.error("Button action failed:", err);
      // Stop immediately on error
      setIsLoading(false);
      return;
    }

    // Success: ensure minimum duration
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, minDuration - elapsed);
    
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  };


  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading || disabled}
      type={type}
      className={cn("flex items-center gap-2 cursor-pointer", className)}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {!isLoading && Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </Button>
  );
}
