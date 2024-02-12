import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import hidePassword from "../helpers/hidePassword";
import createError from "../helpers/createError";
import { Prisma } from "@prisma/client";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const data = (({ username, name, email }) => ({
      username,
      name,
      email,
      password: hashedPassword,
    }))(req.body);
    const newCustomer = await prisma.customer.create({ data });
    req.login(newCustomer, (err) => {
      if (err) return next(err);

      // set cookie
      res.cookie("xpulse.userid", newCustomer.id, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none",
      });

      res.status(201).send({
        customer: hidePassword(newCustomer as User),
      });
    });
  } catch (err) {
    next(err);
  }
};

export const authenticateWithSSO = async (
  req: Request<{}, {}, SSORequestFields>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, authId, thumbnail, provider } = req.body;

    for (const field of ["name", "email", "authId", "provider"]) {
      if (!req.body[field as keyof SSORequestFields]) {
        return next(
          createError("Request body is missing required field(s).", 400)
        );
      }
    }

    const data = { name, username: email, email, avatar: thumbnail };
    let customer: Prisma.CustomerGetPayload<{}>;
    const oAuthProfileOrNull = await prisma.oAuthProfile.findFirst({
      where: { authId, provider },
    });

    if (oAuthProfileOrNull) {
      customer = await prisma.customer.upsert({
        where: { id: oAuthProfileOrNull.customerId },
        update: data,
        create: data,
      });
    } else {
      customer = await prisma.customer.create({ data });
      await prisma.oAuthProfile.create({
        data: { authId, customerId: customer.id, provider },
      });
    }

    // set cookie
    res.cookie("xpulse.userid", customer.id, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
    });

    req.login(customer, (err) => {
      if (err) return next(err);
      res.status(201).send({ customer });
    });
  } catch (err) {
    next(err);
  }
};

export const login = (req: Request, res: Response) => {
  // set cookie
  res.cookie("xpulse.userid", (req.user as User).id, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "none",
  });

  res.status(200).send({
    customer: hidePassword(req.user as User),
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization === "swagger ui") {
    return res.send({ msg: "Successfully logged out." });
  }

  const username = (req.user as User).username;

  // Delete cookie
  res.clearCookie("xpulse.userid");

  req.logout((err: Error) => {
    if (err) return next(err);
    res.send({ msg: username + " is now logged out." });
  });
};
