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
  type='',
  variant = "default",
  size = "default",
  className = "",
  iconPosition = "left",
  loading=false,
  hasError,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = loading || isLoading;
  useEffect(() => {
  if (loading) {
    setIsLoading(true);
  } else if (!loading && isLoading) {

    if(hasError)
      setIsLoading(false)

    setTimeout(() => {
      setIsLoading(false);
    }, minDuration);
  }
}, [loading, isLoading, minDuration,hasError]);
  
  

  const handleClick = async (e) => {
    if (!onClick && !showLoading) return;

    setIsLoading(true);
    

    try {
        await onClick(e) ; 
    } catch (err) {
      console.error("Button action failed:", err);
    } finally {
      setTimeout(() => {
          setIsLoading(false);
      }, minDuration);
    }
  };
  

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading || disabled || loading}
      type={type}
      className={cn("flex items-center gap-2 cursor-pointer", className)}
      {...props}
    >
       {showLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {!showLoading && Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      <span>{children}</span>
      {!showLoading && Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
   </Button>
  );
}
