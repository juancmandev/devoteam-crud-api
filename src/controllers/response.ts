import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import ResponseProps from '../interfaces/ResponseProps';

export const getResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  const response: [ResponseProps] = result.data;

  return res.status(200).json({
    message: 'Hello!',
  });
};

export const setResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = await req.body;
  console.log(body);

  return res.status(200).json({
    message: 'Data received!',
  });
};
