import { Restaurant } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '鼎泰豐',
    cuisine: '中式料理',
    rating: 4.8,
    priceRange: '$$$',
    distance: 1.0,
    address: '台北市信義區信義路五段8號B1',
    phone: '+886 2 8101 7799',
    website: 'https://www.dintaifung.com.tw',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '知名小籠包店，提供各式精緻點心。',
    openingHours: {
      '星期一': '11:00-21:00',
      '星期二': '11:00-21:00',
      '星期三': '11:00-21:00',
      '星期四': '11:00-21:00',
      '星期五': '11:00-21:30',
      '星期六': '11:00-21:30',
      '星期日': '11:00-21:00'
    },
    coordinates: { lat: 25.0330, lng: 121.5645 }
  },
  {
    id: '2',
    name: '阜杭豆漿',
    cuisine: '中式料理',
    rating: 4.5,
    priceRange: '$',
    distance: 0.5,
    address: '台北市中正區忠孝東路一段108號2樓',
    phone: '+886 2 2392 2175',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '排隊人氣早餐店，招牌厚餅油條與豆漿。',
    openingHours: {
      '星期一': '休息',
      '星期二': '05:30-12:30',
      '星期三': '05:30-12:30',
      '星期四': '05:30-12:30',
      '星期五': '05:30-12:30',
      '星期六': '05:30-12:30',
      '星期日': '05:30-12:30'
    },
    coordinates: { lat: 25.0478, lng: 121.5170 }
  },
  {
    id: '3',
    name: '春水堂',
    cuisine: '咖啡廳',
    rating: 4.3,
    priceRange: '$$',
    distance: 1.2,
    address: '台中市西區公益路45號',
    phone: '+886 4 2327 2828',
    website: 'https://www.chunshuitang.com.tw',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '珍珠奶茶發源地，提供茶飲及簡餐。',
    openingHours: {
      '星期一': '11:00-22:00',
      '星期二': '11:00-22:00',
      '星期三': '11:00-22:00',
      '星期四': '11:00-22:00',
      '星期五': '11:00-22:00',
      '星期六': '11:00-22:00',
      '星期日': '11:00-22:00'
    },
    coordinates: { lat: 24.1460, lng: 120.6623 }
  },
  {
    id: '4',
    name: '阿宗麵線',
    cuisine: '中式料理',
    rating: 4.4,
    priceRange: '$',
    distance: 0.8,
    address: '台北市萬華區峨嵋街8-1號',
    phone: '+886 2 2388 8808',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '以大腸麵線聞名的街頭小吃。',
    openingHours: {
      '星期一': '09:00-22:30',
      '星期二': '09:00-22:30',
      '星期三': '09:00-22:30',
      '星期四': '09:00-22:30',
      '星期五': '09:00-23:00',
      '星期六': '09:00-23:00',
      '星期日': '09:00-22:30'
    },
    coordinates: { lat: 25.0422, lng: 121.5083 }
  },
  {
    id: '5',
    name: '誠屋拉麵',
    cuisine: '日式料理',
    rating: 4.2,
    priceRange: '$$',
    distance: 1.5,
    address: '台北市大安區敦化南路一段190巷',
    phone: '+886 2 2741 5568',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '濃郁豚骨湯頭的日式拉麵店。',
    openingHours: {
      '星期一': '11:00-22:00',
      '星期二': '11:00-22:00',
      '星期三': '11:00-22:00',
      '星期四': '11:00-22:00',
      '星期五': '11:00-22:00',
      '星期六': '11:00-22:00',
      '星期日': '11:00-22:00'
    },
    coordinates: { lat: 25.0402, lng: 121.5525 }
  },
  {
    id: '6',
    name: '貳樓餐廳',
    cuisine: '美式料理',
    rating: 4.3,
    priceRange: '$$',
    distance: 1.0,
    address: '台北市大安區復興南路一段107巷11號',
    phone: '+886 2 2700 9855',
    website: 'https://www.secondfloorcafe.com',
    image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '提供美式早午餐與多樣化餐點。',
    openingHours: {
      '星期一': '09:00-21:30',
      '星期二': '09:00-21:30',
      '星期三': '09:00-21:30',
      '星期四': '09:00-21:30',
      '星期五': '09:00-21:30',
      '星期六': '08:30-21:30',
      '星期日': '08:30-21:30'
    },
    coordinates: { lat: 25.0395, lng: 121.5438 }
  },
  {
    id: '7',
    name: 'Taco 阿郎',
    cuisine: '墨西哥料理',
    rating: 4.0,
    priceRange: '$$',
    distance: 2.0,
    address: '台北市大安區延吉街123號',
    phone: '+886 2 8773 1234',
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '道地墨西哥捲餅與塔可。',
    openingHours: {
      '星期一': '11:30-21:00',
      '星期二': '11:30-21:00',
      '星期三': '11:30-21:00',
      '星期四': '11:30-21:00',
      '星期五': '11:30-22:00',
      '星期六': '11:30-22:00',
      '星期日': '11:30-21:00'
    },
    coordinates: { lat: 25.0418, lng: 121.5566 }
  },
  {
    id: '8',
    name: '藍象廷泰鍋',
    cuisine: '泰式料理',
    rating: 4.5,
    priceRange: '$$',
    distance: 2.5,
    address: '台北市信義區松壽路11號',
    phone: '+886 2 2729 2028',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: '結合泰式風味的火鍋餐廳。',
    openingHours: {
      '星期一': '11:00-22:00',
      '星期二': '11:00-22:00',
      '星期三': '11:00-22:00',
      '星期四': '11:00-22:00',
      '星期五': '11:00-22:30',
      '星期六': '11:00-22:30',
      '星期日': '11:00-22:00'
    },
    coordinates: { lat: 25.0340, lng: 121.5660 }
  }
];

export const cuisineTypes = [
  '全部', '日式料理', '義式料理', '印度料理', '美式料理', '中式料理',
  '咖啡廳', '墨西哥料理', '地中海料理', '泰式料理', '韓式料理', '法式料理'
];

export const priceRanges = ['$', '$$', '$$$', '$$$$'];
