import { useState } from "react";

const useForgotPasswordViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [isEmailFilled, setIsEmailFilled] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailFilled(text !== "");
  };

  const handleNext = () => {
    if (email) {
      navigation.navigate("ForgotPasswordOtp", { email });
    } else {
      console.warn("Please enter your email");
    }
  };

  return {
    email,
    isEmailFilled,
    handleEmailChange,
    handleNext,
  };
};

export default useForgotPasswordViewModel;
