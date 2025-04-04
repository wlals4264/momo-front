import { atom } from 'recoil';
import { UpdatedUserProfile } from '../types/User';
import { ActiveState } from '../types/Post';
import { ChatRoomResponse } from '../types/Chat';

// 로그인 유저인지
export const isLoginUserState = atom<boolean>({
  key: 'isLoginUserState',
  default: false,
});

// 마이페이지 & 유저
export const isFormInvalidFormState = atom<boolean>({
  key: 'isValidUserFormState',
  default: false,
});

export const updatedUserDataState = atom<UpdatedUserProfile>({
  key: 'updatedUserDataState',
  default: {},
});

export const isActiveState = atom<ActiveState>({
  key: 'isActiveState',
  default: 'isHosted',
});

// 채팅
export const isChatModalOpenState = atom<boolean>({
  key: 'isChatModalOpenState',
  default: false,
});

export const isChatListOpenState = atom<boolean>({
  key: 'isChatListOpenState',
  default: true,
});

export const isChatRoomOpenState = atom<boolean>({
  key: 'isChatRoomOpenState',
  default: false,
});

export const isViewParticipantListOpenState = atom<boolean>({
  key: 'isViewParticipantListOpenState',
  default: false,
});

export const selectedChatState = atom<ChatRoomResponse | null>({
  key: 'selectedChatState',
  default: null,
});
