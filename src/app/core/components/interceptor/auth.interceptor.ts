import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = JSON.parse(localStorage.getItem('token') || '{}').token;
  //const token= inject(FirebaseAuthService)
  //const authToken= "Your auth token";
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq);
};
