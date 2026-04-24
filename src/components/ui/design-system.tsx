/**
 * Design System - Composants Réutilisables
 * Charte graphique cohérente pour web et mobile
 */

import React from "react";
import { cn } from "@/lib/utils";

// ============= BUTTONS =============

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "font-semibold rounded-lg transition duration-200 flex items-center gap-2 justify-center";

  const variants = {
    primary: "bg-primary-800 text-white hover:bg-primary-900 disabled:bg-neutral-400",
    secondary: "bg-white border-2 border-primary-800 text-primary-800 hover:bg-primary-50 disabled:border-neutral-400 disabled:text-neutral-400",
    tertiary: "bg-transparent text-primary-800 hover:bg-primary-50 disabled:text-neutral-400",
    danger: "bg-error-500 text-white hover:bg-error-600 disabled:bg-neutral-400",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="animate-spin">⏳</span>
          {children}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}

// ============= CARDS =============

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error";
  highlighted?: boolean;
}

export function Card({
  variant = "default",
  highlighted = false,
  children,
  className,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white border border-neutral-200",
    success: "bg-success-50 border border-success-200",
    warning: "bg-warning-50 border border-warning-200",
    error: "bg-error-50 border border-error-200",
  };

  return (
    <div
      className={cn(
        "rounded-lg p-6 shadow-sm hover:shadow-md transition",
        highlighted && "ring-2 ring-accent-500",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============= INPUTS =============

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full px-4 py-3 rounded-lg border-2 transition",
            "border-neutral-200 focus:border-primary-800 focus:outline-none",
            "bg-white text-foreground placeholder-neutral-400",
            error && "border-error-500 focus:border-error-500",
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-error-600 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-neutral-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
}

// ============= TEXTAREA =============

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-4 py-3 rounded-lg border-2 transition",
          "border-neutral-200 focus:border-primary-800 focus:outline-none",
          "bg-white text-foreground placeholder-neutral-400",
          "resize-none",
          error && "border-error-500 focus:border-error-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-error-600 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-neutral-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
}

// ============= SELECT =============

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({
  label,
  error,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full px-4 py-3 rounded-lg border-2 transition",
          "border-neutral-200 focus:border-primary-800 focus:outline-none",
          "bg-white text-foreground",
          error && "border-error-500 focus:border-error-500",
          className
        )}
        {...props}
      >
        <option value="">Sélectionnez une option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-error-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

// ============= BADGE =============

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "error" | "neutral";
  size?: "sm" | "md";
}

export function Badge({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-primary-100 text-primary-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-warning-100 text-warning-800",
    error: "bg-error-100 text-error-800",
    neutral: "bg-neutral-100 text-neutral-800",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full font-semibold",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ============= ALERT =============

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info";
  title?: string;
  icon?: React.ReactNode;
}

export function Alert({
  variant = "info",
  title,
  icon,
  children,
  className,
  ...props
}: AlertProps) {
  const variants = {
    success: "bg-success-50 border border-success-200 text-success-800",
    warning: "bg-warning-50 border border-warning-200 text-warning-800",
    error: "bg-error-50 border border-error-200 text-error-800",
    info: "bg-primary-50 border border-primary-200 text-primary-800",
  };

  const defaultIcons = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div
      className={cn("rounded-lg p-4", variants[variant], className)}
      {...props}
    >
      <div className="flex gap-3">
        <span className="text-xl flex-shrink-0">
          {icon || defaultIcons[variant]}
        </span>
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
}

// ============= PROGRESS BAR =============

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  variant?: "primary" | "success" | "warning" | "error";
}

export function Progress({
  value,
  max = 100,
  label,
  variant = "primary",
}: ProgressProps) {
  const percentage = (value / max) * 100;

  const variants = {
    primary: "bg-primary-800",
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
  };

  return (
    <div>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm font-medium text-neutral-600">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============= MODAL =============

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={cn("relative bg-white rounded-lg shadow-xl", sizes[size])}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-foreground transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex gap-3 p-6 border-t border-neutral-200 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ============= SPINNER =============

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("animate-spin", sizes[size])}>
      <div className="w-full h-full border-4 border-primary-200 border-t-primary-800 rounded-full" />
    </div>
  );
}

// ============= EMPTY STATE =============

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-neutral-600 text-center mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
}

// ============= STAT CARD =============

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const isPositive = change && change > 0;

  return (
    <Card className="text-center">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <p className="text-neutral-600 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
      {change !== undefined && (
        <p
          className={cn(
            "text-sm font-semibold",
            isPositive ? "text-success-600" : "text-error-600"
          )}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(change)}%
        </p>
      )}
    </Card>
  );
}

// ============= FORM GROUP =============

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ children, className }: FormGroupProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

// ============= DIVIDER =============

export function Divider() {
  return <div className="border-t border-neutral-200" />;
}

// ============= BREADCRUMB =============

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.href ? (
            <a href={item.href} className="text-primary-800 hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-foreground font-semibold">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <span className="text-neutral-400">/</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// ============= TABS =============

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 border-b border-neutral-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 font-semibold border-b-2 transition",
              activeTab === tab.id
                ? "border-primary-800 text-primary-800"
                : "border-transparent text-neutral-600 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tabs.map((tab) => (
        <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
