import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useEditProfile from '../../hooks/useEditProfile';
import useMyProfile from '../../hooks/useMyProfile';
import {
  isFormInvalidFormState,
  updatedUserDataState,
} from '../../states/recoilState';
import LoadingSpinner from '../LoadingSpinner';
import ProfileImageUpload from '../ProfileImageUpload';
import InfoForm from './InfoForm';

const MyProfile = () => {
  const {
    data: profileData,
    isLoading: fetchProfileDataIsLoading,
    isError: fetchProfileDataIsError,
  } = useMyProfile();

  const [isModified, setIsModified] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const isInvalidUserForm = useRecoilValue(isFormInvalidFormState);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(
    profileData?.profileImage ?? null
  );
  const [updatedUserData, setUpdatedUserData] =
    useRecoilState(updatedUserDataState);

  useEffect(() => {
    if (profileData) {
      setProfileImageURL(profileData.profileImage);
    }
  }, [profileData]);

  // 프로필 이미지 변경 이벤트 핸들러
  const handleProfileImageChange = useCallback(
    (newImageUrl: string | null) => {
      setProfileImageURL(newImageUrl);

      if (newImageUrl) {
        setUpdatedUserData(prevData => ({
          ...prevData,
          profileImageUrl: newImageUrl,
        }));
      }
    },
    [setUpdatedUserData]
  );

  const { mutate: editProfile, isPending: editProfileIsPending } =
    useEditProfile();

  const formData = new FormData();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profileImageUrl, ...requestData } = updatedUserData;

  formData.append(
    'updateRequest',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' })
  );
  formData.append('profileImage', profileImage || '');

  // 저장 버튼
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    editProfile(formData);

    setIsModified(false);
    setIsCanceled(false);
    setUpdatedUserData({});
  };

  // 취소 버튼
  const handleCancel = () => {
    setProfileImage(null);
    setIsModified(false);
    setIsCanceled(true);
    setProfileImageURL(profileImageURL);
    setUpdatedUserData({});
  };

  if (fetchProfileDataIsLoading || editProfileIsPending) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center font-bold text-3xl">
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchProfileDataIsError) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center">
        프로필 조회 중 에러가 발생했습니다.
      </div>
    );
  }

  return (
    profileData && (
      <div className="w-full">
        <div className="w-[680px] m-auto flex flex-col items-center mt-[30px]">
          {isModified ? (
            <div className="mb-[30px]">
              <ProfileImageUpload
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                profileURL={profileImageURL}
                onProfileImageChange={handleProfileImageChange}
              />
            </div>
          ) : (
            <img
              src={
                profileData?.profileImage || '/image/default_profile_image.webp'
              }
              alt="user profile image"
              className="w-[150px] h-[150px] object-cover rounded-full mb-[30px] border-[1px] border-gray-600 bg-white p-[5px]"
            />
          )}

          <InfoForm
            isModified={isModified}
            isCanceled={isCanceled}
            profileData={profileData.allData}
          />

          <div className="w-full flex justify-end my-10">
            {isModified ? (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-second"
                >
                  취소
                </button>
                <button
                  type="submit"
                  onClick={e => handleSubmit(e)}
                  className="btn btn-primary disabled:border-none"
                  disabled={!!isInvalidUserForm}
                >
                  저장
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsModified(true);
                }}
                className="btn btn-primary"
              >
                수정하기
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
