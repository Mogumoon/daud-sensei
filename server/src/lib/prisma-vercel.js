import pkg from '@prisma/client';

const { PrismaClient } = pkg;

// Global variable to store Prisma instance
let prisma;

// Initialize Prisma client for Vercel
function initPrisma() {
  if (!prisma) {
    try {
      prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL || 'file:./dev.db'
          }
        }
      });
      
      console.log('Prisma client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Prisma client:', error);
      // Fallback: return mock client for demo
      prisma = createMockPrisma();
    }
  }
  return prisma;
}

// Mock Prisma client for demo purposes when database fails
function createMockPrisma() {
  console.log('Using mock Prisma client for demo');
  
  return {
    user: {
      create: async (data) => ({
        id: 'demo-user-' + Date.now(),
        ...data.data,
        xp: 0,
        level: 1,
        streak: 0,
        createdAt: new Date(),
        lastActive: new Date()
      }),
      findUnique: async ({ where }) => {
        if (where.email === 'demo@example.com') {
          return {
            id: 'demo-user-123',
            email: 'demo@example.com',
            username: 'demo',
            password: '$2b$10$demo.hash.for.testing',
            xp: 100,
            level: 2,
            streak: 5
          };
        }
        return null;
      },
      update: async ({ where, data }) => ({
        id: where.id,
        ...data,
        updatedAt: new Date()
      })
    },
    quizResult: {
      create: async (data) => ({
        id: 'quiz-' + Date.now(),
        ...data.data,
        createdAt: new Date()
      }),
      findMany: async () => []
    },
    chatLog: {
      create: async (data) => ({
        id: 'chat-' + Date.now(),
        ...data.data,
        createdAt: new Date()
      })
    },
    userBadge: {
      create: async (data) => ({
        id: 'badge-' + Date.now(),
        ...data.data,
        earnedAt: new Date()
      }),
      findMany: async () => []
    },
    $disconnect: async () => {
      console.log('Mock Prisma disconnect');
    }
  };
}

export default initPrisma();