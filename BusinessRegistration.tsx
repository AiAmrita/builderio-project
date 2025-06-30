import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useBusinessAuth } from "@/hooks/use-business-auth";
import {
  X,
  Building2,
  CreditCard,
  Shield,
  Check,
  Users,
  FileText,
  BarChart,
  Zap,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

interface BusinessRegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface RegistrationData {
  // Business Information
  companyName: string;
  businessType: string;
  industry: string;
  teamSize: string;

  // Account Information
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Billing
  selectedPlan: string;

  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;

  // Coupon
  couponCode: string;
  appliedCoupon: any;

  // Legal
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  marketingConsent: boolean;
}

export default function BusinessRegistration({
  onClose,
  onSuccess,
}: BusinessRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const { register } = useBusinessAuth();

  const [formData, setFormData] = useState<RegistrationData>({
    companyName: "",
    businessType: "",
    industry: "",
    teamSize: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedPlan: "professional",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    couponCode: "",
    appliedCoupon: null,
    acceptTerms: false,
    acceptPrivacy: false,
    marketingConsent: false,
  });

  const plans = [
    {
      id: "professional",
      name: "Professional",
      price: 249,
      description: "Complete business management platform",
      features: [
        "Unlimited users",
        "QuickBooks integration",
        "AI-powered insights",
        "Advanced reporting",
        "Priority support",
        "Custom workflows",
        "API access",
        "Advanced security features",
      ],
      popular: true,
    },
  ];

  const handleInputChange = (
    field: keyof RegistrationData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.companyName &&
          formData.businessType &&
          formData.industry &&
          formData.teamSize
        );
      case 2:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 3:
        return !!formData.selectedPlan;
      case 4:
        // If AMFREE100 is applied (100% off), skip payment validation
        const isFreeForever = formData.appliedCoupon?.code === "AMFREE100";
        if (isFreeForever) {
          return true; // No payment info required for free forever accounts
        }
        return !!(
          formData.cardNumber &&
          formData.expiryDate &&
          formData.cvv &&
          formData.cardholderName &&
          formData.billingAddress &&
          formData.billingCity &&
          formData.billingState &&
          formData.billingZip
        );
      case 5:
        return formData.acceptTerms && formData.acceptPrivacy;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2 && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setCurrentStep((prev) => prev + 1);
      setError("");
    } else {
      setError("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setError("");
  };

  // Validate coupon by checking ARRSAL Controls coupon system
  const validateCoupon = async (couponCode: string) => {
    if (!couponCode.trim()) return;

    setIsValidatingCoupon(true);
    setError("");

    try {
      // Simulate API call to validate coupon from ARRSAL Controls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sync with ARRSAL Controls coupon management system
      // Only Active coupons can be used
      const validCoupons = [
        {
          code: "AMFREE100",
          type: "Percentage",
          value: 100,
          description: "Free membership forever - Special VIP access",
          status: "Active",
          expiresAt: "2030-12-31",
        },
        {
          code: "WELCOME25",
          type: "Percentage",
          value: 25,
          description: "Welcome discount for new customers",
          status: "Active",
          expiresAt: "2024-12-31",
        },
        {
          code: "HOLIDAY50",
          type: "Fixed Amount",
          value: 50,
          description: "Holiday special discount",
          status: "Active",
          expiresAt: "2024-12-25",
        },
        {
          code: "FIRST10",
          type: "Percentage",
          value: 10,
          description: "First-time customer discount",
          status: "Paused",
          expiresAt: "2025-06-30",
        },
        {
          code: "SUMMER20",
          type: "Percentage",
          value: 20,
          description: "Summer promotion discount",
          status: "Expired",
          expiresAt: "2024-08-31",
        },
      ];

      const coupon = validCoupons.find(
        (c) => c.code.toLowerCase() === couponCode.toLowerCase(),
      );

      if (!coupon) {
        setFormData((prev) => ({ ...prev, appliedCoupon: null }));
        setError("Invalid coupon code");
        return;
      }

      // Check if coupon is active
      if (coupon.status !== "Active") {
        setFormData((prev) => ({ ...prev, appliedCoupon: null }));
        if (coupon.status === "Expired") {
          setError("This coupon has expired");
        } else if (coupon.status === "Paused") {
          setError("This coupon is currently unavailable");
        } else if (coupon.status === "Revoked") {
          setError("This coupon has been revoked and is no longer valid");
        }
        return;
      }

      // Check if coupon is not expired
      const currentDate = new Date();
      const expiryDate = new Date(coupon.expiresAt);
      if (currentDate > expiryDate) {
        setFormData((prev) => ({ ...prev, appliedCoupon: null }));
        setError("This coupon has expired");
        return;
      }

      // Coupon is valid - apply it
      setFormData((prev) => ({ ...prev, appliedCoupon: coupon }));
      setError("");

      // Show success message with a different styling (success message)
      setTimeout(() => {
        if (coupon.type === "Percentage" && coupon.value === 100) {
          setError("✅ Coupon applied! FREE MEMBERSHIP FOREVER! 🎉");
        } else {
          setError(
            `✅ Coupon applied! ${coupon.type === "Percentage" ? coupon.value + "% off" : "$" + coupon.value + " off"}`,
          );
        }
      }, 100);
    } catch (err) {
      setError("Failed to validate coupon. Please try again.");
      setFormData((prev) => ({ ...prev, appliedCoupon: null }));
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setFormData((prev) => ({ ...prev, couponCode: "", appliedCoupon: null }));
    setError("");
  };

  const calculateTotal = () => {
    const basePrice = plans[0].price;
    if (formData.appliedCoupon) {
      if (formData.appliedCoupon.type === "Percentage") {
        return basePrice - (basePrice * formData.appliedCoupon.value) / 100;
      } else {
        return Math.max(0, basePrice - formData.appliedCoupon.value);
      }
    }
    return basePrice;
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      setError("Please accept the terms and privacy policy");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Calculate final price first
      let subscriptionPrice = plans[0].price;
      if (formData.appliedCoupon) {
        subscriptionPrice = calculateTotal();
      }

      const isFreeForever = subscriptionPrice === 0;

      // Step 1: Validate payment information (skip for free forever accounts)
      if (
        !isFreeForever &&
        (!formData.cardNumber || !formData.expiryDate || !formData.cvv)
      ) {
        setError("Please provide complete payment information");
        return;
      }

      if (isFreeForever) {
        console.log("🎉 Creating FREE FOREVER account with AMFREE100 coupon!");
      } else {
        // Step 2: Create Stripe payment method
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Creating Stripe payment method...");

        // Step 3: Create Stripe customer
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Creating Stripe customer...");
      }

      // Step 4: Apply coupon if provided
      if (formData.appliedCoupon) {
        console.log("Applying coupon:", formData.appliedCoupon);
      }

      // Step 5: Create subscription (free forever or with trial)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (isFreeForever) {
        console.log("Creating FREE FOREVER account - no subscription needed!");
      } else {
        console.log("Creating subscription with trial period...");
      }

      // Step 6: Create business account using the business auth system
      const registrationData = {
        companyName: formData.companyName,
        businessType: formData.businessType,
        industry: formData.industry,
        teamSize: formData.teamSize,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        selectedPlan: isFreeForever
          ? "professional-free-forever"
          : "professional",
      };

      console.log(
        "Creating business account with registration data:",
        registrationData,
      );

      // Call the register function to create account and authenticate user
      const registrationSuccess = await register(registrationData);

      if (!registrationSuccess) {
        setError("Account creation failed. Please try again.");
        return;
      }

      // Step 7: Log additional info for tracking
      console.log("Account created successfully!");
      if (isFreeForever) {
        console.log("🎉 FREE FOREVER account created with AMFREE100!");
      } else {
        console.log("Professional account created with payment method");
      }

      // Success - user is now authenticated and will be redirected to dashboard
      onSuccess();
    } catch (err) {
      setError(
        "Payment processing failed. Please check your payment information and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">
                Tell us about your business
              </h3>
              <p className="text-sm text-gray-600">
                Help us customize ARRSAL for your needs
              </p>
            </div>

            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                placeholder="Your Company Inc."
                required
              />
            </div>

            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) =>
                  handleInputChange("businessType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="sole_proprietorship">
                    Sole Proprietorship
                  </SelectItem>
                  <SelectItem value="nonprofit">Non-Profit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleInputChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Financial Services</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="teamSize">Team Size *</Label>
              <Select
                value={formData.teamSize}
                onValueChange={(value) => handleInputChange("teamSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 employees</SelectItem>
                  <SelectItem value="6-20">6-20 employees</SelectItem>
                  <SelectItem value="21-50">21-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="200+">200+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">
                Create your admin account
              </h3>
              <p className="text-sm text-gray-600">
                You'll be the super administrator for your organization
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Smith"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Business Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@yourcompany.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Create a strong password"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with numbers and special
                characters
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Your plan details</h3>
              <p className="text-sm text-gray-600">
                Payment required to start your 14-day free trial
              </p>
            </div>

            <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-900">
                      {plans[0].name}
                    </h4>
                  </div>
                  <p className="text-blue-800 mb-4">{plans[0].description}</p>
                  <ul className="text-sm text-blue-700 space-y-2">
                    {plans[0].features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right ml-6">
                  <div className="text-3xl font-bold text-blue-900">
                    ${plans[0].price}
                  </div>
                  <div className="text-sm text-blue-600">/month</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-orange-800">
                <CreditCard className="h-4 w-4" />
                <span className="font-medium">Payment Required</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                To ensure account security and prevent fraud, we require payment
                information for all business accounts. You will not be charged
                during your 14-day free trial.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Payment Information</h3>
              <p className="text-sm text-gray-600">
                Your card will be charged after the 14-day free trial
              </p>
            </div>

            {/* Coupon Section */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-3">
                Have a coupon?
              </h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code (e.g., WELCOME25)"
                  value={formData.couponCode}
                  onChange={(e) =>
                    handleInputChange(
                      "couponCode",
                      e.target.value.toUpperCase(),
                    )
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => validateCoupon(formData.couponCode)}
                  disabled={!formData.couponCode || isValidatingCoupon}
                >
                  {isValidatingCoupon ? "Checking..." : "Apply"}
                </Button>
              </div>

              {/* Available coupons hint */}
              <div className="mt-2 text-xs text-orange-700">
                <span className="font-medium">Active coupons:</span> AMFREE100
                (FREE FOREVER), WELCOME25 (25% off), HOLIDAY50 ($50 off)
              </div>
              {formData.appliedCoupon && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-green-900">
                        {formData.appliedCoupon.code}
                      </span>
                      <p className="text-sm text-green-700">
                        {formData.appliedCoupon.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">
                Payment Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Professional Plan (monthly)</span>
                  <span>${plans[0].price}.00</span>
                </div>
                {formData.appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon ({formData.appliedCoupon.code})</span>
                    <span>
                      -$
                      {formData.appliedCoupon.type === "Percentage"
                        ? (
                            (plans[0].price * formData.appliedCoupon.value) /
                            100
                          ).toFixed(2)
                        : formData.appliedCoupon.value}
                      .00
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total (after trial)</span>
                  <span>
                    {calculateTotal() === 0 ? (
                      <span className="text-green-600 font-bold">
                        FREE FOREVER! 🎉
                      </span>
                    ) : (
                      `$${calculateTotal().toFixed(2)}/month`
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Free Forever Notice */}
            {formData.appliedCoupon?.code === "AMFREE100" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">
                    🎉 FREE MEMBERSHIP FOREVER!
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  With the AMFREE100 coupon, you get lifetime access to all
                  Professional features at no cost. No payment information
                  required, no trials, no recurring charges - completely FREE!
                </p>
              </div>
            )}

            {/* Credit Card Information */}
            <div
              className={`space-y-4 ${formData.appliedCoupon?.code === "AMFREE100" ? "opacity-50" : ""}`}
            >
              <div>
                <Label htmlFor="cardholderName">
                  Cardholder Name{" "}
                  {formData.appliedCoupon?.code !== "AMFREE100"
                    ? "*"
                    : "(Not required)"}
                </Label>
                <Input
                  id="cardholderName"
                  value={formData.cardholderName}
                  onChange={(e) =>
                    handleInputChange("cardholderName", e.target.value)
                  }
                  placeholder={
                    formData.appliedCoupon?.code === "AMFREE100"
                      ? "Payment not required"
                      : "John Smith"
                  }
                  required={formData.appliedCoupon?.code !== "AMFREE100"}
                  disabled={formData.appliedCoupon?.code === "AMFREE100"}
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    // Format card number with spaces
                    const value = e.target.value
                      .replace(/\s/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim();
                    handleInputChange("cardNumber", value);
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => {
                      // Format MM/YY
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{2})(\d)/, "$1/$2");
                      handleInputChange("expiryDate", value);
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleInputChange("cvv", value);
                    }}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Billing Address</h4>
                <div>
                  <Label htmlFor="billingAddress">Address *</Label>
                  <Input
                    id="billingAddress"
                    value={formData.billingAddress}
                    onChange={(e) =>
                      handleInputChange("billingAddress", e.target.value)
                    }
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingCity">City *</Label>
                    <Input
                      id="billingCity"
                      value={formData.billingCity}
                      onChange={(e) =>
                        handleInputChange("billingCity", e.target.value)
                      }
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingState">State *</Label>
                    <Input
                      id="billingState"
                      value={formData.billingState}
                      onChange={(e) =>
                        handleInputChange("billingState", e.target.value)
                      }
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="billingZip">ZIP Code *</Label>
                  <Input
                    id="billingZip"
                    value={formData.billingZip}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleInputChange("billingZip", value);
                    }}
                    placeholder="10001"
                    maxLength={5}
                    required
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Your payment information is encrypted and secure. You will not
                  be charged during your 14-day free trial.
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Final step</h3>
              <p className="text-sm text-gray-600">
                Review and confirm your account
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Account Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Company:</span>
                  <div className="font-medium">{formData.companyName}</div>
                </div>
                <div>
                  <span className="text-gray-600">Admin:</span>
                  <div className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <div className="font-medium">{formData.email}</div>
                </div>
                <div>
                  <span className="text-gray-600">Plan:</span>
                  <div className="font-medium">
                    Professional (${calculateTotal().toFixed(2)}/month)
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Payment:</span>
                  <div className="font-medium">
                    ****{formData.cardNumber.slice(-4)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Trial Period:</span>
                  <div className="font-medium">14 days free</div>
                </div>
              </div>
            </div>

            {/* Legal checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptTerms", !!checked)
                  }
                />
                <Label
                  htmlFor="acceptTerms"
                  className="text-sm leading-relaxed"
                >
                  I agree to ARRSAL's{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    End User License Agreement
                  </a>
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptPrivacy", !!checked)
                  }
                />
                <Label
                  htmlFor="acceptPrivacy"
                  className="text-sm leading-relaxed"
                >
                  I acknowledge that I have read and understood ARRSAL's{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) =>
                    handleInputChange("marketingConsent", !!checked)
                  }
                />
                <Label
                  htmlFor="marketingConsent"
                  className="text-sm leading-relaxed"
                >
                  I would like to receive product updates and marketing
                  communications from ARRSAL (optional)
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-full z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create Business Account
          </CardTitle>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`w-8 h-0.5 mx-1 ${
                        step < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Step {currentStep} of 5
          </div>
        </CardHeader>

        <CardContent>
          {renderStep()}

          {error && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                error.startsWith("✅")
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`text-sm ${
                  error.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {error}
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}

            {currentStep < 5 ? (
              <Button
                onClick={handleNext}
                className={`flex-1 ${
                  currentStep === 4 &&
                  formData.appliedCoupon?.code === "AMFREE100"
                    ? "bg-green-600 hover:bg-green-700"
                    : ""
                }`}
                disabled={!validateStep(currentStep)}
              >
                {currentStep === 4 &&
                formData.appliedCoupon?.code === "AMFREE100"
                  ? "Continue - No Payment Required! 🎉"
                  : "Continue"}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex-1"
                disabled={!validateStep(5) || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Complete Registration
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
