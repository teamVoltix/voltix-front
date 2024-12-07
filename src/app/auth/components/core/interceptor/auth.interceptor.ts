import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenData = localStorage.getItem('access_token');
  const authToken = tokenData ? JSON.parse(tokenData).access_token : null;

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(authReq);
  } else {
    // Si el token es vacío o null, continua la solicitud sin el encabezado de autorización
    return next(req);
  }
};
