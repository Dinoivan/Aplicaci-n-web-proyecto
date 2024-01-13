import { useState} from "react";


export function useValidarState(){

    const [currentStep, setCurrentStep] = useState(1);
    const [email,setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return {
        currentStep,setCurrentStep,
        email,setEmail,
        verificationCode,setVerificationCode,
        newPassword,setNewPassword,
        showPassword,setShowPassword,
        isModalOpen,setIsModalOpen,
        errorMessage,setErrorMessage
    }

}

