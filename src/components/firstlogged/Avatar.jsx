import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import { CiCircleRemove } from "react-icons/ci";
import { MdError } from "react-icons/md";

const Avatar = () => {
    const [preview, setPreview] = useState(null);

    const {
        avatar,
        setAvatar,
        avatarDone,
        setAvatarDone,
    } = useContext(Context);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    useEffect(() => {
        if (avatar) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // base64 preview
            };
            reader.readAsDataURL(avatar);
            setAvatarDone(true);
        } else {
            setPreview(null);
            setAvatarDone(false);
        }
    }, [avatar]);

    return (
        <div className='w-full flex flex-col items-center justify-center gap-7 mt-[6rem]'>
            <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Upload your picture</p>
            <p className='flex flex-row gap-2 items-center text-start w-full text-vngrey3 text-sm -mb-5'><MdError />Aceept only: png, jpg, jpeg, etc..</p>
            <div className="w-full flex items-center justify-between relative">
                <button
                    onClick={() => {
                        setPreview(null);
                        setAvatar(null);
                        setAvatarDone(false);
                    }}
                    className="absolute right-0 top-0 z-10 text-center p-2 bg-error text-vnwhite rounded-lg hover:bg-vnblack2 transition duration-300 ease-in-out">
                    <CiCircleRemove />

                </button>
                <input
                    className="w-full p-20 border border-gray-300 rounded-lg"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} />
            </div>


            {preview && (
                <img src={preview} alt="Profile Preview" className="rounded-full w-1/2" />
            )}
        </div>
    );
}

export default Avatar