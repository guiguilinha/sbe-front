import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ 
    className, 
    title = "Ops! Algo deu errado", 
    message, 
    onRetry, 
    retryText = "Tentar novamente",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-4 p-6 text-center",
          className
        )}
        role="alert"
        aria-live="assertive"
        {...props}
      >
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground max-w-md">
          {message}
        </p>
        
        {onRetry && (
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="gap-2"
            aria-label={`${retryText}. ${message}`}
          >
            <RefreshCw className="h-4 w-4" />
            {retryText}
          </Button>
        )}
      </div>
    );
  }
);

ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage }; 