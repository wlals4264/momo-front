import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Categories from '../components/Categories';
import FormField from '../components/FormField';
import KakaoMapModal from '../components/modals/KakaoMapModal';
import useCreatePostForm from '../hooks/useCreatePostForm';
import { useToggleCategory } from '../hooks/useToggleCategory';
import { Place } from '../types/Post';
import {
  getLocalDateTime,
  getOneYearLaterDateTime,
} from '../utils/getLocalDateTime';

const CreatePostPage = () => {
  const {
    formData,
    thumbnailURL,
    handleSubmit,
    handleFileChange,
    handleInputChange,
    updateLocation,
    updateCategories,
  } = useCreatePostForm();

  const { categories, toggleCategory } = useToggleCategory();

  useEffect(() => {
    updateCategories(categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchPlace = (place: Place) => {
    setSelectedPlace(place);
    updateLocation(place.id, place.y, place.x, place.address_name);
    closeModal();
  };

  return (
    <>
      <div className="flex justify-center px-16 py-10">
        <div className="w-full max-w-5xl px-14">
          <h1 className="text-2xl font-bold mb-6 text-center">밥친구 구하기</h1>
          <form onSubmit={handleSubmit} className="flex gap-x-8 justify-center">
            <div className="space-y-4">
              <FormField
                label="제목"
                type="text"
                value={formData.title}
                name="title"
                onChange={handleInputChange}
                minLength={1}
                maxLength={60}
              />
              <FormField
                label="모임 날짜"
                type="datetime-local"
                size="60"
                value={formData.meetingDateTime}
                name="meetingDateTime"
                onChange={handleInputChange}
                min={getLocalDateTime()}
                max={getOneYearLaterDateTime()}
              />
              <FormField
                label="모임 인원"
                type="number"
                size="24"
                value={formData.maxCount === 0 ? '' : formData.maxCount}
                name="maxCount"
                onChange={handleInputChange}
                min={2}
                max={99}
              />
              <div className="form-control gap-y-4">
                <div className="label">
                  <span className="label-text font-bold">장소</span>
                </div>
                <input
                  type="text"
                  value={selectedPlace?.place_name || ''}
                  placeholder="장소"
                  readOnly
                  className="input input-bordered"
                />
                <input
                  type="text"
                  value={formData.address}
                  placeholder="주소"
                  readOnly
                  className="input input-bordered"
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={openModal}
                >
                  모임 장소 찾기
                </button>
              </div>
              <div className="form-control">
                <div className="label">
                  <span className="label-text font-bold">카테고리</span>
                </div>
                <Categories
                  selectedCategories={categories}
                  toggleCategory={toggleCategory}
                  size="xs"
                />
              </div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text font-bold">내용</span>
                </div>
                <textarea
                  className="textarea textarea-bordered max-w-sm text-sm"
                  rows={4}
                  value={formData.content}
                  name="content"
                  onChange={handleInputChange}
                  minLength={1}
                  maxLength={600}
                  required
                />
              </label>
            </div>
            <div className="flex flex-col justify-between">
              <label htmlFor="file-upload" className="cursor-pointer">
                <img
                  src={thumbnailURL || 'image/upload_image.webp'}
                  alt="Thumbnail"
                  className="w-[280px] h-[178.48px] object-cover rounded-3xl"
                />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {selectedPlace && (
                <div className="mt-4">
                  <Map
                    center={{
                      lat: parseFloat(selectedPlace.y),
                      lng: parseFloat(selectedPlace.x),
                    }}
                    className="w-[280px] h-[280px]"
                    level={5}
                  >
                    <MapMarker
                      position={{
                        lat: parseFloat(selectedPlace.y),
                        lng: parseFloat(selectedPlace.x),
                      }}
                    />
                  </Map>
                </div>
              )}
              <div className="flex justify-end mt-auto">
                <button type="submit" className="btn btn-primary">
                  업로드
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <KakaoMapModal onClose={closeModal} onSearch={handleSearchPlace} />
      )}
    </>
  );
};

export default CreatePostPage;
