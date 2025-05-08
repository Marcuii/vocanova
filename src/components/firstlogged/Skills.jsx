import { useContext, useEffect, useState } from 'react'
import Context from '../../Context';
import { MdError, MdRemove } from 'react-icons/md';
import { FaPlus } from "react-icons/fa";


const Skills = () => {
    // Hard and soft skills states
    const [curHardSkill, setCurHardSkill] = useState("");
    const [curSoftSkill, setCurSoftSkill] = useState("");

    const {
        hardSkills,
        setHardSkills,
        hardSkillsError,
        setHardSkillsError,
        softSkills,
        setSoftSkills,
        softSkillsError,
        setSoftSkillsError,

        skillsDone,
        setSkillsDone,
    } = useContext(Context);

    // Function to handle adding hard skills
    const handleAddHardSkill = () => {
        if (curHardSkill !== "") {
            if (hardSkills.length < 7) {
                // Check if the skill already exists
                if (hardSkills.includes(curHardSkill)) {
                    setHardSkillsError("This hard skill already exists.");
                } else if (!/^[a-zA-Z\s]+$/.test(curHardSkill)) {
                    setHardSkillsError("Please enter a valid hard skill (letters and spaces only).");
                } else {
                    setHardSkills([...hardSkills, curHardSkill]);
                    setHardSkillsError("");
                    checkHardSkill();
                }
            } else {
                setHardSkillsError("You can only add up to 7 hard skills.");
            }
        } else {
            setHardSkillsError("Please enter a hard skill.");
        }
    };
    const checkHardSkill = () => {
        if (hardSkills.length < 3) {
            setHardSkillsError("Please enter at least 3 hard skills.");
        } else {
            setHardSkillsError("");
        }
    };

    // Function to handle removing hard skills
    const handleRemoveHardSkill = (index) => {
        const newHardSkills = [...hardSkills];
        newHardSkills.splice(index, 1);
        setHardSkills(newHardSkills);
        checkHardSkill();
    };

    // Function to handle adding soft skills
    const handleAddSoftSkill = () => {
        if (curSoftSkill !== "") {
            if (softSkills.length < 7) {
                // Check if the skill already exists
                if (softSkills.includes(curSoftSkill)) {
                    setSoftSkillsError("This soft skill already exists.");
                } else if (!/^[a-zA-Z\s]+$/.test(curSoftSkill)) {
                    setSoftSkillsError("Please enter a valid soft skill (letters and spaces only).");
                } else {
                    setSoftSkills([...softSkills, curSoftSkill]);
                    setSoftSkillsError("");
                    checkSoftSkill();
                }
            } else {
                setSoftSkillsError("You can only add up to 7 soft skills.");
            }
        } else {
            setSoftSkillsError("Please enter a soft skill.");
        }
    };
    const checkSoftSkill = () => {
        if (softSkills.length < 3) {
            setSoftSkillsError("Please enter at least 3 soft skills.");
        } else {
            setSoftSkillsError("");
        }
    };

    // Function to handle removing soft skills
    const handleRemoveSoftSkill = (index) => {
        const newSoftSkills = [...softSkills];
        newSoftSkills.splice(index, 1);
        setSoftSkills(newSoftSkills);
        checkSoftSkill();
    };

    useEffect(() => {
        checkHardSkill();
        checkSoftSkill();
    }, [hardSkills, softSkills]);

    useEffect(() => {
        if (hardSkills.length >= 3 && softSkills.length >= 3) {
            setSkillsDone(true);
        } else {
            setSkillsDone(false);
        }
    }, [hardSkills, softSkills]);

    return (
        <div className='w-full flex flex-col items-center justify-center gap-7 mt-[6rem]'>
            <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Hard Skills</p>
            {hardSkillsError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{hardSkillsError}</p>}
            <div className='flex flex-row relative items-center justify-between w-full'>
                <input
                    onChange={(e) => {setCurHardSkill(e.target.value)}}
                    className="w-full p-4 border-2 z-0 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
                />
                <button
                    className="absolute h-full right-0 z-10 w-12 text-center p-4 bg-vngrey3 text-vnwhite rounded-lg hover:bg-vnblack2 transition duration-300 ease-in-out"
                    onClick={() => handleAddHardSkill()}
                >
                    <FaPlus />
                </button>
            </div>

            <div className='w-full flex flex-wrap items-center justify-start gap-4'>
                {hardSkills.map((skill, idx) => (
                    <div key={idx} className='flex flex-row bg-primary rounded-xl p-2 items-center justify-center gap-2'>
                        <p className='text-vngrey5 text-lg'>{skill}</p>
                        <button
                            className="text-center p-2 bg-error text-vnwhite rounded-xl hover:bg-vnblack2 transition duration-300 ease-in-out"
                            onClick={() => handleRemoveHardSkill(idx)}
                        >
                            <MdRemove />
                        </button>
                    </div>
                ))}
            </div>

            <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Soft Skills</p>
            {softSkillsError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{softSkillsError}</p>}
            <div className='flex flex-row relative items-center justify-between w-full'>
                <input
                    onChange={(e) => {setCurSoftSkill(e.target.value)}}
                    className="w-full p-4 border-2 z-0 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
                />
                <button
                    className="absolute h-full right-0 z-10 w-12 text-center p-4 bg-vngrey3 text-vnwhite rounded-lg hover:bg-vnblack2 transition duration-300 ease-in-out"
                    onClick={() => handleAddSoftSkill()}
                >
                    <FaPlus />
                </button>
            </div>

            <div className='w-full flex flex-wrap items-center justify-start gap-4'>
                {softSkills.map((skill, idx) => (
                    <div key={idx} className='flex flex-row bg-secondary rounded-xl p-2 items-center justify-center gap-2'>
                        <p className='text-vngrey2 text-lg'>{skill}</p>
                        <button
                            className="text-center p-2 bg-error text-vnwhite rounded-xl hover:bg-vnblack2 transition duration-300 ease-in-out"
                            onClick={() => handleRemoveSoftSkill(idx)}
                        >
                            <MdRemove />
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Skills