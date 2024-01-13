import { useState} from "react";

export function useLoginState(){

const [isModalOpen, setIsModalOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

return {

    isModalOpen, setIsModalOpen,
    errorMessage, setErrorMessage,
    username, setUsername,
    password, setPassword,
    showPassword, setShowPassword,

};

}
