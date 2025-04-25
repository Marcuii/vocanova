import { createContext } from "react";

const Context = createContext(
    {
        //app login
        handleLogin: () => {},
        //login
        inEmail: "",
        setInEmail: () => {},
        inEmailError: "",
        setInEmailError: () => {},
        inPassword: "",
        setInPassword: () => {},
        inPasswordError: "",
        setInPasswordError: () => {},
        loginError: "",
        setLoginError: () => {},
        //register
        upName: "",
        setUpName: () => {},
        upNameError: "",
        setUpNameError: () => {},
        upEmail: "",
        setUpEmail: () => {},
        upEmailError: "",
        setUpEmailError: () => {},
        upPassword: "",
        setUpPassword: () => {},
        upPasswordError: "",
        setUpPasswordError: () => {},
        upCPassword: "",
        setUpCPassword: () => {},
        upConfirmPasswordError: "",
        setUpConfirmPasswordError: () => {},
        //recovery
        inRecoveryEmail: "",
        setInRecoveryEmail: () => {},
        inRecoveryEmailError: "",
        setInRecoveryEmailError: () => {},
    }
);

export default Context;