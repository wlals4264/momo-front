// import type { CreateMeetingResponse } from '../types/Meeting';
// export const meetings: CreateMeetingResponse[] = [
//   {
//     id: 1,
//     title: '한식 좋아하는 사람 모여요!',
//     locationId: 72,
//     latitude: 37.5,
//     longitude: 127.036,
//     address: '서울 강남구 테헤란로 123',
//     meetingDateTime: '2025-02-11T12:00:00',
//     maxCount: 8,
//     approvedCount: 3,
//     category: ['한식', '디저트'],
//     content:
//       '이번 주 토요일, 맛있는 한식과 디저트를 즐기고 싶어요! 함께 할 분들을 모집합니다. 식사 후 커피도 함께 나누어요.',
//     thumbnail: 'https://placekitten.com/200/200',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 2,
//     title: '일식 좋아하는 분들 모여요!',
//     locationId: 23,
//     latitude: 37.511,
//     longitude: 127.041,
//     address: '서울 강남구 역삼동 56-8',
//     meetingDateTime: '2025-01-25T18:30:00',
//     maxCount: 6,
//     approvedCount: 2,
//     category: ['일식'],
//     content:
//       '일식 좋아하시는 분들 모여서 맛있는 초밥과 라멘을 즐기고 싶은 분들 모집합니다! 대화도 나누고 편하게 밥 먹을 친구들을 모집합니다.',
//     thumbnail: 'https://placekitten.com/300/300',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 3,
//     title: '중식 좋아하는 사람 모여요!',
//     locationId: 15,
//     latitude: 37.517,
//     longitude: 127.038,
//     address: '서울 강남구 논현로 79',
//     meetingDateTime: '2025-02-05T19:00:00',
//     maxCount: 10,
//     approvedCount: 4,
//     category: ['중식'],
//     content:
//       '짜장면, 짬뽕, 탕수육을 좋아하는 분들 모여서 함께 즐겁게 중식을 먹고 대화도 나눠요!',
//     thumbnail: 'https://placekitten.com/400/400',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 4,
//     title: '양식 좋아하는 사람들 모여요!',
//     locationId: 42,
//     latitude: 37.523,
//     longitude: 127.042,
//     address: '서울 강남구 신사동 650-1',
//     meetingDateTime: '2025-01-30T20:00:00',
//     maxCount: 7,
//     approvedCount: 3,
//     category: ['양식'],
//     content:
//       '피자, 파스타 좋아하는 분들 모여서 맛있는 양식을 즐기고 싶어요! 함께 대화하며 좋은 시간을 보낼 사람을 모집합니다.',
//     thumbnail: 'https://placekitten.com/300/200',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 5,
//     title: '디저트와 커피 좋아하는 사람 모여요!',
//     locationId: 64,
//     latitude: 37.51,
//     longitude: 127.039,
//     address: '서울 강남구 삼성로 130',
//     meetingDateTime: '2025-01-28T14:30:00',
//     maxCount: 6,
//     approvedCount: 2,
//     category: ['디저트'],
//     content:
//       '디저트를 좋아하는 분들, 맛있는 케이크와 커피를 함께 즐기며 이야기 나눠요!',
//     thumbnail: 'https://placekitten.com/500/500',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 6,
//     title: '채식주의자 모임, 건강한 한끼',
//     locationId: 71,
//     latitude: 37.522,
//     longitude: 127.045,
//     address: '서울 강남구 청담동 10-2',
//     meetingDateTime: '2025-02-01T12:00:00',
//     maxCount: 8,
//     approvedCount: 3,
//     category: ['한식', '기타'],
//     content:
//       '채식 식단을 좋아하시는 분들 모여서 건강한 한끼를 나누고 싶은 분들 모집합니다!',
//     thumbnail: 'https://placekitten.com/350/350',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 7,
//     title: '디저트 마니아들 모여요!',
//     locationId: 56,
//     latitude: 37.515,
//     longitude: 127.035,
//     address: '서울 강남구 테헤란로 200',
//     meetingDateTime: '2025-01-22T15:30:00',
//     maxCount: 9,
//     approvedCount: 4,
//     category: ['디저트'],
//     content:
//       '디저트 마니아들이 함께 모여 다양한 디저트를 즐기며 이야기를 나누는 시간을 가져요!',
//     thumbnail: 'https://placekitten.com/450/300',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 8,
//     title: '한식과 디저트 좋아하는 사람 모여요!',
//     locationId: 32,
//     latitude: 37.51,
//     longitude: 127.039,
//     address: '서울 강남구 역삼동 99',
//     meetingDateTime: '2025-02-10T18:00:00',
//     maxCount: 7,
//     approvedCount: 3,
//     category: ['한식', '디저트'],
//     content:
//       '맛있는 한식과 달콤한 디저트를 좋아하는 사람들 모여서 함께 식사하고 즐거운 시간을 보내요!',
//     thumbnail: 'https://placekitten.com/300/400',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 9,
//     title: '양식 애호가들 모여요!',
//     locationId: 55,
//     latitude: 37.518,
//     longitude: 127.043,
//     address: '서울 강남구 도산대로 100',
//     meetingDateTime: '2025-01-29T19:00:00',
//     maxCount: 8,
//     approvedCount: 5,
//     category: ['양식'],
//     content:
//       '파스타, 피자, 스테이크를 좋아하는 분들 모여서 함께 좋은 시간을 보낼 친구들을 모집합니다.',
//     thumbnail: 'https://placekitten.com/250/250',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 10,
//     title: '다 함께 먹는 중식의 즐거움',
//     locationId: 20,
//     latitude: 37.52,
//     longitude: 127.041,
//     address: '서울 강남구 삼성로 45',
//     meetingDateTime: '2025-02-07T18:30:00',
//     maxCount: 10,
//     approvedCount: 6,
//     category: ['중식'],
//     content:
//       '중식을 좋아하는 사람들 모여서 짜장면, 짬뽕, 탕수육 등 맛있는 음식을 함께 나누고 싶어요!',
//     thumbnail: 'https://placekitten.com/300/500',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 11,
//     title: '한식, 일식, 중식 먹을 사람 모집!',
//     locationId: 33,
//     latitude: 37.509,
//     longitude: 127.04,
//     address: '서울 강남구 논현로 190',
//     meetingDateTime: '2025-02-12T20:00:00',
//     maxCount: 6,
//     approvedCount: 2,
//     category: ['한식', '일식', '중식'],
//     content:
//       '다양한 음식을 좋아하는 분들 모여서 함께 즐기고 싶어요! 대화도 나누고 편하게 식사할 사람을 모집합니다.',
//     thumbnail: 'https://placekitten.com/200/300',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 12,
//     title: '건강식 좋아하는 사람 모여요!',
//     locationId: 48,
//     latitude: 37.505,
//     longitude: 127.042,
//     address: '서울 강남구 청담동 34-12',
//     meetingDateTime: '2025-01-26T11:30:00',
//     maxCount: 8,
//     approvedCount: 3,
//     category: ['한식', '기타'],
//     content:
//       '건강한 음식을 좋아하는 분들 모여서 함께 맛있는 건강식을 즐겨요. 좋은 사람들과 대화도 나누고 싶어요.',
//     thumbnail: 'https://placekitten.com/350/350',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 13,
//     title: '디저트와 함께하는 맛있는 시간',
//     locationId: 44,
//     latitude: 37.518,
//     longitude: 127.037,
//     address: '서울 강남구 학동로 70',
//     meetingDateTime: '2025-01-31T15:00:00',
//     maxCount: 10,
//     approvedCount: 4,
//     category: ['디저트'],
//     content:
//       '디저트와 함께 즐거운 시간을 보내고 싶은 사람들 모여요! 커피와 케이크를 즐기며 소소한 이야기 나누어요.',
//     thumbnail: 'https://placekitten.com/200/400',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 14,
//     title: '다양한 음식 좋아하는 사람 모여요!',
//     locationId: 36,
//     latitude: 37.514,
//     longitude: 127.046,
//     address: '서울 강남구 선릉로 45',
//     meetingDateTime: '2025-01-22T19:00:00',
//     maxCount: 8,
//     approvedCount: 5,
//     category: ['한식', '일식', '양식'],
//     content:
//       '다양한 음식을 즐기고 싶은 사람들 모여요! 맛있는 음식을 함께 나누며 즐거운 시간을 보내요.',
//     thumbnail: 'https://placekitten.com/250/350',
//     meetingStatus: 'RECRUITING',
//   },
//   {
//     id: 15,
//     title: '맛있는 식사와 함께 즐거운 시간 보내요!',
//     locationId: 39,
//     latitude: 37.509,
//     longitude: 127.04,
//     address: '서울 강남구 도산대로 100',
//     meetingDateTime: '2025-02-03T19:30:00',
//     maxCount: 6,
//     approvedCount: 4,
//     category: ['기타'],
//     content:
//       '맛있는 음식을 함께 즐기고 싶어요! 모두 함께 식사하고 대화 나누는 시간을 가져요.',
//     thumbnail: 'https://placekitten.com/300/300',
//     meetingStatus: 'RECRUITING',
//   },
// ];
