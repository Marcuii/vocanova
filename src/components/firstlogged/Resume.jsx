import { useContext, useEffect } from "react";
import Context from "../../Context";
import { CiCircleRemove } from "react-icons/ci";
import { MdError } from "react-icons/md";

const Resume = () => {
    const {
        resume,
        setResume,
        resumeDone,
        setResumeDone,
    } = useContext(Context);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };

    useEffect(() => {
        if (resume) {
            setResumeDone(true);
        } else {
            setResumeDone(null);
        }
    }, [resume]);

    return (
        <div className='w-full flex flex-col items-center justify-center gap-7 mt-[6rem]'>
            <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Upload your resume</p>
            <p className='flex flex-row gap-2 items-center text-start w-full text-vngrey3 text-sm -mb-5'><MdError />Aceept only: doc, docx, pdf, etc..</p>
            <div className="w-full flex items-center justify-between relative">
                <button
                    onClick={() => {
                        setResume(null);
                        setResumeDone(false);
                    }}
                    className="absolute right-0 top-0 z-10 text-center p-2 bg-error text-vnwhite rounded-lg hover:bg-vnblack2 transition duration-300 ease-in-out">
                    <CiCircleRemove />

                </button>
                <input
                    className="w-full p-20 border border-gray-300 rounded-lg"
                    type="file"
                    accept=".doc, .docx, .pdf"
                    onChange={handleFileChange} />
            </div>

        </div>
    );
}

export default Resume