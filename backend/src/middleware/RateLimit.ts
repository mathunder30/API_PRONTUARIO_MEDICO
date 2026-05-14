import { Request, Response, NextFunction } from "express";

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const attempts = new Map<string, RateLimitEntry>();

export const authRateLimit = (req: Request, res: Response, next: NextFunction) => {
    const windowMs = 15 * 60 * 1000;
    const maxAttempts = 10;
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const entry = attempts.get(key);

    if (!entry || entry.resetAt <= now) {
        attempts.set(key, { count: 1, resetAt: now + windowMs });
        next();
        return;
    }

    if (entry.count >= maxAttempts) {
        res.status(429).json({ message: "Muitas tentativas. Tente novamente mais tarde." });
        return;
    }

    entry.count += 1;
    next();
};
