import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import JoinField from './JoinField.tsx';
import { useMBTIValidation } from '../../hooks/useMBTIValidation.ts';
import ProfileImageUpload from '../ProfileImageUpload.tsx';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient.ts';

type profileForm = {
  gender: string;
  birth: string;
  introduction: string;
  mbti: string;
};

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

const CreateProfile = () => {
  const [profileForm, setProfileForm] = useState<profileForm>({
    gender: '',
    birth: '',
    introduction: '',
    mbti: '',
  });

  // TODO: MBTI 선택할 수 있도록 셀렉터 제공 리팩토링 예정
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: name === 'mbti' ? value.toUpperCase() : value,
    }));
  };

  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const toggleGenderButton = (gender: Gender) => {
    setSelectedGender(gender);
    setProfileForm(prev => ({ ...prev, gender }));
  };
  const today = new Date();
  const maxDay = today.toISOString().slice(0, 10);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(null);
  const { mbtiError, validateMBTI } = useMBTIValidation();
  const navigate = useNavigate();

  const isDisabled =
    !profileForm.gender ||
    !profileForm.birth ||
    (!!profileForm.mbti && !!mbtiError);

  const [createProfileError, setCreateProfileError] = useState<string | null>(
    null
  );

  const formData = new FormData();

  const requestData: Record<string, string> = {
    gender: profileForm.gender,
    birth: profileForm.birth,
    ...(profileForm.introduction && { introduction: profileForm.introduction }),
    ...(profileForm.mbti && { mbti: profileForm.mbti }),
  };

  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' })
  );

  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  const handleProfileImageChange = useCallback((newImageUrl: string | null) => {
    setProfileImageURL(newImageUrl);
  }, []);

  const { mutate: createProfile } = useMutation({
    mutationFn: async () => {
      const response = await apiClient({
        url: '/api/v1/profiles',
        method: 'post',
        data: formData,
      });
      return response;
    },
    onSuccess: () => {
      navigate('/mypage/my-profile');
    },
    onError: err => {
      if (err && err instanceof AxiosError)
        if (err.response?.status === 409 || err.response?.status === 400) {
          setCreateProfileError(err.response?.data.message);
        } else {
          setCreateProfileError(err.message);
        }
    },
  });

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProfile();
  };

  return (
    <div className="w-full h-screen flex justify-center mt-8">
      <form
        className="w-[320px] flex flex-col gap-4"
        onSubmit={handleProfileSubmit}
      >
        <label
          htmlFor="file-upload"
          className="w-full flex justify-center cursor-pointer"
        >
          <ProfileImageUpload
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            profileURL={profileImageURL}
            onProfileImageChange={handleProfileImageChange}
          />
        </label>
        <div>
          <label className="block mb-2">
            <span className="font-bold text-sm">성별*</span>
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              className={`btn w-32 ${
                selectedGender === Gender.MALE ? 'btn-primary' : 'btn-second'
              }`}
              onClick={() => toggleGenderButton(Gender.MALE)}
            >
              남성
            </button>
            <button
              type="button"
              className={`btn w-32 ${
                selectedGender === Gender.FEMALE ? 'btn-primary' : 'btn-second'
              }`}
              onClick={() => toggleGenderButton(Gender.FEMALE)}
            >
              여성
            </button>
          </div>
        </div>
        <JoinField
          name="birth"
          label="생년 월일*"
          type="date"
          value={profileForm.birth}
          onChange={handleChange}
          required
          error={null}
          max={maxDay}
          min="1900-01-01"
          placeholder="생년월일을 입력하세요."
        />
        <JoinField
          name="mbti"
          label="MBTI"
          type="text"
          value={profileForm.mbti}
          onChange={handleChange}
          onBlur={e => validateMBTI(e.target.value)}
          error={mbtiError}
          placeholder="MBTI를 입력해주세요."
          required={false}
          length={4}
        />
        <div>
          <label htmlFor="introduction" className="block mb-2">
            <span className="font-bold text-sm">자기소개</span>
          </label>
          <textarea
            id="introduction"
            className="textarea textarea-bordered w-full p-4 placeholder-gray-500 font-bold text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            rows={2}
            value={profileForm.introduction}
            name="introduction"
            onChange={handleChange}
            placeholder="간단한 자기소개를 입력해주세요."
            maxLength={150}
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className={`btn ${isDisabled ? 'btn-disabled' : 'btn-primary'}`}
        >
          프로필 생성하기
        </button>
        <p className="font-bold text-sm text-gray-500">
          *표시된 항목은 필수 입력 항목입니다.
        </p>

        {createProfileError && (
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error">
            {createProfileError}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateProfile;
