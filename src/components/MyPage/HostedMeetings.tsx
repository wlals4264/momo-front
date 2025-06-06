import { useRecoilValue } from 'recoil';
import { isActiveState } from '../../states/recoilState';
import PostCard from '../PostCard';
import useGetMyMeetings from '../../hooks/useGetmyMeetings';

const HostedMeetings = () => {
  const { data } = useGetMyMeetings({});
  const isActive = useRecoilValue(isActiveState);

  if (data === undefined) return;

  const posts = data.createdMeetingDtos;

  return (
    <div className="px-8 py-1">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-start mt-[26px]">
          {posts.map((post, index) => (
            <div key={index} className="w-full">
              <PostCard post={post} isHosted={isActive === 'isHosted'} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          주최한 모임이 없습니다.
        </div>
      )}
    </div>
  );
};

export default HostedMeetings;
