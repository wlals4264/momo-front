import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import useSearchMeetings from '../hooks/useSearchMeetings';
import { useToggleCategory } from '../hooks/useToggleCategory';
import { Post } from '../types/Post';

const ListPage = () => {
  const { data, isLoading, isError } = useSearchMeetings({});
  const posts: Post[] = data?.meetings || [];
  const [searchFilter, setSearchFilter] = useState<string>('location');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const { categories: selectedCategories, toggleCategory } =
    useToggleCategory();
  const debouncedSelectedCategories = useDebounce(selectedCategories, 300);
  const navigate = useNavigate();

  const filterPosts = (
    targetCategories: string[],
    query: string,
    filter: string
  ) => {
    return posts.filter(post => {
      const matchesCategory =
        targetCategories.length === 0 ||
        targetCategories.some(category => post.category.includes(category));
      const matchesSearch =
        !query ||
        (filter === 'location' && post.address.includes(query)) ||
        (filter === 'title' && post.title.includes(query)) ||
        (filter === 'content' && post.content.includes(query));

      return matchesCategory && matchesSearch;
    });
  };

  useEffect(() => {
    setFilteredPosts(
      filterPosts(debouncedSelectedCategories, searchQuery, searchFilter)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, debouncedSelectedCategories]);

  const handleSearch = () => {
    setFilteredPosts(
      filterPosts(debouncedSelectedCategories, searchQuery, searchFilter)
    );
  };

  const handleCreatePost = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      if (confirm('로그인 하시겠습니까?')) {
        navigate('/login');
      }
      return;
    }
    navigate('/create');
  };

  const handleNavigateToDetail = (id: number) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="px-16 py-10">
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        posts={filteredPosts}
        setFilteredPosts={setFilteredPosts}
      />
      <div className="mt-[30px] flex justify-between">
        <div className="w-[123px]" />
        <div className="flex justify-center">
          <Categories
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />
        </div>
        <button
          className="btn btn-primary w-[123px]"
          onClick={handleCreatePost}
        >
          밥친구 구하기
        </button>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-start mt-[26px]">
          {filteredPosts.map((post, index) => (
            <div key={index} className="w-full">
              <PostCard
                post={post}
                onClick={() => handleNavigateToDetail(post.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full text-center items-center flex flex-col justify-center mt-40">
          {isError ? (
            '에러가 발생했습니다.'
          ) : isLoading ? (
            <LoadingSpinner />
          ) : (
            '게시물이 없습니다.'
          )}
        </div>
      )}
    </div>
  );
};

export default ListPage;
