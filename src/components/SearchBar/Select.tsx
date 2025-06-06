import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface SelectProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const Select = ({ selectedOption, setSelectedOption }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options = [
    { value: 'location', label: '장소' },
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
  ];

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="w-[82px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-5 py-1.5 outline-none flex items-center justify-between"
      >
        {options.find(option => option.value === selectedOption)?.label}
        <FaChevronDown className="w-[18px] h-[18px] text-gray-400" />
      </button>
      {isOpen && (
        <ul className="absolute w-full bg-white rounded-md z-10 border border-gray-400 mt-2">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-5 py-0.5 hover:underline cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
