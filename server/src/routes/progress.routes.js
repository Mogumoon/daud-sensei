import express from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get full progress data for logged in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        quizResults: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
        badges: true,
      },
    });

    res.json({
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      quizHistory: user.quizResults,
      earnedBadges: user.badges.map(b => b.badgeId),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data progress' });
  }
});

// Sync progress (used when guest registers/logs in, or after a quiz)
router.post('/sync', authMiddleware, async (req, res) => {
  try {
    const { xpToAdd, quizzes, badges } = req.body;
    
    // Update user stats
    let user = await prisma.user.findUnique({ where: { id: req.user.id } });
    
    let newXp = user.xp + (xpToAdd || 0);
    // Simple level calculation (100 XP per level)
    let newLevel = Math.max(1, Math.floor(newXp / 100) + 1);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXp,
        level: newLevel,
        // For streak logic, we simplify it here for the MVP
      },
    });

    // Add new quiz results if any
    if (quizzes && quizzes.length > 0) {
      await prisma.quizResult.createMany({
        data: quizzes.map(q => ({
          userId: user.id,
          quizType: q.category,
          score: q.score,
          totalQ: q.total,
          xpEarned: q.xpEarned,
          timeTaken: 0,
          mode: q.mode || 'practice',
        })),
        skipDuplicates: true,
      });
    }

    // Add new badges if any
    if (badges && badges.length > 0) {
      const existingBadges = await prisma.userBadge.findMany({
        where: { userId: user.id },
      });
      const existingBadgeIds = existingBadges.map(b => b.badgeId);
      
      const newBadges = badges.filter(b => !existingBadgeIds.includes(b));
      
      if (newBadges.length > 0) {
        await prisma.userBadge.createMany({
          data: newBadges.map(b => ({
            userId: user.id,
            badgeId: b,
          })),
        });
      }
    }

    res.json({ message: 'Progress berhasil disinkronkan' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal sinkronisasi progress' });
  }
});

export default router;
