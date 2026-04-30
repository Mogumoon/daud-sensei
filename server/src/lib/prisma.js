import pkg from "@prisma/client";

const { PrismaClient } = pkg;

let prisma;

const mockStore = {
  users: [],
  quizResults: [],
  badges: [],
};

function createMockPrisma() {
  const findUser = ({ where }) => {
    if (!where) return null;
    if (where.id) return mockStore.users.find((u) => u.id === where.id) || null;
    if (where.email)
      return mockStore.users.find((u) => u.email === where.email) || null;
    if (where.username)
      return mockStore.users.find((u) => u.username === where.username) || null;
    return null;
  };

  return {
    user: {
      create: async ({ data }) => {
        const user = {
          id: `mock-user-${Date.now()}-${mockStore.users.length + 1}`,
          xp: 0,
          level: 1,
          streak: 0,
          createdAt: new Date(),
          lastActive: new Date(),
          ...data,
        };
        mockStore.users.push(user);
        return user;
      },
      findUnique: async (args) => findUser(args),
      findFirst: async ({ where }) => {
        if (!where || !where.OR) return null;
        for (const condition of where.OR) {
          const user = findUser({ where: condition });
          if (user) return user;
        }
        return null;
      },
      update: async ({ where, data }) => {
        const user = findUser({ where });
        if (!user) return null;
        Object.assign(user, data);
        return user;
      },
    },
    quizResult: {
      createMany: async ({ data }) => {
        const created = data.map((item) => {
          const record = {
            id: `mock-quiz-${Date.now()}-${mockStore.quizResults.length + 1}`,
            createdAt: new Date(),
            ...item,
          };
          mockStore.quizResults.push(record);
          return record;
        });
        return created;
      },
      findMany: async ({ where }) => {
        if (!where) return mockStore.quizResults;
        return mockStore.quizResults.filter((r) => r.userId === where.userId);
      },
    },
    userBadge: {
      createMany: async ({ data }) => {
        const created = [];
        for (const item of data) {
          const exists = mockStore.badges.some(
            (b) => b.userId === item.userId && b.badgeId === item.badgeId,
          );
          if (!exists) {
            const badge = {
              id: `mock-badge-${Date.now()}-${mockStore.badges.length + 1}`,
              earnedAt: new Date(),
              ...item,
            };
            mockStore.badges.push(badge);
            created.push(badge);
          }
        }
        return created;
      },
      findMany: async ({ where }) => {
        return mockStore.badges.filter((b) => b.userId === where.userId);
      },
    },
    chatLog: {
      create: async ({ data }) => {
        const chat = {
          id: `mock-chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: new Date(),
          ...data,
        };
        return chat;
      },
    },
    $disconnect: async () => {
      console.log("Mock Prisma disconnect");
    },
  };
}

function initPrisma() {
  if (!prisma) {
    try {
      prisma = new PrismaClient();
    } catch (error) {
      console.warn(
        "Prisma initialization failed, using mock client:",
        error.message,
      );
      prisma = createMockPrisma();
    }
  }
  return prisma;
}

export default initPrisma();
