import { useContext, useEffect, useState } from 'react';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import Personal from '../../components/firstlogged/Personal';
import Experience from '../../components/firstlogged/Experience';
import Skills from '../../components/firstlogged/Skills';
import Avatar from '../../components/firstlogged/Avatar';
import Context from '../../Context';
import Resume from '../../components/firstlogged/Resume';
import { useNavigate } from 'react-router';
import { MdError } from 'react-icons/md';


const ProfileSetup = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [actButton, setActButton] = useState(true);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    

    const {
        //App states
        loggedIn,
        setLoggedIn,
        firstLogin,
        setFirstLogin,

        //profile setup
        personalDone,
        setPersonalDone,
        experienceDone,
        setExperienceDone,
        skillsDone,
        setSkillsDone,
        avatarDone,
        setAvatarDone,
        resumeDone,
        setResumeDone,

        //submit profile
        submitProfileError,
        setSubmitProfileError,
        //app profile setup
        handleProfileSetup,
    } = useContext(Context);

    const navigate = useNavigate()

    // Redirect to home or profile-complete page if logged in
    useEffect(() => {
        if (!firstLogin || !loggedIn) {
            navigate("/")
        }
    }, [firstLogin])

    const handleNext = () => {
        if (activeStep === 0) {
            if (personalDone) {
                setActiveStep((cur) => cur + 1);
            } 
        } else if (activeStep === 1) {
            if (experienceDone) {
                setActiveStep((cur) => cur + 1);
            } 
        } else if (activeStep === 2) {
            if (skillsDone) {
                setActiveStep((cur) => cur + 1);
            }
        } else if (activeStep === 3) {
            if (true) {
                setActiveStep((cur) => cur + 1);
            }
        } else if (activeStep === 4) {
            if (resumeDone) {
             handleProfileSetup()
            }
        }
    
    }
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    

    useEffect(() => {
        if (activeStep === 0 && !personalDone) {
            setActButton(true);
        } else if (activeStep === 1 && !experienceDone) {
            setActButton(true);
        } else if (activeStep === 2 && !skillsDone) {
            setActButton(true);
        } else if (activeStep === 3) {
            setActButton(false);
        } else if (activeStep === 4 && !resumeDone) {
            setActButton(true);
        } else {
            setActButton(false);
        }
    }, [activeStep, personalDone, experienceDone, skillsDone, resumeDone]);





    return (
        <div className="w-full h-full flex flex-row items-center justify-center lg:justify-start gap-4 p-4 lg:pl-11">
            <div className='w-5/6 lg:w-1/3 lg:ml-12 xl:ml-20 flex flex-col items-center text-start gap-7'>
                <h1 className='w-full text-3xl'>Share a bit about yourself.</h1>
                <p className='w-full text-vngrey3 font-thin'>Select your field of work. This information will help us optimize your experience.</p>

                {submitProfileError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{submitProfileError}</p>}

                <div className="w-full h-full">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                    >
                        <Step>
                            <UserIcon className="h-5 w-5" />
                            <div className="absolute -bottom-[3rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 0 ? "blue-gray" : "gray"}
                                >
                                    Personal
                                </Typography>
                            </div>
                        </Step>
                        <Step>
                            <CogIcon className="h-5 w-5" />
                            <div className="absolute -bottom-[3rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 1 ? "blue-gray" : "gray"}
                                >
                                    Experience
                                </Typography>
                            </div>
                        </Step>
                        <Step>
                            <BuildingLibraryIcon className="h-5 w-5" />
                            <div className="absolute -bottom-[3rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 2 ? "blue-gray" : "gray"}
                                >
                                    Skills
                                </Typography>
                            </div>
                        </Step>
                        <Step>
                            <BuildingLibraryIcon className="h-5 w-5" />
                            <div className="absolute -bottom-[3rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 3 ? "blue-gray" : "gray"}
                                >
                                    Avatar
                                </Typography>
                            </div>
                        </Step>
                        <Step>
                            <BuildingLibraryIcon className="h-5 w-5" />
                            <div className="absolute -bottom-[3rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 4 ? "blue-gray" : "gray"}
                                >
                                    Resume
                                </Typography>
                            </div>
                        </Step>
                    </Stepper>
                    {activeStep === 0 && <Personal />}
                    {activeStep === 1 && <Experience />}
                    {activeStep === 2 && <Skills />}
                    {activeStep === 3 && <Avatar />}
                    {activeStep === 4 && <Resume />}
                    <div className="mt-12 flex justify-between">
                        <Button onClick={handlePrev} disabled={isFirstStep}>
                            Prev
                        </Button>
                        <Button onClick={handleNext} disabled={actButton} className={isLastStep ? "bg-primary" : "bg-black"} >
                            {activeStep <3 && "Next"}
                            {activeStep === 3 && !avatarDone && "Skip"}
                            {activeStep === 3 && avatarDone && "Next"}
                            {isLastStep && "Submit"}
                        </Button>
                    </div>
                </div>

            </div>

            <img className='hidden lg:block max-w-[50%] min-h-screen lg:absolute right-0 ' src="./assets/profile.png" alt="recovery" />
        </div>
    )
}

export default ProfileSetup