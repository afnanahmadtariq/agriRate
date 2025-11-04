import { ForumPost, ForumReply } from '@/types';

// Mock forum posts data
export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    authorId: 'user1',
    authorName: 'احمد علی',
    title: 'گندم کی فصل میں زرد پتے',
    content: 'میری گندم کی فصل میں پتے پیلے ہو رہے ہیں۔ کیا یہ نائٹروجن کی کمی ہے؟',
    category: 'question',
    categoryUrdu: 'سوالات',
    likes: 15,
    replies: 8,
    views: 142,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ['گندم', 'بیماری', 'کھاد'],
    language: 'ur'
  },
  {
    id: '2',
    authorId: 'user2',
    authorName: 'محمد حسن',
    title: 'ڈرپ ایریگیشن کے فوائد',
    content: 'میں نے ڈرپ ایریگیشن لگائی ہے۔ پانی کی 40% بچت ہو رہی ہے۔ سب کو سفارش کرتا ہوں۔',
    category: 'tip',
    categoryUrdu: 'نکات',
    likes: 45,
    replies: 12,
    views: 289,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    tags: ['آبپاشی', 'ٹیکنالوجی', 'پانی کی بچت'],
    language: 'ur'
  },
  {
    id: '3',
    authorId: 'user3',
    authorName: 'فاطمہ بی بی',
    title: 'کپاس کی بمپر فصل',
    content: 'اللہ کا شکر ہے، اس سال کپاس کی بہت اچھی پیداوار ہوئی ہے۔ نئی قسم کا بیج استعمال کیا تھا۔',
    category: 'success',
    categoryUrdu: 'کامیابی',
    likes: 67,
    replies: 23,
    views: 456,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    tags: ['کپاس', 'کامیابی', 'بیج'],
    language: 'ur'
  },
  {
    id: '4',
    authorId: 'user4',
    authorName: 'سلیم خان',
    title: 'ٹماٹر میں کیڑوں کا حملہ',
    content: 'میرے ٹماٹروں پر سفید مکھیاں حملہ آور ہیں۔ کوئی قدرتی حل؟',
    category: 'issue',
    categoryUrdu: 'مسائل',
    likes: 23,
    replies: 15,
    views: 198,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['ٹماٹر', 'کیڑے', 'سبزیاں'],
    language: 'ur'
  },
  {
    id: '5',
    authorId: 'user5',
    authorName: 'Bilal Ahmed',
    title: 'Best time to harvest wheat?',
    content: 'My wheat crop is almost ready. What are the signs that it\'s time to harvest?',
    category: 'question',
    categoryUrdu: 'سوالات',
    likes: 18,
    replies: 9,
    views: 167,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ['wheat', 'harvest', 'timing'],
    language: 'en'
  },
  {
    id: '6',
    authorId: 'user6',
    authorName: 'عمران شاہ',
    title: 'مرچوں کی کاشت کا طریقہ',
    content: 'اگر آپ مرچیں لگانا چاہتے ہیں تو یہ نکات یاد رکھیں:\n1. نرسری میں پہلے پودے تیار کریں\n2. 45 سینٹی میٹر کا فاصلہ رکھیں\n3. پانی کا خیال رکھیں',
    category: 'tip',
    categoryUrdu: 'نکات',
    likes: 34,
    replies: 7,
    views: 221,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    tags: ['مرچ', 'سبزیاں', 'کاشت'],
    language: 'ur'
  },
  {
    id: '7',
    authorId: 'user7',
    authorName: 'زاہد حسین',
    title: 'چاول کی فصل میں پانی کم',
    content: 'ہمارے علاقے میں پانی کی قلت ہے۔ چاول کی فصل کیسے بچائیں؟',
    category: 'issue',
    categoryUrdu: 'مسائل',
    likes: 29,
    replies: 18,
    views: 245,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    tags: ['چاول', 'پانی', 'قلت'],
    language: 'ur'
  },
  {
    id: '8',
    authorId: 'user8',
    authorName: 'عائشہ ملک',
    title: 'نامیاتی کھیتی میں کامیابی',
    content: 'تین سال سے نامیاتی طریقے سے کھیتی کر رہی ہوں۔ زمین کی زرخیزی بہت بہتر ہوئی ہے۔',
    category: 'success',
    categoryUrdu: 'کامیابی',
    likes: 52,
    replies: 21,
    views: 334,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    tags: ['نامیاتی', 'کامیابی', 'زرخیزی'],
    language: 'ur'
  }
];

// Mock forum replies
export const mockForumReplies: Record<string, ForumReply[]> = {
  '1': [
    {
      id: 'r1-1',
      postId: '1',
      authorId: 'user9',
      authorName: 'ڈاکٹر امجد',
      content: 'جی ہاں، یہ نائٹروجن کی کمی کی علامت ہو سکتی ہے۔ یوریا کھاد ڈالیں۔',
      likes: 8,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000)
    },
    {
      id: 'r1-2',
      postId: '1',
      authorId: 'user10',
      authorName: 'کاشف علی',
      content: 'میں نے بھی یہی مسئلہ دیکھا تھا۔ DAP کھاد بہت کارآمد ثابت ہوئی۔',
      likes: 5,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000)
    }
  ],
  '2': [
    {
      id: 'r2-1',
      postId: '2',
      authorId: 'user11',
      authorName: 'سعید احمد',
      content: 'بہت اچھی معلومات۔ ڈرپ سسٹم کی قیمت کیا ہے؟',
      likes: 12,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000)
    }
  ],
  '4': [
    {
      id: 'r4-1',
      postId: '4',
      authorId: 'user12',
      authorName: 'نبیل احسن',
      content: 'نیم کا تیل بہت کارآمد ہے۔ صبح سویرے سپرے کریں۔',
      likes: 7,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000)
    },
    {
      id: 'r4-2',
      postId: '4',
      authorId: 'user13',
      authorName: 'راشد محمود',
      content: 'لہسن پانی کا سپرے بھی فائدہ مند ہے۔',
      likes: 4,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000)
    }
  ]
};

// Get posts by category
export function getPostsByCategory(category?: string): ForumPost[] {
  if (!category || category === 'all') {
    return mockForumPosts;
  }
  return mockForumPosts.filter(post => post.category === category);
}

// Search posts
export function searchPosts(query: string): ForumPost[] {
  const lowerQuery = query.toLowerCase();
  return mockForumPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get post by ID
export function getPostById(id: string): ForumPost | undefined {
  return mockForumPosts.find(post => post.id === id);
}

// Get replies for a post
export function getRepliesForPost(postId: string): ForumReply[] {
  return mockForumReplies[postId] || [];
}

// Get trending posts (by views and recent likes)
export function getTrendingPosts(limit: number = 5): ForumPost[] {
  return [...mockForumPosts]
    .sort((a, b) => (b.likes + b.views) - (a.likes + a.views))
    .slice(0, limit);
}

// Get recent posts
export function getRecentPosts(limit: number = 10): ForumPost[] {
  return [...mockForumPosts]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}
