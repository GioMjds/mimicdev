import { Request, Response } from "express";
import passport from "passport";

export const githubLogin = (req: Request, res: Response, next: any) => {
    passport.authenticate('github', { scope: ['user'] }, (err: any, user: any, info: any) => {
        err && next(err);
        !user && res.redirect('/login');
        req.logIn(user, (err) => {
            err && next(err);
            return res.redirect('/profile');
        });
    })(req, res, next);
};

export const githubCallback = (req: Request, res: Response, next: any) => {
    passport.authenticate('github', { failureRedirect: '/login' }, (err: any, user: any, info: any) => {
        err && next(err);
        !user && res.redirect('/login');
        req.logIn(user, (err) => {
            err && next(err);
            return res.redirect('/profile');
        });
    })(req, res, next);
};

export const googleLogin = (req: Request, res: Response, next: any) => {
    passport.authenticate('google', { scope: ['profile', 'email'] }, (err: any, user: any, info: any) => {
        err && next(err);
        !user && res.redirect('/login');
        req.logIn(user, (err) => {
            err && next(err);
            return res.redirect('/profile');
        })
    })(req, res, next);
};

export const googleCallback = (req: Request, res: Response, next: any) => {
    passport.authenticate('google', { failureRedirect: '/login' }, (err: any, user: any, info: any) => {
        err && next(err);
        !user && res.redirect('/login');
        req.logIn(user, (err) => {
            err && next(err);
            return res.redirect('/profile');
        });
    })(req, res, next);
};

export const login = (req: Request, res: Response) => {
    res.render('login');
};

export const register = (req: Request, res: Response) => {
    res.render('register');
};

export const logout = (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
    });
    res.redirect('/login');
};

export const profile = (req: Request, res: Response) => {
    res.render('profile', { user: req.user });
};