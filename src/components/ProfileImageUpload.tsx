import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

type ProfileImageUploadProps = {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
  profileURL?: string | null;
  onProfileImageChange?: (newImageURL: string | null) => void;
};
const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  setProfileImage,
  profileURL,
  onProfileImageChange,
}) => {
  const [updatedProfileURL, setUpdatedProfileURL] = useState<string | null>(
    profileURL ?? null
  );
  const uploadProfileImage = '/image/upload_profile_image.webp';
  const defaultImage = '/image/default_profile_image.webp';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (profileImage) {
      const objectURL = URL.createObjectURL(profileImage);
      setUpdatedProfileURL(objectURL);

      if (onProfileImageChange) {
        onProfileImageChange(objectURL);
      }

      return () => {
        if (objectURL) {
          URL.revokeObjectURL(objectURL);
        }
      };
    } else {
      setUpdatedProfileURL(profileURL ?? null);
    }
  }, [profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileImage(file);
    }
    setIsModalOpen(false);
  };

  const handleResetImage = () => {
    setUpdatedProfileURL(defaultImage);
    if (onProfileImageChange) {
      onProfileImageChange(defaultImage);
    }
    setProfileImage(null);
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <label
        className="cursor-pointer"
        onClick={
          profileImage || updatedProfileURL ? handleOpenModal : undefined
        }
      >
        <img
          src={
            location.pathname === '/mypage/my-profile'
              ? updatedProfileURL || defaultImage
              : updatedProfileURL || uploadProfileImage
          }
          alt="Profile"
          className="w-[150px] h-[150px] object-cover rounded-full  border-gray-600 border-[1px] p-[5px]"
        />
        {(!profileImage || !profileURL) && (
          <input
            id="file-upload"
            type="file"
            className="hidden "
            accept=".jpg,.jpeg,.png"
            disabled={!!profileURL || !!profileImage}
            onChange={handleFileChange}
          />
        )}
      </label>

      {/* 모달 */}
      {isModalOpen && (
        <dialog id="my_modal_2" className="modal modal-open">
          <div className="modal-box flex flex-col justify-between items-center max-w-[260px] py-8 px-6 h-44 gap-4 rounded-3xl">
            <button
              type="button"
              className="btn btn-second w-full"
              onClick={handleResetImage}
            >
              기본 이미지로 설정
            </button>
            <label
              htmlFor="file-update"
              className="btn btn-second cursor-pointer w-full"
            >
              프로필 이미지 선택
              <input
                id="file-update"
                type="file"
                className="hidden "
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
            <div className="modal-actio absolute top-3 right-3">
              <button
                type="button"
                className="font-extrabold"
                onClick={handleCloseModal}
              >
                <MdClose />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProfileImageUpload;
