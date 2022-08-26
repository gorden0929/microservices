import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import * as jwt from 'jsonwebtoken';

const projectId = process.env.GCP_PROJECT;

// import * as admin from 'firebase-admin';

export const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
  console.time('authenticate time');

  const idToken = req.headers.authorization?.split(' ')[1];

  if (!idToken) {
    res.status(401).send({
      message: 'Authorization header is required',
      status: 'error'
    });
    return;
  }

  console.time('get public key time');
  const publicKeyResponse = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
  const publicKeyObject = await publicKeyResponse.json();
  console.timeEnd('get public key time');
  const publicKeyList = Object.keys(publicKeyObject).map(key => {
    return {
      key: key,
      passphrase: publicKeyObject[key],
    }
  });

  let decodedToken;

  const jwtPayload = jwt.verify(idToken, publicKeyList[0].passphrase, { algorithms: ['RS256'] }) as jwt.JwtPayload;
  for (const publicKey of publicKeyList) {
    console.log(publicKey.passphrase);
    // if (jwtPayload && jwtPayload.exp && jwtPayload.iat && jwtPayload.aud && jwtPayload.iss && jwtPayload.sub) {
    //   try {
    //     // exp must be future time
    //     if (jwtPayload.exp < Date.now() / 1000) {
    //       throw new Error('Token expired');
    //     }
    //     // iat must past time
    //     if (jwtPayload.iat > Date.now() / 1000) {
    //       throw new Error('Token not yet valid');
    //     }
    //     // aud must be project id
    //     if (jwtPayload.aud !== projectId) {
    //       throw new Error('Token not for this project');
    //     }
    //     // iss must be https://securetoken.google.com/<projectId>
    //     if (jwtPayload.iss !== `https://securetoken.google.com/${projectId}`) {
    //       throw new Error('Token not for this project');
    //     }
    //     if (!jwtPayload.sub) {
    //       throw new Error('uuid is not found');
    //     }
    //     const user = await admin.auth().getUser(jwtPayload.sub);
    //     decodedToken = jwtPayload;
    //     break;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }

  if (!decodedToken) {
    res.status(401).send({
      message: 'Invalid token',
      status: 'error'
    });
    return;
  }




  // try {
  //   console.time('verifyToken');
  //   const decodedToken = await admin.auth().verifyIdToken(idToken);
  //   if (!decodedToken || !decodedToken.uid) {
  //     res.status(401).send({
  //       status: 'error',
  //       message: 'Token verify failed'
  //     });
  //     return;
  //   }
  //   console.timeEnd('verifyToken');

  //   console.time('getUser');
  //   const user = await admin.auth().getUser(decodedToken.uid);
  //   if (!user) {
  //     res.status(401).send({
  //       status: 'error',
  //       message: 'User not found'
  //     });
  //     return;
  //   }
  //   console.timeEnd('getUser');
  // } catch (error: any) {
  //   res.status(401).send({
  //     status: 'error',
  //     message: error.message,
  //     data: error
  //   });
  //   return;
  // }
  console.timeEnd('authenticate time');

  next();

}