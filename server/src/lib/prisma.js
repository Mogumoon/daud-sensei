import pkg from '@prisma/client';

const { PrismaClient } = pkg;

// Simple fallback for Vercel deployment
let prisma;

try {
  prisma = new PrismaClient();
} catch (error) {
  console.warn('Prisma initialization failed, using mock client:', error.message);
  
  // Mock Prisma for demo purposes
  prisma = {
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
        // Demo user for testing
        if (where.email === 'demo@example.com' || where.username === 'demo') {
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
      }
    },
    quizResult: {
      create: async (data) => ({
        id: 'quiz-' + Date.now(),
        ...data.data,
        createdAt: new Date()
      })
    },
    chatLog: {
      create: async (data) => ({
        id: 'chat-' + Date.now(),
        ...data.data,
        createdAt: new Date()
      })
    },
    $disconnect: async () => console.log('Mock disconnect')
  };
}

export default prisma;
